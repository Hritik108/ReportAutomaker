import React, { useEffect, useState, useRef } from "react";
import { Chart } from "react-google-charts";
import { toPng } from "html-to-image";
// import {setTimeout} from "timers/promises"
// import { PptxGenJS } from "pptxgenjs";

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
    months: [
      "October-2023",
      "November-2023",
      "December-2023",
      "January-2024",
      "February-2024",
      "March-2024",
    ],
    "Net Revenue (in lacs)": [6895410.499047618, 0, 0, 0, 0, 0],
    Orders: [14404, 0, 0, 0, 0, 0],
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

const DataTable = ({ data }) => {
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
      id="table"
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

const Table1 = ({ data,tableid }) => {
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
      id={tableid+"table1"}
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

const Table2 = ({ data,tableid }) => {
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
      id={tableid+"table2"}
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

const Slide2 = ({ data, pptx,tableid, title }) => {
  // console.log("App body: "+ ++countRef.current)

  const [chartImageURI, setChartImageURI] = useState("");
  const chartRef = useRef(null);
  const table1 = data.table1;
  const table2 = data.table2;
  const graphData = data.graph;
  console.log("2 Slide2");
  const options = {
    title: "",
    seriesType: "bars",
    series: {
      0: { tooltip: false },
      1: { tooltip: false },
      2: { type: "line", lineWidth: 2, targetAxisIndex: 1, tooltip: false },
      3: { type: "line", lineWidth: 2, targetAxisIndex: 1, tooltip: false },
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

  const convertTableToSvg = (tableElement) => {
    const cellWidth = 75;
    const cellHeight = 20;
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

        // Get cell content
        // const cellContent = tableElement.rows[i].cells[j].textContent;

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
        console.log(error);
        reject(error);
      };
      image.src = svgDataUri;
    });
  };

  useEffect(() => {
    // console.log(chartImageURI);
    if (chartImageURI !== "") {
      console.log("hello");
      // console.log(chartImageURI);
      // const pptx = new pptxgen();
      const slide = pptx.addSlide();
      slide.background = { fill: "000000" };
      // setChartImageURI(chartRef.current?.chart);
      const node = document.createElement("div");
      node.innerHTML = chartImageURI;
      // console.log(chartImageURI);
      // console.log(node.innerHTML);
      const parser = new DOMParser();
      const doc = parser.parseFromString(chartImageURI, "text/html");
      const svgs = doc.querySelectorAll("svg");

      const images = [];
      console.log(svgs);
      svgs.forEach(async (svg, index) => {
        try {
          const svgData = new XMLSerializer().serializeToString(svg);
          const utf8Data = unescape(encodeURIComponent(svgData));
          const base64Image = btoa(utf8Data);

          const imageuri = `data:image/svg+xml;base64,${base64Image}`;
          // console.log(imageuri);

          await convertSvgToPng(imageuri)
            .then((pngDataUri) => {
              // console.log(pngDataUri);

              slide.addImage({
                data: pngDataUri,
                x: 0.3,
                y: 1,
                w: 6,
                h: 4.2,
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

              //  pptx.writeFile("output.pptx");
            })

            .catch((error) => {
              console.error("Error converting SVG to PNG:", error);
            });

          //mom table
          const table1Element = document.getElementById(tableid+"table1");
          // console.log(table1Element);
          const table1svgDataUri = convertTableToSvg(table1Element);
          await convertSvgToPng(table1svgDataUri)
            .then((pngDataUri) => {
              // console.log(pngDataUri);
              const table1ImageOptions = {
                data: pngDataUri,
                x: 6.7,
                y: 1,
                w: 3,
                h: 2,
              };

              console.log(table1ImageOptions);

              slide.addImage(table1ImageOptions);
            })
            .catch((error) => {
              console.error("Error converting SVG to PNG:", error);
            });
          console.log("hello");
          //mom2 table
          const table2Element = document.getElementById(tableid+"table2");
          const table2svgDataUri = convertTableToSvg(table2Element);

          await convertSvgToPng(table2svgDataUri)
            .then((pngDataUri) => {
              // console.log(pngDataUri);
              const table2ImageOptions = {
                data: pngDataUri,
                x: 6.7,
                y: 3.2,
                w: 3,
                h: 2,
              };

              // console.log(table2ImageOptions);
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
              slide.addImage(table2ImageOptions);
              // pptx.writeFile("output.pptx");
              console.log("slide2 rendered");
            })
            .catch((error) => {
              console.error("Error converting SVG to PNG:", error);
            });
        } catch (error) {
          console.error("Error converting SVG to image:", error);
        }
      });
    }
  }, [chartImageURI]);

  const generateppt = async () => {
    console.log("hello");
    setChartImageURI(chartRef.current?.chart);
  };

  return (
    <div>
      <h2>{data.title}</h2>
      <div id="googlegraphs">
        <Chart
          chartType="ScatterChart"
          data={graphData}
          options={options}
          // graph_id="ScatterChart2"
          width="70%"
          height={"470px"}
          legend_toggle={true}
          chartPackage={["controls"]}
          getChartWrapper={(rcatChart) => {
            setTimeout(() => {
              setChartImageURI(rcatChart.visualization.container.innerHTML);
            }, 5000); // Wait for 5000 milliseconds (5 seconds)
          }}
          onload={() => console.log("char hello")}
        />
      </div>

      <Table1 tableid={tableid} data={table1} />
      <Table2 tableid={tableid} data={table2} />
      <div>
        <div dangerouslySetInnerHTML={{ __html: chartImageURI }} />
      </div>
    </div>
  );
};

export default Slide2;
