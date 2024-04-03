import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Chart } from "react-google-charts";
import { toPng } from "html-to-image";
import { type } from "@testing-library/user-event/dist/type";
import { render } from "@testing-library/react";

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

const MomTable = ({ data }) => {
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
      id="Slide27momtable"
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

const Mo2mTable = ({ data }) => {
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
      id="Slide27mo2mtable"
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

const Slide27 = ({ pptx, data,title }) => {

  console.log('12 Slide27')



  const [chartImageURI, setChartImageURI] = useState("");

  const graphData = data.graph

  // const graphData = [
  //   [
  //     "",
  //     "Menu opens",
  //     { role: "annotation" },
  //     "M2C in %",
  //     { role: "annotation" },
  //     "M2O in %",
  //     { role: "annotation" },
  //     "C2O in %",
  //     { role: "annotation" },
  //   ],
  //   ["Jul-2023", 21370, 21370, 33, 33, 19, 19, 55, 55],
  //   ["Aug-2023", 25470, 25470, 34, 34, 17, 17, 48, 48],
  //   ["Sep-2023", 36550, 36550, 34, 34, 19, 19, 55, 55],
  //   ["Oct-2023", 35310, 35310, 37, 37, 20, 20, 55, 55],
  //   ["Nov-2023", 35820, 35820, 37, 37, 21, 21, 56, 56],
  //   ["Dec-2023", 39040, 39040, 36, 36, 20, 20, 54, 54],
  // ];
//   const table = data.table;

  // const mom = [
  //   ["Revenue", "-100%"],
  //   ["Orders", "-100%"],
  // ];
  const mom = data.mom

  // const mom2 = [
  //   ["Revenue", "-90%"],
  //   ["Orders", "-90%"],
  // ];

  const options = {
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

    if(chartImageURI !== ""){
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
              x: 0.3,
              y: 1,
              w: 7.5,
              h: 4.2,
            });

            slide.addText("Malad  West - Revenues & Orders", {
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

        //mom table
        const momtableElement = document.getElementById("Slide27momtable");

        const momsvgDataUri = convertTableToSvg(momtableElement);
        await convertSvgToPng(momsvgDataUri)
          .then((pngDataUri) => {
            const momImageOptions = {
              data: pngDataUri,
              x: 8,
              y: 1.2,
              w: 1.7,
              h: 0.7,
            };

            slide.addImage(momImageOptions);
            slide.addText("MOM", {
              y: 0.7,
              x: 8.5,
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

        
      } catch (error) {
        console.error("Error converting SVG to image:", error);
      }
    });
    console.log("HHHHHHH")
  }
  }, [chartImageURI]);


  return (
    <><h1>{title}</h1>
      <div id="googlegraphs">
        <Chart
          chartType="ScatterChart"
          data={graphData}
          options={options}
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
      {/* <DataTable id="table" data={table} /> */}
      <MomTable id="Slide27momtable" data={mom} />
      {/* <Mo2mTable id="Slide27mom2table" data={mom2} /> */}
    </>
  );
};

export default Slide27;