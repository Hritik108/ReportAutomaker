import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Chart } from "react-google-charts";
import { toPng } from "html-to-image";
import { type } from "@testing-library/user-event/dist/type";
import { render } from "@testing-library/react";

const SlideX = ({ pptx, data }) => {
  const countRef = useRef(0);

  const [options, setOptions] = useState({});
  const [chartEvents, setChartEvents] = useState([]);
  const [chartImageURI, setChartImageURI] = useState("");
  const chartRef = useRef(null);
  const checkRef = useRef(false);
  const graphData = [
    [
      "",
      "Menu opens",
      { role: "annotation" },
      "M2C in %",
      { role: "annotation" },
      "M2O in %",
      { role: "annotation" },
      "C2O in %",
      { role: "annotation" }
    ],
    ["Jul-2023", 21370, 21370, 33,33, 19,19, 55,55],
    ["Aug-2023", 25470, 25470, 34,34, 17,17, 48,48],
    ["Sep-2023", 36550, 36550, 34,34, 19,19, 55,55],
    ["Oct-2023", 35310, 35310, 37,37, 20,20, 55,55],
    ["Nov-2023", 35820, 35820, 37,37, 21,21, 56,56],
    ["Dec-2023", 39040, 39040, 36,36, 20,20, 54,54],
  ];

  useEffect(() => {
    const options = {
        title: {
            text: "Zomato",
            titleTextStyle: { 
              fontSize: 20,  // Adjust font size as needed
              bold: true,
              textAlign: "center",  // Align title to the center
            }
          },
      series: {
        0: { targetAxisIndex: 0, type: "bars" },
        1: { targetAxisIndex: 1, type: "line", lineWidth: 2 },
        2: { targetAxisIndex: 1, type: "line", lineWidth: 2 },
        3: { targetAxisIndex: 1, type: "line", lineWidth: 2 },
      },
      vAxes: {
        0: {
            gridlines: { color: "transparent" },
            viewWindow: { min: 0 },
        },
        1: {
          gridlines: { color: "transparent" },
          viewWindow: { min: 0 },
        }
      },
      legend: { position: "top" },
      annotations: {
        alwaysOutside: true,
        textStyle: {
          fontSize: 14,
          bold: true,
        },
      },
      chartArea: {
        left: 70,
        top: 70,
        bottom: 30,
        right: 70,
        width: "90%",
        height: "90%",
      },
    };

    const chart_events = [
      {
        eventName: "ready",
        callback: (rcatChart) => {
          if (!checkRef.current) {
            // Check the ref value
            const chartContainerHTML =
              rcatChart.chartWrapper.getChart().container.innerHTML;
            checkRef.current = true; // Update the ref value

            setChartImageURI(chartContainerHTML); // Update chartImageURI only if it has changed
          }
        },
      },
    ];

    setOptions(options);

    setChartEvents(chart_events);
  }, []);
  const convertSvgToPng = (svgDataUri) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        const dpi = 8; // Example: Use a higher DPI for better clarity
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const { width, height } = image;
        canvas.width = width * dpi;
        canvas.height = height * dpi;
        context.scale(dpi, dpi);
        context.imageSmoothingEnabled = false; // Disable anti-aliasing
        context.drawImage(image, 0, 0, width, height);
        const pngDataUri = canvas.toDataURL("image/png");
        resolve(pngDataUri);
      };
      image.onerror = (error) => {
        reject(error);
      };
      image.src = svgDataUri;
    });
  };

  useEffect(() => {
    const slide = pptx.addSlide();
    slide.background = { fill: "000000" };

    const node = document.createElement("div");
    node.innerHTML = chartImageURI;

    const parser = new DOMParser();
    const doc = parser.parseFromString(chartImageURI, "text/html");
    const svgs = doc.querySelectorAll("svg");

    const images = [];

    svgs.forEach(async (svg, index) => {
      try {
        const svgData = new XMLSerializer().serializeToString(svg);
        const base64Image = btoa(svgData);

        const imageuri = `data:image/svg+xml;base64,${base64Image}`;

        await convertSvgToPng(imageuri)
          .then((pngDataUri) => {
            slide.addImage({
              data: pngDataUri,
              x: 0.6,
              y: 1,
              w: 4.5,
              h: 3,
            });

            slide.addText("Overall Revenues - month on month", {
              y: -0.5,
              x: 0.6,
              w: 10,
              h: 2,
              color: "FFFFFF",
              fontFace: "Calibri",
              fontSize: 30,
              bold: true,
            });

            slide.addText(
              "©2023 - Restaverse pvt ltd, and/or its subsidiaries. This material is confidential unless otherwise stated in writing",
              {
                y: 4.5,
                x: 2.2,
                w: 10,
                h: 2,
                color: "FFFFFF",
                fontFace: "Calibri",
                fontSize: 8,
              }
            );
            //  pptx.writeFile("output.pptx");
          })
          .catch((error) => {});

      } catch (error) {
        console.error("Error converting SVG to image:", error);
      }
    });
  }, [chartImageURI]);

  const callme = () => (rcatChart) => {
    console.log(rcatChart);
  };

  const [sankey, setSankey] = useState(null);

  var newchartEvents = [
    {
      eventName: "ready",
      callback: ({ chartWrapper }) => {
        setSankey(chartWrapper);
      },
    },
  ];

  useEffect(() => {
    // side effect within useEffect is bad this doesn't get cleaned up on comonent unmount, just for demo purposes
    console.log(" I AM CALLED");
    if (sankey != null) {
      sankey.getChart().setSelection(null); // setting selection to null works this needs the actual google chart format and not the wrapper format
      console.log(sankey.getChart().getSelection());
      sankey.draw();
    }
    // reset selection after x seconds
  }, [sankey]);

  return (
    <>
      <div id="googlegraphs1">
        <Chart
          chartType="ScatterChart"
          data={graphData}
          options={options}
          graph_id="ScatterChartX1"
          width="70%"
          height={"400px"}
          legend_toggle={true}
          chartPackage={["controls"]}
          getChartWrapper={(rcatChart) => {
            setTimeout(() => {
              setChartImageURI(rcatChart.visualization.container.innerHTML);
            }, 5000); // Wait for 5000 milliseconds (5 seconds)
          }}
          // ref={chartRef}
        />
      </div>
      <div id="googlegraphs2">
        <Chart
          chartType="ScatterChart"
          data={graphData}
          options={options}
          graph_id="ScatterChartX2"
          width="70%"
          height={"400px"}
          legend_toggle={true}
          chartPackage={["controls"]}
          getChartWrapper={(rcatChart) => {
            setTimeout(() => {
              setChartImageURI(rcatChart.visualization.container.innerHTML);
            }, 5000); // Wait for 5000 milliseconds (5 seconds)
          }}
          // ref={chartRef}
        />
      </div>
    </>
  );
};

export default SlideX;