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

const MomTable = ({ data,tableid }) => {
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
      id={tableid+"momtable"}
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


const Slide27 = ({ pptx,tableid, data,pptFooter}) => {

  const [chartImageURI, setChartImageURI] = useState("");

  const graphData = data.graph

 
  const mom = data.mom




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
    'tooltip' : {
      trigger: 'none'
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
        rect.setAttribute("fill", "black");
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
        // text.setAttribute("fill", "white");

        if (j == 1) {
          if (cellContent > 0) {
            text.setAttribute("fill", "green");
            text.textContent = cellContent+"%";
          } else if (cellContent < 0) {
            text.setAttribute("fill", "red");
            text.textContent = cellContent+"%";
          } else {
            text.setAttribute("fill", "white");
            text.textContent = cellContent+"%";
          }
         
        } else {
          text.setAttribute("fill", "white");
          text.textContent = cellContent;
        }


        text.setAttribute("font-size", fontSize);
        text.setAttribute("font-family", "Calibri");
        text.setAttribute("text-anchor", "middle");
        // text.textContent = cellContent;
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

// Declare pptx using useRef to avoid reinitialization
const pptxRef = useRef(null);
useEffect(() => {
pptxRef.current = pptx.addSlide();
}, [])


  useEffect(() => {

    if(chartImageURI !== ""){
    const slide = pptxRef.current;
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
        // const base64Image = btoa(svgData);
        const utf8Data = unescape(encodeURIComponent(svgData));
        const base64Image = btoa(utf8Data);

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
              pptFooter,              {
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
        const momtableElement = document.getElementById(tableid+"momtable");
   
        const momsvgDataUri = convertTableToSvg(momtableElement);
        await convertSvgToPng(momsvgDataUri)
          .then((pngDataUri) => {
            const momImageOptions = {
              data: pngDataUri,
              x: 8,
              y: 1.2,
              w: 1.75,
              h: 1.275,
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
    // console.log("HHHHHHH")
  }
  }, [chartImageURI]);


  return (
    <><h1>{data.title}</h1>
      <div id="googlegraphs">
        <Chart
          chartLanguage={"hi"}
          chartType="ScatterChart"
          data={graphData}
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
            setChartImageURI(modifiedHtmlContent);
            }, 5000); // Wait for 5000 milliseconds (5 seconds)
          }}
          // ref={chartRef}
        />
      </div>
      {/* <DataTable id="table" data={table} /> */}
      <MomTable tableid={tableid} data={mom} />
      {/* <Mo2mTable id="Slide27mom2table" data={mom2} /> */}
    </>
  );
};

export default Slide27;