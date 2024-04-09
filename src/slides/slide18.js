import React, { useEffect, useState, useRef } from "react";
import { Chart } from "react-google-charts";
import { toPng } from "html-to-image";

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

const Slide18 = ({ tableid,pptx, data, title }) => {
  const [chartImageURI, setChartImageURI] = useState("");
  const table1 = data.table1
  const table2 = data.table2
  const graphData = data.graph;

  const options = {
    title: "",
    vAxis: { title: "" },
    hAxis: { title: "Month" },
    seriesType: "bars",
    // series: {
    //   0: { tooltip: false },
    //   1: { tooltip: false },
    //   2: { tooltip: false },
    //   3: { tooltip: false },
    //   4: { tooltip: false },
    //   5: { tooltip: false },
    // },
    'tooltip' : {
      trigger: 'none'
    },
    legend: { position: "top", maxLines: 5 }, // Move legend to the top
    annotations: {
      textStyle: {
        fontSize: 12,
        color: "#000000", // Annotation text color
      },
    },
    chartArea: {
      left: 70,
      top: 70,
      bottom: 30,
      right: 70,
      width: "90%",
      // height: "90%",
    },
  };

  // const graphData = [
  //   [
  //     "sub zone",
  //     "Total Food Issue",
  //     { role: "annotation" },
  //     "Quality issue",
  //     { role: "annotation" },
  //     "Quantity issue",
  //     { role: "annotation" },
  //     "packaging",
  //     { role: "annotation" },
  //     "wrong item",
  //     { role: "annotation" }, // Annotations for each data point
  //     "special inst issue",
  //     { role: "annotation" },
  //     "wrong item",
  //     { role: "Bad order" },
  //   ],
  //   ["Malad west", 165, 165, 938, 938, 522, 522, 998, 998, 450, 450, 165, 165, 938, 938,],
  //   ["dadar", 165, 165, 938, 938, 522, 522, 998, 998, 450, 450, 165, 165, 938, 938,],
  //   ["navi mumbai", 135, 135, 1120, 1120, 599, 599, 1268, 1268, 288, 288, 165, 165, 938, 938,],
  //   ["bkc", 157, 157, 1167, 1167, 587, 587, 807, 807, 397, 397, 165, 165, 938, 938,],
  //   ["2007/08", 139, 139, 1110, 1110, 615, 615, 968, 968, 215, 215, 165, 165, 938, 938,],
  //   ["2008/09", 136, 136, 691, 691, 629, 629, 1026, 1026, 366, 366, 165, 165, 938, 938,],
  // ];

  const convertTableToSvg = (tableElement, height) => {
    let cellWidth = 75;
    const cellHeight = height;
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
        if (j == 0) {
          cellWidth = 120;
          rect.setAttribute("x", j * cellWidth);
        } else {
          cellWidth = 50;
          rect.setAttribute("x", (j - 1) * cellWidth + 100);
        }
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
        // text.setAttribute("x", j * cellWidth + 5);
        if (j == 0) {
          text.setAttribute("x", j * cellWidth + 2);
        } else {
          text.setAttribute("x", (j - 1) * cellWidth + 120 + 2);
        }
        text.setAttribute("y", i * cellHeight + cellHeight / 2 + fontSize / 3);
        text.setAttribute("fill", "white");
        text.setAttribute("font-size", fontSize);
        text.setAttribute("font-family", "Calibri");
        text.setAttribute("text-anchor", "start");
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

       // Declare pptx using useRef to avoid reinitialization
       const pptxRef = useRef(null);
       useEffect(() => {
        pptxRef.current = pptx.addSlide();
      }, [])


  useEffect(() => {
    if (chartImageURI !== "") {
      // console.log(chartImageURI);
      // console.log("hello");
      // console.log(chartImageURI);
      // const pptx = new pptxgen();
      const slide = pptxRef.current;
      slide.background = { fill: "000000" };
      const node = document.createElement("div");
      node.innerHTML = chartImageURI;
      // console.log(chartImageURI);
      // console.log(node.innerHTML);
      const parser = new DOMParser();
      const doc = parser.parseFromString(chartImageURI, "text/html");
      const svgs = doc.querySelectorAll("svg");

      const images = [];
      // console.log(svgs);
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
          const table1svgDataUri = convertTableToSvg(table1Element, 15);
          await convertSvgToPng(table1svgDataUri)
            .then((pngDataUri) => {
              // console.log(pngDataUri);
              const table1ImageOptions = {
                data: pngDataUri,
                x: 6.7,
                y: 0.5,
                w: 3,
                h: 0.75,
              };

              // console.log(table1ImageOptions);

              slide.addImage(table1ImageOptions);
            })
            .catch((error) => {
              console.error("Error converting SVG to PNG:", error);
            });
          // console.log("hello");
          //mom2 table
          const table2Element = document.getElementById(tableid+"table2");
          const table2svgDataUri = convertTableToSvg(table2Element, 12);

          await convertSvgToPng(table2svgDataUri)
            .then((pngDataUri) => {
              // console.log(pngDataUri);
              const table2ImageOptions = {
                data: pngDataUri,
                x: 6.7,
                y: 1.3,
                w: 3,
                h: 4,
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
              // console.log("slide2 rendered");
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



  return (
    <div>
      <h2>{data.title}</h2>
      {/* <div id="googlegraphs18"> */}
        <Chart
          chartType="ComboChart"
          data={graphData}
          options={options}
          graph_id="ScatterChart18"
          width="70%"
          height={"400px"}
          legend_toggle={true}
          chartPackage={["controls"]}
          getChartWrapper={(rcatChart) => {
            setTimeout(() => {
              setChartImageURI(rcatChart.visualization.container.innerHTML);
            }, 5000); // Wait for 5000 milliseconds (5 seconds)
          }}
        />
      {/* </div> */}

      <Table1 tableid={tableid} data={table1} />
      <Table2 tableid={tableid} data={table2} />
    </div>
  );
};

export default Slide18;
