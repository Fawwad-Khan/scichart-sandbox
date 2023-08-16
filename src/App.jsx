import { useState } from "react";
import "./App.css";
import ScatterLine from "./components/ScatterLineGraph";
import { NumberRange } from "scichart";
import moment from "moment";

function App() {
  const [graphType, setGraphType] = useState(0);
  let xAxes = [];

  let graphData = [
    [
      {
        dt: moment("2023-08-10T00:00:00.000Z"),
        nr: 307,
        tib: 1440,
        rr_pct25: 18.60853716330159,
        quant2: 19.95142975634374,
        rr_pct75: 26.28331340720212,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
      {
        dt: moment("2023-08-11T00:00:00.000Z"),
        nr: 782,
        tib: 1440,
        rr_pct25: 23.31336446111308,
        quant2: 24.74087828156432,
        rr_pct75: 26.34284583739055,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
      {
        dt: moment("2023-08-12T00:00:00.000Z"),
        nr: 207,
        tib: 1440,
        rr_pct25: 19.43861961389818,
        quant2: 20.031573875836447,
        rr_pct75: 21.87667529980652,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
      {
        dt: moment("2023-08-13T00:00:00.000Z"),
        nr: 335,
        tib: 1440,
        rr_pct25: 22.52782953645973,
        quant2: 23.868629838137405,
        rr_pct75: 25.50156581516125,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
      {
        dt: moment("2023-08-14T00:00:00.000Z"),
        nr: 487,
        tib: 1380,
        rr_pct25: 19.899817897574696,
        quant2: 20.019397607910783,
        rr_pct75: 22.60795595952483,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
      {
        dt: moment("2023-08-15T00:00:00.000Z"),
        nr: 296,
        tib: 1440,
        rr_pct25: 25.045605021569802,
        quant2: 26.910468573399534,
        rr_pct75: 29.78453434620266,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
      {
        dt: moment("2023-08-16T00:00:00.000Z"),
        nr: null,
        tib: 540,
        rr_pct25: null,
        quant2: null,
        rr_pct75: null,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
    ],
    [
      {
        dt: "2023-07-17T00:00:00.000Z",
        nr: 831,
        tib: 899,
        rr_pct25: 18.80794730425917,
        quant2: 20.29482387521598,
        rr_pct75: 22.477049071881183,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
      {
        dt: "2023-07-18T00:00:00.000Z",
        nr: 1276,
        tib: 1440,
        rr_pct25: 19.122527434301567,
        quant2: 20.23071422587234,
        rr_pct75: 22.424039462433647,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
      {
        dt: "2023-07-19T00:00:00.000Z",
        nr: 1222,
        tib: 1423,
        rr_pct25: 18.505166044951412,
        quant2: 19.317038205813553,
        rr_pct75: 19.86747346213597,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
      {
        dt: "2023-07-20T00:00:00.000Z",
        nr: 1306,
        tib: 1440,
        rr_pct25: 18.418294891348776,
        quant2: 19.39291992403147,
        rr_pct75: 20.92959197747809,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
      {
        dt: "2023-07-21T00:00:00.000Z",
        nr: 1249,
        tib: 1437,
        rr_pct25: 16.339751665773374,
        quant2: 17.383731050475387,
        rr_pct75: 18.058825377790384,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
      {
        dt: "2023-07-22T00:00:00.000Z",
        nr: 1159,
        tib: 1440,
        rr_pct25: 17.630071726992735,
        quant2: 20.058460116386414,
        rr_pct75: 20.63595663365133,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
      {
        dt: "2023-07-23T00:00:00.000Z",
        nr: 898,
        tib: 1436,
        rr_pct25: 18.031340358883014,
        quant2: 19.88577736773734,
        rr_pct75: 22.210921374975825,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
      {
        dt: "2023-07-24T00:00:00.000Z",
        nr: 619,
        tib: 1440,
        rr_pct25: 18.719759702110192,
        quant2: 19.743417787401363,
        rr_pct75: 20.828627454529023,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
      {
        dt: "2023-07-25T00:00:00.000Z",
        nr: 33,
        tib: 1440,
        rr_pct25: 17.871039796275753,
        quant2: 20.988604605724454,
        rr_pct75: 21.172719468003564,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
      {
        dt: "2023-07-26T00:00:00.000Z",
        nr: 54,
        tib: 1440,
        rr_pct25: 18.682192039297725,
        quant2: 20.019957196633786,
        rr_pct75: 22.2720073216267,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
      {
        dt: "2023-07-27T00:00:00.000Z",
        nr: 321,
        tib: 1440,
        rr_pct25: 18.999071381643503,
        quant2: 19.52664672268625,
        rr_pct75: 20.781222294883815,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
      {
        dt: "2023-07-28T00:00:00.000Z",
        nr: 243,
        tib: 1439,
        rr_pct25: 18.24864342977934,
        quant2: 20.77125194668976,
        rr_pct75: 22.06940245456938,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
      {
        dt: "2023-07-29T00:00:00.000Z",
        nr: 371,
        tib: 1440,
        rr_pct25: 21.452089241811013,
        quant2: 23.39148235321045,
        rr_pct75: 23.88490518046924,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
      {
        dt: "2023-07-30T00:00:00.000Z",
        nr: 489,
        tib: 1440,
        rr_pct25: 19.796239672417197,
        quant2: 21.83774430883499,
        rr_pct75: 24.20929354187923,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
      {
        dt: "2023-07-31T00:00:00.000Z",
        nr: 1002,
        tib: 1440,
        rr_pct25: 21.25667647661691,
        quant2: 21.995220184682154,
        rr_pct75: 25.2558872008295,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
      {
        dt: "2023-08-01T00:00:00.000Z",
        nr: 888,
        tib: 1371,
        rr_pct25: 20.36170184291467,
        quant2: 22.23756307135796,
        rr_pct75: 23.655770348967355,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
      {
        dt: "2023-08-02T00:00:00.000Z",
        nr: 159,
        tib: 1385,
        rr_pct25: 23.319264444315213,
        quant2: 25.50774553338795,
        rr_pct75: 26.536828393095288,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
      {
        dt: "2023-08-03T00:00:00.000Z",
        nr: 315,
        tib: 1400,
        rr_pct25: 19.21553092673635,
        quant2: 20.157545342492643,
        rr_pct75: 21.07562293755729,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
      {
        dt: "2023-08-04T00:00:00.000Z",
        nr: 633,
        tib: 1412,
        rr_pct25: 17.601744890213013,
        quant2: 18.178711003388372,
        rr_pct75: 18.558407790723184,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
      {
        dt: "2023-08-05T00:00:00.000Z",
        nr: 289,
        tib: 1425,
        rr_pct25: 19.575737718996127,
        quant2: 20.431114504648505,
        rr_pct75: 20.990472237568955,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
      {
        dt: "2023-08-06T00:00:00.000Z",
        nr: 302,
        tib: 1440,
        rr_pct25: 20.359280033467897,
        quant2: 22.554404592896176,
        rr_pct75: 24.143872840510898,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
      {
        dt: "2023-08-07T00:00:00.000Z",
        nr: 381,
        tib: 1440,
        rr_pct25: 20.092402674458548,
        quant2: 20.966085438088637,
        rr_pct75: 22.23961148262024,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
      {
        dt: "2023-08-08T00:00:00.000Z",
        nr: 267,
        tib: 1440,
        rr_pct25: 16.7083972700251,
        quant2: 17.687793731689453,
        rr_pct75: 19.7006995677948,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
      {
        dt: "2023-08-09T00:00:00.000Z",
        nr: 190,
        tib: 1370,
        rr_pct25: 18.183943606355914,
        quant2: 18.65174751056176,
        rr_pct75: 19.475280666757314,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
      {
        dt: "2023-08-10T00:00:00.000Z",
        nr: 307,
        tib: 1440,
        rr_pct25: 18.60853716330159,
        quant2: 19.95142975634374,
        rr_pct75: 26.28331340720212,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
      {
        dt: "2023-08-11T00:00:00.000Z",
        nr: 782,
        tib: 1440,
        rr_pct25: 23.31336446111308,
        quant2: 24.74087828156432,
        rr_pct75: 26.34284583739055,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
      {
        dt: "2023-08-12T00:00:00.000Z",
        nr: 207,
        tib: 1440,
        rr_pct25: 19.43861961389818,
        quant2: 20.031573875836447,
        rr_pct75: 21.87667529980652,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
      {
        dt: "2023-08-13T00:00:00.000Z",
        nr: 335,
        tib: 1440,
        rr_pct25: 22.52782953645973,
        quant2: 23.868629838137405,
        rr_pct75: 25.50156581516125,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
      {
        dt: "2023-08-14T00:00:00.000Z",
        nr: 487,
        tib: 1380,
        rr_pct25: 19.899817897574696,
        quant2: 20.019397607910783,
        rr_pct75: 22.60795595952483,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
      {
        dt: "2023-08-15T00:00:00.000Z",
        nr: 296,
        tib: 1440,
        rr_pct25: 25.045605021569802,
        quant2: 26.910468573399534,
        rr_pct75: 29.78453434620266,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
      {
        dt: "2023-08-16T00:00:00.000Z",
        nr: null,
        tib: 540,
        rr_pct25: null,
        quant2: null,
        rr_pct75: null,
        quant1: null,
        quant3: null,
        whiskMax: null,
        whiskMin: null,
      },
    ],
  ];

  let numberRangeToSet = new NumberRange(
    moment(graphData[graphType].dt).unix(),
    moment(graphData[graphType][graphData[graphType].length - 1].dt).unix()
  );

  console.log("I got ", numberRangeToSet);
  const onGraphCreate = (chartSurface) => {
    xAxes.push(chartSurface.xAxes.items[0]);
    if (xAxes.length === 7) {
      setTimeout(() => {
        xAxes.map((tempxAxis) => {
          if (tempxAxis) {
            tempxAxis.visibleRangeChanged.subscribe((data1) => {
              xAxes.map((tempxAxis2) => {
                tempxAxis2.visibleRange = data1.visibleRange;
                return tempxAxis2;
              });
            });
          }
          return tempxAxis;
        });
      }, 1000);
      xAxes[0].visibleRange = numberRangeToSet;
      xAxes[1].visibleRange = numberRangeToSet;
      xAxes[2].visibleRange = numberRangeToSet;
      xAxes[3].visibleRange = numberRangeToSet;
      xAxes[4].visibleRange = numberRangeToSet;
      xAxes[5].visibleRange = numberRangeToSet;
      xAxes[6].visibleRange = numberRangeToSet;
    }
  };

  return (
    <>
      <button onClick={() => setGraphType(0)}>graph 1</button>
      <button onClick={() => setGraphType(1)}>graph 2</button>

      {graphType === 0 ? (
        <ScatterLine
          divID="something2"
          graphData={graphData[0]}
          key="1"
          onGraphCreate={onGraphCreate}
          numberRangeToSet={numberRangeToSet}
          dataValidation={{
            rangeLimit: { upper: 35, lower: 0 },
            dataKeys: { x: "dt", y: "quant2" },
            drawHorizontalLines: true,
            tooltipAxisTitle: "Avg",
            graphTitle: "Respiratory",
            yAxisTitle: "Avg BrPM",
            threshold: {
              min: 10,
              max: 25,
            },
          }}
        />
      ) : (
        <ScatterLine
          graphData={graphData[1]}
          divID="something1"
          key="2"
          onGraphCreate={onGraphCreate}
          numberRangeToSet={numberRangeToSet}
          dataValidation={{
            rangeLimit: { upper: 35, lower: 0 },
            dataKeys: { x: "dt", y: "quant2" },
            drawHorizontalLines: true,
            tooltipAxisTitle: "Avg",
            graphTitle: "Respiratory",
            yAxisTitle: "Avg BrPM",
            threshold: {
              min: 10,
              max: 25,
            },
          }}
        />
      )}
    </>
  );
}

export default App;
