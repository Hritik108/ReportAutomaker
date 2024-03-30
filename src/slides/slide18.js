
import React, { useEffect, useState, useRef } from "react";
import { Chart } from "react-google-charts";
import { toPng } from "html-to-image";

const Table181 = ({ data }) => {
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
        id="table181"
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
  
const Table182 = ({ data }) => {
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
        id="table182"
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

const Slide18 = ({ pptx }) => {
    const countRef = useRef(0);
    // console.log("App body: "+ ++countRef.current)
    const [data, setData] = useState([]);
    const [options, setOptions] = useState({});
    const [chartEvents, setChartEvents] = useState([]);
    const [chartImageURI, setChartImageURI] = useState("");
    const [chartImage, setChartImage] = useState("");
    const [check, setCheck] = useState(false);
    const chartRef = useRef(null);
    const chartImageURIRef = useRef(null);
    const checkRef = useRef(false);
    const graphData = [
        ["sub zone", "Total Food Issue", { role: "annotation" }, "Quality issue", "Quantity issue", "packaging", "wrong item", "special inst issue", "Bad order"],
        ["Malad west", 31, 31, 31, 1, 2, 4, 0, 78],
        ["dadar", 10,10, 31, 1, 34, 4, 0, 28],
        ["navi mumbai", 3,3, 31, 1, 3, 4, 0, 18],
        ["bkc", 20,20, 31, 1, 2, 4, 0, 8]
    ];
    const table1 = [
        ["Total orders", 0],
        ["ORS", 0],
        ["ORS %", 0]
    ];
  
    const table2 = [
        ["Reasons", "%"],
        ["order_status_delay", 0],
        ["order_cancellation", 0],
        ["poor_quality", 0],
        ["order_spilled", 0],
        ["instructions_not_followed", 0],
        ["wrong_order", 0],
        ["rejection", 0],
        ["missing_item", 0],
        ["instructions", 0],
        ["untagged", 0],
        ["refund_query", 0],
        ["billing_issues", 0],
        ["food_not_delivered", 0],
        ["others", 0],
        ["Total", 100]
    ];
  
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
  
    useEffect(() => {
      // console.log("UseEffect body: "+ ++countRef.current)
      const options = {
        // chart: {
        //   title: "Company Performance",
        //   subtitle: "Sales, Expenses, and Profit: 2014-2017",
        // },
        legend: { position: "top"},
        annotations: {
            alwaysOutside: true,
            textStyle: {
              fontSize: 14,
              bold: true,
            },
        }
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
              console.log(chartContainerHTML);
              setChartImageURI(chartContainerHTML); // Update chartImageURI only if it has changed
            }
          },
        },
      ];
  
  
      setOptions(options);
      console.log("before setting chart_events in setChartEvents(chart_events) ");
      // console.log(chart_events.length);
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
          console.log(error);
          reject(error);
        };
        image.src = svgDataUri;
      });
    };
  
    useEffect(() => {
      console.log("data:");
      console.log(data);
    }, [data]);
  
    useEffect(() => {
      console.log(chartImageURI);
      console.log("hello");
      console.log(chartImageURI);
      // const pptx = new pptxgen();
      const slide = pptx.addSlide();
      slide.background = { fill: "000000" };
      // setChartImageURI(chartRef.current?.chart);
      const node = document.createElement("div");
      node.innerHTML = chartImageURI;
      console.log(chartImageURI);
      console.log(node.innerHTML);
      const parser = new DOMParser();
      const doc = parser.parseFromString(chartImageURI, "text/html");
      const svgs = doc.querySelectorAll("svg");
  
      const images = [];
      console.log(svgs);
      svgs.forEach(async (svg, index) => {
        try {
          const svgData = new XMLSerializer().serializeToString(svg);
          const base64Image = btoa(svgData);
          console.log(svg);
  
          const imageuri = `data:image/svg+xml;base64,${base64Image}`;
          console.log(imageuri);
  
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
  
              slide.addText("Negative Reviews...", {
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
          const table1Element = document.getElementById("table181");
          console.log(table1Element);
          const table1svgDataUri = convertTableToSvg(table1Element);
          await convertSvgToPng(table1svgDataUri)
            .then((pngDataUri) => {
              console.log(pngDataUri);
              const table1ImageOptions = {
                data: pngDataUri,
                x: 6.7,
                y: 0.5,
                w: 3,
                h: 1,
              };
  
              console.log(table1ImageOptions);
  
              slide.addImage(table1ImageOptions);
            })
            .catch((error) => {
              console.error("Error converting SVG to PNG:", error);
            });
          console.log("hello");
          //mom2 table
          const table2Element = document.getElementById("table182");
          const table2svgDataUri = convertTableToSvg(table2Element);
  
          await convertSvgToPng(table2svgDataUri)
            .then((pngDataUri) => {
              console.log(pngDataUri);
              const table2ImageOptions = {
                data: pngDataUri,
                x: 6.7,
                y: 1.5,
                w: 3,
                h: 4,
              };
  
              console.log(table2ImageOptions);
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
              console.log("slide2 rendered")
            })
            .catch((error) => {
              console.error("Error converting SVG to PNG:", error);
            });
        } catch (error) {
          console.error("Error converting SVG to image:", error);
        }
      });
    }, [chartImageURI]);
  
    const generateppt = async () => {
      console.log("hello");
      setChartImageURI(chartRef.current?.chart);
    };
  
    return (
      <div>
        <h2>Welcome to React{++countRef.current}</h2>
        <div id="googlegraphs18">
          <Chart
            chartType="Bar"
            data={graphData}
            options={options}
            graph_id="ScatterChart18"
            width="70%"
            height={"400px"}
            legend_toggle={true}
            chartPackage={["controls"]}
            // getChartWrapper={(rcatChart) => {
            //   setTimeout(() => {
            //     setChartImageURI(rcatChart.visualization.container.innerHTML);
            //   }, 5000); // Wait for 5000 milliseconds (5 seconds)
            // }}
            getChartWrapper={(rcatChart) => {
              setTimeout(() => {
                setChartImageURI(rcatChart.visualization.container.innerHTML);
              }, 5000); // Wait for 5000 milliseconds (5 seconds)
            }}
            // // ref={chartRef}
            // onload={() => console.log("char hello")}
          />
        </div>
  
        <Table181 id="table181" data={table1} />
        <Table182 id="table182" data={table2} />
      </div>
    );
};
  
export default Slide18;  