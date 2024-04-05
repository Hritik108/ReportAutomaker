import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Chart } from "react-google-charts";
import { toPng } from "html-to-image";
import { type } from "@testing-library/user-event/dist/type";
import { render } from "@testing-library/react";

const DataTable = ({ data, tableid }) => {
  const cellWidth = 120;
  const cellHeight = 10;
  const borderWidth = 1;
  const fontSize = 12;
  // console.log(data);

  return (
    <table
      style={{
        borderCollapse: "collapse",
        background: "black",
        color: "white",
        width: "20%",
      }}
      id={tableid + "table"}
    >
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                style={{
                  border: "1px solid white",
                  padding: "8px",
                }}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const MomTable = ({ data, tableid }) => {
  const cellWidth = 120;
  const cellHeight = 10;
  const borderWidth = 1;
  const fontSize = 12;

  return (
    <table
      style={{
        borderCollapse: "collapse",
        background: "black",
        color: "white",
        width: "20%",
      }}
      id={tableid + "momtable"}
    >
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                style={{
                  border: "1px solid white",
                  padding: "8px",
                }}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Mo2mTable = ({ data, tableid }) => {
  const cellWidth = 120;
  const cellHeight = 10;
  const borderWidth = 1;
  const fontSize = 12;

  return (
    <table
      style={{
        borderCollapse: "collapse",
        background: "black",
        color: "white",
        width: "20%",
      }}
      id={tableid + "mo2mtable"}
    >
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                style={{
                  border: "1px solid white",
                  padding: "8px",
                }}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const numberTrimmer = (value, index) => {
  // console.log("value", value, index);
  const log10 = parseInt(Math.log10(value));
  const equivalentWithIn100 =
    value / Math.pow(10, log10 % 2 ? log10 : log10 - 1);
  let val = parseFloat(value || 0).toFixed(2);

  // if(value<=1 && value>0){
  //   return (parseFloat(value) * 100).toFixed(2) + '%';
  // }
  switch (log10) {
    case 3:
    case 4:
      val = "K";
      break;
    case 5:
    case 6:
      val = "L";
      break;
    case 7:
    case 8:
      val = "Cr";
      break;
    default:
      return value;
  }

  return value ? parseFloat(equivalentWithIn100).toFixed(2) + val : value;
};

const Slide4 = ({ pptx, data, tableid }) => {
  const [chartImageURI, setChartImageURI] = useState("");

  // const graphData = data.graph.graphdata;

  // const graphData = [ [
  //   "",
  //   "Net Revenue",
  //   { role: "annotation" },
  //   "Orders",
  //   { role: "annotation" },
  // ],["July-2023", 7205, 7205, 1616197.0, 1616197.0], ["August-2023", 10466, 10466, 2313880.740234375, 2313880.740234375], ["September-2023", 10397, 10397, 2409313.0, 2409313.0], ["October-2023", 10226, 10226, 2404472.0, 2404472.0], ["November-2023", 7184, 7184, 1805468.0, 1805468.0], ["December-2023", 15438, 15438, 3767566.0, 3767566.0]]

  // const graphData = [["", "Net Revenue", {"role": "annotation"}, "Orders", {"role": "annotation"}], ["July-2023", 7205, 7205, 1616197.0, 1616197.0], ["August-2023", 10466, 10466, 2313880.740234375, 2313880.740234375], ["September-2023", 10397, 10397, 2409313.0, 2409313.0], ["October-2023", 10226, 10226, 2404472.0, 2404472.0], ["November-2023", 7184, 7184, 1805468.0, 1805468.0], ["December-2023", 15438, 15438, 3767566.0, 3767566.0]]
  const table = data.table;

  // console.log(data.graph);
  const graphData = data.graph;
  let newGraphData = [];
  for (let i = 0; i < data.graph.length; i++) {
    let temp = [];
    for (let j = 0; j < data.graph[0].length; j++) {
      if (!isNaN(graphData[i][j])) {
        temp.push(numberTrimmer(graphData[i][j]));
      } else {
        temp.push(graphData[i][j]);
      }
    }
    newGraphData.push(temp);
  }

  // console.log(newGraphData);

  // console.log(data.mom)
  // const mom = [
  //   ["Revenue", "-100%"],
  //   ["Orders", "-100%"],
  // ];

  // const mom2 = [
  //   ["Revenue", "-100%"],
  //   ["Orders", "-100%"],
  // ];
  let mom = [];
  let mo2m = [];

  if (data.hasOwnProperty("mom") && data.hasOwnProperty("mo2m")) {
    mom = data.mom;
    mo2m = data.mo2m;
  }

  const convertTableToSvg = (tableElement) => {
    const cellWidth = 65;
    const cellHeight = 30;
    const borderWidth = 1;
    const fontSize = 9;

    // Get the number of rows and columns in the table
    const numRows = tableElement.rows.length;
    const numCols = tableElement.rows[0].cells.length;

    // Calculate SVG dimensions
    const svgWidth = cellWidth * numCols;
    const svgHeight = cellHeight * numRows;

    // Create SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", svgWidth);
    svg.setAttribute("height", svgHeight);

    // Iterate over table rows and cells to create SVG elements
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        // Create rectangle for cell border
        const rect = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect"
        );
        rect.setAttribute("x", j * cellWidth);
        rect.setAttribute("y", i * cellHeight);
        rect.setAttribute("width", cellWidth);
        rect.setAttribute("height", cellHeight);
        // Check cell content for Zomato or Swiggy and set background color accordingly
        const cellContent = tableElement.rows[i].cells[j].textContent;
        if (cellContent.includes("Zomato")) {
          rect.setAttribute("fill", "red");
        } else if (cellContent.includes("Swiggy")) {
          rect.setAttribute("fill", "orange");
        } else {
          rect.setAttribute("fill", "black");
        }
        rect.setAttribute("stroke", "white");
        rect.setAttribute("stroke-width", borderWidth);
        svg.appendChild(rect);

        // Create text element for cell content
        const text = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        text.setAttribute("x", j * cellWidth + cellWidth / 2);
        text.setAttribute("y", i * cellHeight + cellHeight / 2 + fontSize / 3);
        text.setAttribute("fill", "white");
        text.setAttribute("font-size", fontSize);
        text.setAttribute("font-family", "Calibri");
        text.setAttribute("text-anchor", "middle");
        text.textContent = cellContent;
        svg.appendChild(text);
      }
    }

    // Serialize SVG to XML string
    const svgXml = new XMLSerializer().serializeToString(svg);

    // Encode SVG XML string to base64
    const svgBase64 = btoa(svgXml);

    // Construct data URI
    const dataUri = `data:image/svg+xml;base64,${svgBase64}`;

    return dataUri;
  };

  const options = {
    series: {
      0: {
        annotations: { stem: { length: -30 } },
        targetAxisIndex: 0,
        type: "bars",
        tooltip: false,
      },
      1: {
        annotations: { stem: { length: 0 } },
        targetAxisIndex: 1,
        type: "line",
        lineWidth: 2,
        tooltip: false,
      },
    },
    vAxes: {
      0: {
        gridlines: { color: "transparent" },
        viewWindow: { min: 0 },
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

  useEffect(() => {
    if (chartImageURI !== "") {
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
          const utf8Data = unescape(encodeURIComponent(svgData));
          const base64Image = btoa(utf8Data);

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

            .catch((error) => {});

          //main table
          const tableElement = document.getElementById(tableid + "table");
          // console.log(tableid + "table");
          // console.log(tableElement);
          const svgDataUri = convertTableToSvg(tableElement);

          await convertSvgToPng(svgDataUri)
            .then((pngDataUri) => {
              slide.addImage({
                data: pngDataUri,
                x: 5.9,
                y: 1,
                w: 3.5,
                h: 3,
              });
            })
            .catch((error) => {
              console.log(error);
            });

          //mom table
          if (mom.length !== 0) {
            const momtableElement = document.getElementById(
              tableid + "momtable"
            );
            // console.log(momtableElement);
            const momsvgDataUri = convertTableToSvg(momtableElement);
            await convertSvgToPng(momsvgDataUri)
              .then((pngDataUri) => {
                const momImageOptions = {
                  data: pngDataUri,
                  x: 0.6,
                  y: 4.5,
                  w: 1.75,
                  h: 0.85,
                };

                slide.addImage(momImageOptions);
                slide.addText("MOM", {
                  y: 4,
                  x: 1,
                  w: 0.75,
                  h: 0.75,
                  color: "FFFFFF",
                  fontFace: "Calibri",
                  fontSize: 15,
                  bold: true,
                });
                // pptx.writeFile("output.pptx");
              })
              .catch((error) => {
                console.error("Error converting SVG to PNG:", error);
              });
          }

          //mom2 table
          if (mo2m.length !== 0) {
            const mom2tableElement = document.getElementById(
              tableid + "mo2mtable"
            );
            // console.log(mom2tableElement);
            const mom2svgDataUri = convertTableToSvg(mom2tableElement);
            await convertSvgToPng(mom2svgDataUri)
              .then((pngDataUri) => {
                const momImageOptions = {
                  data: pngDataUri,
                  x: 3,
                  y: 4.5,
                  w: 1.75,
                  h: 0.85,
                };
                slide.addText("MO2M", {
                  y: 4,
                  x: 3.45,
                  w: 1,
                  h: 0.75,
                  color: "FFFFFF",
                  fontFace: "Calibri",
                  fontSize: 15,
                  bold: true,
                });
                slide.addImage(momImageOptions);
                // console.log("slide1 rendered");
              })
              .catch((error) => {
                console.error("Error converting SVG to PNG:", error);
              });
          }
        } catch (error) {
          console.error("Error converting SVG to image:", error);
        }
      });
      // console.log("HHHHHHH");
    }
  }, [chartImageURI]);

  return (
    <>
      <h1>{data.title}</h1>
      <div id="googlegraphs">
        <Chart
          chartType="ScatterChart"
          data={graphData}
          options={options}
          // graph_id="ScatterChart1"
          width="70%"
          height={"450px"}
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
      <DataTable tableid={tableid} data={table} />
      {mom.length !== 0 ? <MomTable tableid={tableid} data={mom} /> : null}
      {mo2m.length !== 0 ? <Mo2mTable tableid={tableid} data={mo2m} /> : null}
    </>
  );
};

export default Slide4;
