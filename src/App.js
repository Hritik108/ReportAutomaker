import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Chart } from "react-google-charts";
import pptxgen from "pptxgenjs";
import Slide1 from "./slides/slide1";
import Slide2 from "./slides/slide2";

function App() {
  let data = {
    title: "Overall Revenues - month on month",
    table: [
      ["Month", "Swiggy (in lacs)", "Zomato (in lacs)", "Total (in lacs)"],
      ["Oct-2023", 19.9, 49.1, 69],
      ["Nov-2023", 0, 0, 0],
      ["Dec-2023", 0, 0, 0],
      ["Jan-2024", 0, 0, 0],
      ["Feb-2024", 0, 0, 0],
      ["Mar-2024", 0, 0, 0],
    ],
    graph: {
      graphdata: [
        [
          "",
          "Net Revenue",
          { role: "annotation" },
          "Orders",
          { role: "annotation" },
        ],
        ["Jul-2023", 94.2, 94.2, 19502, 19502],
        ["Aug-2023", 92.2, 92.2, 19715, 19715],
        ["Sep-2023", 104.0, 104.0, 21665, 21665],
        ["Oct-2023", 118.1, 118.1, 25366, 25366],
        ["Nov-2023", 127.3, 127.3, 25802, 25802],
        ["Dec-2023", 150.0, 150.0, 31199, 31199],
      ],
    },
    mom: {
      Revenue: 0,
      Orders: 0,
    },
    mo2m: {
      Revenue: 0,
      Orders: 0,
    },
  };

  const [presentation, setPresentation] = useState(null);

  const pptx = new pptxgen();

  const handelsubmit = () => {
    pptx.writeFile("output.pptx");
  };

  const generateppt = () => {
    pptx.writeFile("output.pptx");
  };

  return (
    <>
      <Slide1 pptx={pptx} data={data} />
      <Slide1 pptx={pptx} data={data} />
      <button onClick={generateppt}>Generate PPT</button>
      {/* <Slide1 pptx={pptx} data={data} /> */}
    </>
  );
}

export default App;
