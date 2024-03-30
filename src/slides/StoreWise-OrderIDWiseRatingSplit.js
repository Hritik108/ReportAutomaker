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
      id="momtable"
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

const Mom2Table = ({ data }) => {
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
      id="mom2table"
    >
      <thead>
        <tr>
          <th
            colSpan={data[0].length}
            style={{ borderBottom: "1px solid white" }}
          >
            MOM Values
          </th>
        </tr>
      </thead>
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

const StoreWiseOrderIDWiseRatingSplit = ({ pptx}) => {
  const countRef = useRef(0);

  const [options, setOptions] = useState({});
  const [chartEvents, setChartEvents] = useState([]);
  const [chartImageURI1, setChartImageURI1] = useState("");
  const [chartImageURI2, setChartImageURI2] = useState("");
  const chartRef = useRef(null);
  const checkRef = useRef(false);
//   const graphData = data.graph.graphdata;
  const graphData = [
    [
      "City",
      "Category 1",
      { role: "annotation" },
      "Category 2",
      { role: "annotation" },
      "Category 3",
      { role: "annotation" },
    ],
    [
      "New York City, NY",
      { v: 4000000, f: "4M" },
      "4M",
      { v: 3000000, f: "3M" },
      "3M",
      { v: 1000000, f: "1M" },
      "1M",
    ],
    [
      "Los Angeles, CA",
      { v: 2000000, f: "2M" },
      "2M",
      { v: 1500000, f: "1.5M" },
      "1.5M",
      { v: 800000, f: "800K" },
      "800K",
    ],
    [
      "Chicago, IL",
      { v: 1500000, f: "1.5M" },
      "1.5M",
      { v: 1000000, f: "1M" },
      "1M",
      { v: 600000, f: "600K" },
      "600K",
    ],
    [
      "Houston, TX",
      { v: 1200000, f: "1.2M" },
      "1.2M",
      { v: 800000, f: "800K" },
      "800K",
      { v: 400000, f: "400K" },
      "400K",
    ],
    [
      "Philadelphia, PA",
      { v: 1000000, f: "1M" },
      "1M",
      { v: 700000, f: "700K" },
      "700K",
      { v: 300000, f: "300K" },
      "300K",
    ],
  ];
  
//   const table = data.table;

  const mom = [
    ["Revenue", "-100%"],
    ["Orders", "-100%"],
  ];

  const mom2 = [
    ["Revenue", "-100%"],
    ["Orders", "-100%"],
  ];

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

  useEffect(() => {
    const options = {
        title: "Population of Largest U.S. Cities",
        hAxis: {
          title: "",
          gridlines: { color: "transparent" },
        },
        vAxis: {
          title: "",
          gridlines: { color: "transparent" },
        },
        legend: "none", // Hide legends
        isStacked: true,
        annotations: {
          textStyle: {
            fontSize: 7, // Adjust the font size of annotations
          },
        },
        chartArea: {
          left: 70,
          top: 70,
          bottom: 30,
          right: 70,
          width: "100%",
          height: "70%",
        },
        colors: ["rgb(119, 217, 112)", "rgb(255, 152, 0)", "rgb(250, 112, 112)"], // Specify the colors for each category
      };

    // const chart_events = [
    //   {
    //     eventName: "ready",
    //     callback: (rcatChart) => {
    //       if (!checkRef.current) {
    //         // Check the ref value
    //         const chartContainerHTML =
    //           rcatChart.chartWrapper.getChart().container.innerHTML;
    //         checkRef.current = true; // Update the ref value

    //         setChartImageURI(chartContainerHTML); // Update chartImageURI only if it has changed
    //       }
    //     },
    //   },
    // ];

    setOptions(options);

    // setChartEvents(chart_events);
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
        reject(error);
      };
      image.src = svgDataUri;
    });
  };

  useEffect(() => {
    const slide = pptx.addSlide();
    slide.background = { fill: "000000" };

    const node = document.createElement("div");
    node.innerHTML = chartImageURI1;

    const parser = new DOMParser();
    const doc = parser.parseFromString(chartImageURI1, "text/html");
    const svgs = doc.querySelectorAll("svg");

    const images = [];

    svgs.forEach(async (svg, index) => {
      try {
       
        const svgData = new XMLSerializer().serializeToString(svg);
        console.log("hello")
        console.log(svgData)
        const utf8Data = unescape(encodeURIComponent(svgData));
        const base64Image = btoa(utf8Data);
        
        const imageuri = `data:image/svg+xml;base64,${base64Image}`;
        console.log(imageuri)
        await convertSvgToPng(imageuri)
          .then((pngDataUri) => {
            slide.addImage({
              data: pngDataUri,
              x: 0.6,
              y: 1,
              w: 6,
              h: 2,
            });

            slide.addText("Overall Revenues - month on month", {
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



      } catch (error) {
        console.error("Error converting SVG to image:", error);
      }
    });
  }, [chartImageURI1]);

  const callme = () => (rcatChart) => {
    console.log(rcatChart);
  };

  const [sankey, setSankey] = useState(null);

  var newchartEvents = [
    {
      eventName: "ready",
      callback: ({ chartWrapper }) => {
        setSankey(chartWrapper);
      },
    },
  ];


  useEffect(() => {
    const slide = pptx.addSlide();
    slide.background = { fill: "000000" };

    const node = document.createElement("div");
    node.innerHTML = chartImageURI2;

    const parser = new DOMParser();
    const doc = parser.parseFromString(chartImageURI2, "text/html");
    const svgs = doc.querySelectorAll("svg");

    const images = [];

    svgs.forEach(async (svg, index) => {
      try {
       
        const svgData = new XMLSerializer().serializeToString(svg);
        console.log("hello")
        console.log(svgData)
        const utf8Data = unescape(encodeURIComponent(svgData));
        const base64Image = btoa(utf8Data);
        
        const imageuri = `data:image/svg+xml;base64,${base64Image}`;
        console.log(imageuri)
        await convertSvgToPng(imageuri)
          .then((pngDataUri) => {
            slide.addImage({
              data: pngDataUri,
              x: 0.6,
              y: 3,
              w: 6,
              h: 2,
            });

            slide.addText("Overall Revenues - month on month", {
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



      } catch (error) {
        console.error("Error converting SVG to image:", error);
      }
    });
  }, [chartImageURI2]);

  useEffect(() => {
    // side effect within useEffect is bad this doesn't get cleaned up on comonent unmount, just for demo purposes
    console.log(" I AM CALLED");
    if (sankey != null) {
      sankey.getChart().setSelection(null); // setting selection to null works this needs the actual google chart format and not the wrapper format
      console.log(sankey.getChart().getSelection());
      sankey.draw();
    }
    // reset selection after x seconds
  }, [sankey]);

  return (
    <>
      <div id="googlegraphs">
      <Chart
          chartType="BarChart"
          data={graphData}
          options={options}
          graph_id="verticalstackBarChart1"
          height={"400px"}
          legend_toggle={true}
          chartPackage={["controls"]}
          getChartWrapper={(rcatChart) => {
            setTimeout(() => {
              setChartImageURI1(rcatChart.visualization.container.innerHTML);
            }, 5000); // Wait for 5000 milliseconds (5 seconds)
          }}
        />
          <Chart
          chartType="BarChart"
          data={graphData}
          options={{...options ,isStacked: "percent"}}
          graph_id="verticalstackBarChart2"
          height={"400px"}
          legend_toggle={true}
          chartPackage={["controls"]}
          getChartWrapper={(rcatChart) => {
            setTimeout(() => {
              setChartImageURI2(rcatChart.visualization.container.innerHTML);
            }, 5000); // Wait for 5000 milliseconds (5 seconds)
          }}
        />
      </div>

    </>
  );
};

export default StoreWiseOrderIDWiseRatingSplit;