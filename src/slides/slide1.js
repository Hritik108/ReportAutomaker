import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Chart } from "react-google-charts";
import { toPng } from "html-to-image";
import { type } from "@testing-library/user-event/dist/type";
import { render } from "@testing-library/react";
import html2canvas from 'html2canvas';

const DataTable = ({ data, tableid }) => {
  const cellWidth = 120;
  const cellHeight = 10;
  const borderWidth = 1;
  const fontSize = 20;
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
                {typeof cell === 'number' && !isNaN(cell)? parseFloat(cell.toFixed(1)).toLocaleString(`en-IN`):cell}
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
                {typeof cell === 'number' && !isNaN(cell)? parseFloat(cell.toFixed(0)).toLocaleString(`en-IN`):cell}
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
                {typeof cell === 'number' && !isNaN(cell)? parseFloat(cell.toFixed(0)).toLocaleString(`en-IN`):cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};



const Slide4 = ({ pptx, data, tableid,pptFooter }) => {
  const [chartImageURI, setChartImageURI] = useState("");
  const table = data.table;
  const graphData = data.graph;

  let mom = [];
  let mo2m = [];

  if (data.hasOwnProperty("mom") && data.hasOwnProperty("mo2m")) {
    mom = data.mom;
    mo2m = data.mo2m;
  }

  const convertTableToImage = (tableElement) => {
    return new Promise((resolve, reject) => {
      html2canvas(tableElement)
        .then((canvas) => {
          const dataURL = canvas.toDataURL('image/png');
          resolve(dataURL);
        })
        .catch((error) => {
          console.error('Error converting table to image:', error);
          reject(error);
        });
    });
  };
  

  const formatNumber = (number) => {
    const crore = 10000000;
    const lakh = 100000;
    const thousand = 1000;
    if (number >= crore) {
      return (number / crore).toFixed(2) + " Cr";
    } else if (number >= lakh) {
      return (number / lakh).toFixed(2) + " L";
    } else if (number >= thousand) {
      return (number / thousand).toFixed(2) + " K";
    } else {
      return number.toString();
    }
  };

  const options = {
    chartLanguage: "en-IN",
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
      2: { targetAxisIndex: 1, type: "line", lineWidth: 2 },
      3: { targetAxisIndex: 1, type: "line", lineWidth: 2 },
    },

    vAxes: {
      0: {
        gridlines: { color: "transparent" },
        viewWindow: { min: 0 },
        format: "short",
      },
      1: {
        // gridlines: { color: "transparent" },
        viewWindow: { min: 0 },
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

  // Declare pptx using useRef to avoid reinitialization
  const pptxRef = useRef(null);
  useEffect(() => {
    pptxRef.current = pptx.addSlide();
  }, []);

  useEffect(() => {
    if (chartImageURI !== "") {
      // const slide = pptx.addSlide();
      const slide = pptxRef.current;
      slide.background = { fill: "000001" };

      const node = document.createElement("div");
      node.innerHTML = chartImageURI;

      const parser = new DOMParser();
      const doc = parser.parseFromString(chartImageURI, "text/html");
      const svgs = doc.querySelectorAll("svg");

      const images = [];

      svgs.forEach(async (svg, index) => {
        try {
          //main table
          const tableElement = document.getElementById(tableid + "table");
          const pngDataUri= convertTableToImage(tableElement)
          // console.log(tableid + "table");
          console.log(pngDataUri);
          // const svgDataUri = convertTableToSvg(tableElement);

          await convertTableToImage(tableElement)
          .then((pngDataUri) => {
            slide.addImage({
              data: pngDataUri,
              x: 5.9,
              y: 1,
              w: 30.5,
              h: 3,
            });
              console.log(pngDataUri)
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
            // const momsvgDataUri = convertTableToSvg(momtableElement, true);
            await convertTableToImage(momtableElement)
              .then((pngDataUri) => {
                const momImageOptions = {
                  data: pngDataUri,
                  x: 10.6,
                  y: 4.5,
                  w: 900.75,
                  h: 5.85,
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
            // const mom2svgDataUri = convertTableToSvg(mom2tableElement, true);
            await convertTableToImage(mom2tableElement)
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
      <h1>{data.title} hhe</h1>
      <div id="googlegraphs">
        <Chart
          chartLanguage={"hi"}
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
              let modifiedHtmlContent =
                rcatChart.visualization.container.innerHTML.replace(
                  /लाख/g,
                  "L"
                );
              modifiedHtmlContent = modifiedHtmlContent.replace(/हज़ार/g, "K");
              modifiedHtmlContent = modifiedHtmlContent.replace(/क॰/g, "Cr");
              // console.log(modifiedHtmlContent);
              setChartImageURI(modifiedHtmlContent);
            }, 5000); // Wait for 5000 milliseconds (5 seconds)
          }}
          // chartLanguage={"hi"}
          // ref={chartRef}
        />
        <p> hello </p>
      </div>
      <DataTable tableid={tableid} data={table} />
      <p> hello </p>
      {mom.length !== 0 ? <MomTable tableid={tableid} data={mom} /> : null}
      {mo2m.length !== 0 ? <Mo2mTable tableid={tableid} data={mo2m} /> : null}
    </>
  );
};

export default Slide4;
