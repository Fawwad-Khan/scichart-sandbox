/* eslint-disable react/prop-types */
import { Button } from "antd";
import moment from "moment";
import React, { useRef, useState } from "react";
import {
  DateTimeNumericAxis,
  DefaultPaletteProvider,
  DpiHelper,
  EStrokePaletteMode,
  MemoryUsageHelper,
  parseColorToUIntArgb,
} from "scichart";
import { RolloverModifier } from "scichart/Charting/ChartModifiers/RolloverModifier";
import { RubberBandXyZoomModifier } from "scichart/Charting/ChartModifiers/RubberBandXyZoomModifier";
import { ZoomExtentsModifier } from "scichart/Charting/ChartModifiers/ZoomExtentsModifier";
import { XyDataSeries } from "scichart/Charting/Model/XyDataSeries";
import { SciChartJSLightTheme } from "scichart/Charting/Themes/SciChartJSLightTheme";
import { HorizontalLineAnnotation } from "scichart/Charting/Visuals/Annotations/HorizontalLineAnnotation";
import { NumericLabelProvider } from "scichart/Charting/Visuals/Axis/LabelProvider/NumericLabelProvider";
import { NumericAxis } from "scichart/Charting/Visuals/Axis/NumericAxis";
import { EllipsePointMarker } from "scichart/Charting/Visuals/PointMarkers/EllipsePointMarker";
import { FastLineRenderableSeries } from "scichart/Charting/Visuals/RenderableSeries/FastLineRenderableSeries";
import { SciChartDefaults } from "scichart/Charting/Visuals/SciChartDefaults";
import { SciChartSurface } from "scichart/Charting/Visuals/SciChartSurface";
import { NumberRange } from "scichart/Core/NumberRange";
import { EAxisAlignment } from "scichart/types/AxisAlignment";
import { ELabelPlacement } from "scichart/types/LabelPlacement";

// import ColumnPaletteProvider from '../../../../../../../services/SciChartColor'
import graphStyle from "./styles.module.scss";

SciChartDefaults.enableResampling = false;

class ScatterPaletteProvider extends DefaultPaletteProvider {
  constructor(stroke, fill, max, min) {
    super();
    this.strokePaletteMode = EStrokePaletteMode.SOLID;
    this.max = max;
    this.min = min;
    this.overrideStroke = parseColorToUIntArgb(stroke);
    this.overrideFill = parseColorToUIntArgb(fill);
  }

  overridePointMarkerArgb(xValue, yValue) {
    // Draw points outside the range a different color
    if ((this.max && yValue >= this.max) || (this.min && yValue < this.min)) {
      return {
        stroke: parseColorToUIntArgb("red"),
        fill: parseColorToUIntArgb("red"),
      };
    }
    // Undefined means use default colors
    return undefined;
  }
}

export default function ScatterLine({
  divID,
  graphData,
  dataValidation,
  graphView,
  numberRangeToSet,
  onGraphCreate,
}) {
  const [isZoomedIn, setIsZoomedIn] = useState(false);
  const sciChartSurfaceRef = useRef();

  SciChartSurface.useWasmFromCDN();

  const drawHorizontalLineForRRGraph = ({
    HorizontalLineAnnotation,
    dataValidation,
    ELabelPlacement,
  }) =>
    new HorizontalLineAnnotation({
      y1: dataValidation,
      isEditable: false,
      labelPlacement: ELabelPlacement.TopLeft,
      showLabel: true,
      stroke: "#c23f3f",
      axisLabelFill: "#c23f3f",
      strokeDashArray: [10, 3],
    });

  const bulletColor = (
    range,
    max,
    min,
    normalColor = "#138C2C",
    abNormalColor = "red"
  ) => {
    if ((max && range >= max) || (min && range < min)) {
      return abNormalColor;
    }

    return normalColor;
  };

  React.useEffect(() => {
    drawExample(graphData).then((newGraphProps) => {
      sciChartSurfaceRef.current = newGraphProps.sciChartSurface;

      newGraphProps.sciChartSurface.xAxes.items[0].visibleRangeChanged.subscribe(
        (args) => {
          if (
            args.visibleRange.min !== numberRangeToSet.min ||
            args.visibleRange.max !== numberRangeToSet.max
          ) {
            setIsZoomedIn(true);
          } else {
            setIsZoomedIn(false);
          }
        }
      );
      onGraphCreate(newGraphProps.sciChartSurface);
    });
    return cleanupChart;
  }, [divID]);

  const drawExample = async (data) => {
    SciChartSurface.setRuntimeLicenseKey(import.meta.env.VITE_SCICHART_KEY);

    const lightTheme = new SciChartJSLightTheme();
    lightTheme.sciChartBackground = "#fff"; // 'radial-gradient(circle, #fff 0%, #EDF7FF 60%, #EDF7FF 100%)'

    lightTheme.axisBorder = "#e1e1e1";

    lightTheme.loadingAnimationForeground = "#436EEE";
    lightTheme.loadingAnimationBackground = "#ffffff";

    SciChartSurface.autoDisposeWasmContext = true;
    MemoryUsageHelper.isMemoryUsageDebugEnabled = true;
    MemoryUsageHelper.objectRegistry.log();
    Array.from(
      MemoryUsageHelper.objectRegistry.undeletedObjectsMap.values()
    ).forEach((v) => console.log("hello", v.objectRef));
    DpiHelper.IsDpiScaleEnabled = false;

    const createdChartObj = await SciChartSurface.create(divID, {
      theme: lightTheme,
    });

    const { sciChartSurface } = createdChartObj;

    let { wasmContext } = createdChartObj;

    let maxAutoTicks = 100;
    if (divID === "weekly") {
      maxAutoTicks = 7;
    } else if (divID === "monthly") {
      maxAutoTicks = 31;
    } else if (divID === "daily") {
      maxAutoTicks = 72;
    }
    const xAxes = new DateTimeNumericAxis(wasmContext, {
      maxAutoTicks,
      drawMinorGridLines: false,
      drawMajorBands: false,
      setAxisBandsStyle: false,
      axisTitleStyle: {
        fontSize: 10,
        fontWeight: "bold",
        color: "#9B9B9B",
      },
      axisBorder: {
        borderTop: 1,
        color: "#9B9B9B",
      },
      labelStyle: {
        color: "#9B9B9B",
      },
    });

    const yAxes = new NumericAxis(wasmContext, {
      growBy: new NumberRange(0, 5),
      axisAlignment: EAxisAlignment.Left,
      axisTitle: dataValidation.yAxisTitle,
      visibleRange: new NumberRange(
        dataValidation.rangeLimit.lower,
        dataValidation.rangeLimit.upper
      ),
      visibleRangeLimit: new NumberRange(
        dataValidation.rangeLimit.lower,
        dataValidation.rangeLimit.upper
      ),
      drawMajorGridLines: false,
      setAxisBandsStyle: false,
      drawMajorBands: false,
      drawMinorGridLines: false,
      labelPrecision: 0,
      axisTitleStyle: {
        fontSize: 16,
        color: "#9B9B9B",
      },
      capacity: 720,
      axisBorder: {
        borderRight: 1,
        color: "#9B9B9B",
      },
      labelStyle: {
        color: "#9B9B9B",
      },
      dataIsSortedInX: true,
      dataEvenlySpacedInX: true,
      containsNaN: true,
      zoomExtentsToInitialRange: true,
    });
    sciChartSurface.xAxes.add(xAxes);
    sciChartSurface.yAxes.add(yAxes);

    const dataSeries = new XyDataSeries(wasmContext);
    data.map((item) => {
      let value = item[dataValidation.dataKeys.y]
        ? item[dataValidation.dataKeys.y]
        : NaN;
      const datetime = item[dataValidation.dataKeys.x];
      if (divID.includes("monthlyTiB")) {
        value = Math.round(value / 60);
      }
      dataSeries.append(moment(datetime).unix(), value, {
        nNmmber: item.nr,
        graphColor: bulletColor(value ? value.toFixed(1) : null, 20, 10),
      });

      return item;
    });

    sciChartSurface.addDeletable(dataSeries);
    if (divID.includes("daily")) {
      xAxes.labelProvider.delete();
      xAxes.labelProvider = new NumericLabelProvider({
        rotation: 270,
        labelPrecision: 2,
      });
      xAxes.labelStyle = {
        fontSize: 10,
        padding: { top: 0, right: 0, left: 0, bottom: 0 },
      };
      let oldDate = "";
      xAxes.labelProvider.formatLabel = (dataValue) => {
        const unixDateStamp = dataValue;
        let dateFormatObject = "HH:mm";
        if (
          oldDate &&
          !moment.unix(oldDate).isSame(moment.unix(dataValue), "date")
        ) {
          dateFormatObject = "MMM DD";
        }

        oldDate = unixDateStamp;
        return moment.unix(unixDateStamp).format(dateFormatObject);
      };
      xAxes.labelProvider.delete();
    } else {
      xAxes.labelProvider = new NumericLabelProvider({
        labelFormat: "MM/DD",
        cursorLabelFormat: "MM/DD",
        rotation: 270,
      });
      xAxes.labelProvider.formatLabel = (dataValue) => {
        const unixDateStamp = dataValue;
        const dateFormatObject = "MM/DD";

        return moment.unix(unixDateStamp).format(dateFormatObject);
      };
      xAxes.labelProvider.delete();
    }
    const rendSeries = new FastLineRenderableSeries(wasmContext, {
      dataSeries,
      strokeThickness: 1.6,
      stroke: "#138C2C",
      pointMarker: new EllipsePointMarker(wasmContext, {
        width: 12,
        height: 12,
        strokeThickness: 1,
        fill: "#138C2C",
        stroke: "#138C2C",
      }),
      paletteProvider: new ScatterPaletteProvider("red", "red", 20, 10),
    });
    rendSeries.rolloverModifierProps.tooltipTextColor = "white";
    if (dataValidation.drawHorizontalLines) {
      const horizontalLine1 = drawHorizontalLineForRRGraph({
        HorizontalLineAnnotation,
        dataValidation: 10,
        ELabelPlacement,
      });
      const horizontalLine2 = drawHorizontalLineForRRGraph({
        HorizontalLineAnnotation,
        dataValidation: 20,
        ELabelPlacement,
      });
      sciChartSurface.annotations.add(horizontalLine1);
      sciChartSurface.annotations.add(horizontalLine2);
    }
    sciChartSurface.renderableSeries.add(rendSeries);
    sciChartSurface.addDeletable(rendSeries);
    rendSeries.rolloverModifierProps.tooltipLabelY =
      dataValidation.tooltipAxisTitle;
    if (graphView === "RR") {
      rendSeries.rolloverModifierProps.tooltipDataTemplate = (tooltipProps) => {
        const { pointMetadata, yValue } = tooltipProps;
        rendSeries.rolloverModifierProps.tooltipColor =
          pointMetadata.graphColor;
        rendSeries.rolloverModifierProps.markerColor = pointMetadata.graphColor;
        return [
          `Avg: ${yValue ? yValue.toFixed(1) : ""}`,
          `N = ${pointMetadata.nNmmber}`,
        ];
      };
    }
    // Rollover Tooltip
    sciChartSurface.chartModifiers.add(
      new RolloverModifier({ modifierGroup: "group1" })
    );

    sciChartSurface.chartModifiers.add(
      new ZoomExtentsModifier({
        isAnimated: true,
        animationDuration: 400,
      })
    );
    sciChartSurface.chartModifiers.add(new RubberBandXyZoomModifier());
    return { sciChartSurface };
  };

  const cleanupChart = async () => {
    // eslint-disable-next-line no-constant-condition
    if (sciChartSurfaceRef.current) {
      await sciChartSurfaceRef.current.xAxes.clear(true);
      await sciChartSurfaceRef.current.yAxes.clear(true);
      await sciChartSurfaceRef.current.chartModifiers.clear(true);
      await sciChartSurfaceRef.current.annotations.clear(true);
      await sciChartSurfaceRef.current.renderableSeries.clear(true);

      await sciChartSurfaceRef.current.delete(true);

      sciChartSurfaceRef.current = undefined;
    }
  };

  return (
    <div className="col-12">
      <h4 style={{ padding: " 10px 0px", marginTop: "8px" }}>
        <strong>{dataValidation.graphTitle}</strong>
      </h4>
      <div className="card">
        {isZoomedIn ? (
          <Button
            className={graphStyle.zoomOutButton}
            icon="minus"
            type="primary"
            shape="circle"
            onClick={() => {
              if (
                sciChartSurfaceRef.current.xAxes.items &&
                sciChartSurfaceRef.current.xAxes.items[0]
              ) {
                sciChartSurfaceRef.current.xAxes.items[0].visibleRange =
                  numberRangeToSet;
              }
              if (
                sciChartSurfaceRef.current.yAxes.items &&
                sciChartSurfaceRef.current.yAxes.items[0]
              ) {
                sciChartSurfaceRef.current.yAxes.items[0].visibleRange =
                  sciChartSurfaceRef.current.yAxes.items[0].getMaximumRange();
              }
            }}
          />
        ) : (
          ""
        )}
        <div
          id={divID}
          style={{ height: "384px", width: "100%", background: "#fff" }}
        />
        <br />
      </div>
    </div>
  );
}
