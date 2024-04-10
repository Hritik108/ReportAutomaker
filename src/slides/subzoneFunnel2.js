import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Chart } from "react-google-charts";
import { toPng } from "html-to-image";
import { type } from "@testing-library/user-event/dist/type";
import { render } from "@testing-library/react";

const SlideX = ({ pptx, data,pptFooter}) => {
  const [chartImageURI1, setChartImageURI1] = useState("");
  const [chartImageURI2, setChartImageURI2] = useState("");
  const graphData1 = data.graph1;
  const graphData2 = data.graph2;

  const options = {
    title: {
      text: "Zomato",
      titleTextStyle: {
        fontSize: 20, // Adjust font size as needed
        bold: true,
        textAlign: "center", // Align title to the center
      },
    },
    series: {
      0: { targetAxisIndex: 0, type: "bars" },
      1: { targetAxisIndex: 1, type: "line", lineWidth: 2 },
      2: { targetAxisIndex: 1, type: "line", lineWidth: 2 },
      3: { targetAxisIndex: 1, type: "line", lineWidth: 2 },
    },
    'tooltip' : {
      trigger: 'none'
    },
    vAxes: {
      0: {
        gridlines: { color: "transparent" },
        viewWindow: { min: 0 },
        format: "short"
      },
      1: {
        format: "short",
      },
      2: {
        format: "short",
      },
      3: {
        format: "short",
      },
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
          // const base64Image = btoa(svgData);
          // const base64Image2 = btoa(svgData2);
          // console.log(base64Image)
          // console.log(base64Image2)
          const utf8Data = unescape(encodeURIComponent(svgData));
          const base64Image = btoa(utf8Data);
          const utf8Data2 = unescape(encodeURIComponent(svgData2));
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
                pptFooter,                {
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

  return (
    <>
      <h1>{data.title}</h1>

      <Chart
        chartType="ScatterChart"
        data={graphData1}
        options={options}
        width="70%"
        height={"400px"}
        legend_toggle={true}
        chartPackage={["controls"]}
        getChartWrapper={(rcatChart) => {
          setTimeout(() => {
            let modifiedHtmlContent =
                rcatChart.visualization.container.innerHTML.replace(
                  /लाख/g,
                  "L"
                );
              modifiedHtmlContent = modifiedHtmlContent.replace(/हज़ार/g, "K");
              modifiedHtmlContent = modifiedHtmlContent.replace(/क॰/g, "Cr");
              setChartImageURI1(modifiedHtmlContent);
          }, 5000); // Wait for 5000 milliseconds (5 seconds)
        }}
      />

      <Chart
        chartType="ScatterChart"
        data={graphData2}
        options={options}
        width="70%"
        height={"400px"}
        legend_toggle={true}
        chartPackage={["controls"]}
        getChartWrapper={(rcatChart) => {
          setTimeout(() => {
            let modifiedHtmlContent =
                rcatChart.visualization.container.innerHTML.replace(
                  /लाख/g,
                  "L"
                );
              modifiedHtmlContent = modifiedHtmlContent.replace(/हज़ार/g, "K");
              modifiedHtmlContent = modifiedHtmlContent.replace(/क॰/g, "Cr");
              setChartImageURI2(modifiedHtmlContent);
            // setChartImageURI2(rcatChart.visualization.container.innerHTML);
          }, 5000); // Wait for 5000 milliseconds (5 seconds)
        }}
      />
    </>
  );
};

export default SlideX;
