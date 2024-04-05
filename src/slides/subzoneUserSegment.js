import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Chart } from "react-google-charts";
import { toPng } from "html-to-image";
import { type } from "@testing-library/user-event/dist/type";
import { render } from "@testing-library/react";

const Slide31 = ({ pptx, data }) => {
  const [chartImageURI1, setChartImageURI1] = useState("");
  const [chartImageURI2, setChartImageURI2] = useState("");
  console.log('13 Slide31')


  // const graphData = [
  //   [
  //     "City",
  //     "LA in %",
  //     { role: "annotation" },
  //     "MM in %",
  //     { role: "annotation" },
  //     "UM in %",
  //     { role: "annotation" },
  //   ],
  //   ["September-2023", 1000000,1000000,3000000,3000000,4000000,4000000],
  //   ["October-2023", 2000000, 1500000, 800000, 4000000, 3000000, 1000000],
  //   ["November-2023", 1500000, 1000000, 600000, 4000000, 3000000, 1000000],
  //   ["December-2023", 1200000, 800000, 400000, 4000000, 3000000, 1000000],
  //   ["January-2024", 1000000, 700000, 300000, 4000000, 3000000, 1000000],
  //   ["February-2024", 1500000, 1000000, 600000, 4000000, 3000000, 1000000],
  // ];
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
        // italic: true,
        // color: "white",
        // auraColor: "none",
      },
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

  useEffect(() => {
    if (chartImageURI1 != "" && chartImageURI2 != "") {
      const slide = pptx.addSlide();
      slide.background = { fill: "000000" };

      const node = document.createElement("div");
      node.innerHTML = chartImageURI1;

      const parser = new DOMParser();
      const doc = parser.parseFromString(chartImageURI1, "text/html");
      const svgs = doc.querySelectorAll("svg");

      const doc2 = parser.parseFromString(chartImageURI2, "text/html");
      const svgs2 = doc2.querySelectorAll("svg");
      const svg2 = svgs2[0];

      console.log("hell01");
      console.log(svgs);
      svgs.forEach(async (svg, index) => {
        try {
          console.log("hellll");
          const svgData = new XMLSerializer().serializeToString(svg);
          const svgData2 = new XMLSerializer().serializeToString(svg2);
          const base64Image = btoa(svgData);
          const base64Image2 = btoa(svgData2);

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
              console.log("hellllllloooo");
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
  console.log("hello");

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
