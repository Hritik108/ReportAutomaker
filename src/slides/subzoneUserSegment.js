import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Chart } from "react-google-charts";
import { toPng } from "html-to-image";
import { type } from "@testing-library/user-event/dist/type";
import { render } from "@testing-library/react";

const Slide31 = ({ pptx, data }) => {
  const [chartImageURI1, setChartImageURI1] = useState("");
  const [chartImageURI2, setChartImageURI2] = useState("");
  const graphData1=data.graph1
  const graphData2=data.graph2

  const options = {
    title: "Zomato",
    chart: {
      subtitle: "Sales and Expenses: 2014-2019",
    },
    isStacked: "percent", // Specify that the chart should be stacked in percentage
    legend: { position: "top" }, // Position legend at the top
    'tooltip' : {
      trigger: 'none'
    },
    hAxis: {
      gridlines: { color: "transparent" }, // Hide horizontal gridlines
    },

    vAxis: {}, // Format the vertical axis labels as percentages
    annotations: {
      textStyle: {
        fontSize: 11,
        bold: true,
        verticalAlign: 'middle'
        // italic: true,
        // color: "white",
        // auraColor: "none",
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
    colors: ["rgb(250, 112, 112)", "rgb(144, 210, 109)", "rgb(255, 201, 74)"],
  };

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

// Declare pptx using useRef to avoid reinitialization
const pptxRef = useRef(null);
useEffect(() => {
pptxRef.current = pptx.addSlide();
}, [])


  useEffect(() => {
    if (chartImageURI1 != "" && chartImageURI2 != "") {
      const slide = pptxRef.current;
      slide.background = { fill: "000000" };

      const node = document.createElement("div");
      node.innerHTML = chartImageURI1;

      const parser = new DOMParser();
      const doc = parser.parseFromString(chartImageURI1, "text/html");
      const svgs = doc.querySelectorAll("svg");

      const doc2 = parser.parseFromString(chartImageURI2, "text/html");
      const svgs2 = doc2.querySelectorAll("svg");
      const svg2 = svgs2[0];

      // console.log("hell01");
      // console.log(svgs);
      svgs.forEach(async (svg, index) => {
        try {
          // console.log("hellll");
          const svgData = new XMLSerializer().serializeToString(svg);
          const svgData2 = new XMLSerializer().serializeToString(svg2);

          
          const utf8Data = unescape(encodeURIComponent(svgData));
          const utf8Data2 = unescape(encodeURIComponent(svgData2));
  

          const base64Image = btoa(utf8Data);
          const base64Image2 = btoa(utf8Data2);

          const imageuri = `data:image/svg+xml;base64,${base64Image}`;
          const imageuri2 = `data:image/svg+xml;base64,${base64Image2}`;

          await convertSvgToPng(imageuri)
            .then((pngDataUri) => {
              slide.addImage({
                data: pngDataUri,
                x: 0.2,
                y: 1,
                w: 4.7,
                h: 3,
              });

              slide.addText(data.title, {
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
            .catch((error) => {
              console.log(error);
            });

          await convertSvgToPng(imageuri2)
            .then((pngDataUri) => {
              slide.addImage({
                data: pngDataUri,
                x: 5.1,
                y: 1,
                w: 4.7,
                h: 3,
              });
              // console.log("hellllllloooo");
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {
          console.error("Error converting SVG to image:", error);
        }
      });
    }
  }, [chartImageURI1, chartImageURI2]);
  // console.log("hello");

  return (
    <>
      {/* <div id="googlegraphs1"> */}
      <h1>{data.title}</h1>
      <Chart
        chartType="ColumnChart"
        data={graphData1}
        options={options}
        //   graph_id="ScatterChartX1"
        width="70%"
        height={"450px"}
        legend_toggle={true}
        chartPackage={["controls"]}
        getChartWrapper={(rcatChart) => {
          setTimeout(() => {
            setChartImageURI1(rcatChart.visualization.container.innerHTML);
          }, 5000); // Wait for 5000 milliseconds (5 seconds)
        }}
        // ref={chartRef}
      />
      {/* </div> */}
      <div id="googlegraphs2">
        <Chart
          chartType="ColumnChart"
          data={graphData2}
          options={{ ...options, title: "Swiggy" }}
          // graph_id="ScatterChartX2"
          width="70%"
          height={"450px"}
          legend_toggle={true}
          chartPackage={["controls"]}
          getChartWrapper={(rcatChart) => {
            setTimeout(() => {
              setChartImageURI2(rcatChart.visualization.container.innerHTML);
            }, 5000); // Wait for 5000 milliseconds (5 seconds)
          }}
          // ref={chartRef}
        />
      </div>
    </>
  );
};

export default Slide31;
