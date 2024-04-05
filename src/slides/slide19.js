import React, { useEffect, useState, useRef } from "react";
import { Chart } from "react-google-charts";
import { toPng } from "html-to-image";

const Table1 = ({ data }) => {
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
      id="Slide19table1"
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

const Table2 = ({ data }) => {
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
      id="Slide19table2"
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

const Slide19 = ({ pptx }) => {
  const countRef = useRef(0);
  // console.log("App body: "+ ++countRef.current)
  // const [data, setData] = useState([]);
  const [chartEvents, setChartEvents] = useState([]);
  const [chartImageURI, setChartImageURI] = useState("");
  const [chartImage, setChartImage] = useState("");
  const [check, setCheck] = useState(false);
  const chartRef = useRef(null);
  const chartImageURIRef = useRef(null);
  const checkRef = useRef(false);
  console.log('6 slide19')

  // const graphData = [
  //     ["sub zone", "Total Food Issue", { role: "annotation" }, "Quality issue", "Quantity issue", "packaging", "wrong item", "special inst issue", "Bad order"],
  //     ["Malad west", 31, 31, 31, 1, 2, 4, 0, 78],
  //     ["dadar", 10,10, 31, 1, 34, 4, 0, 28],
  //     ["navi mumbai", 3,3, 31, 1, 3, 4, 0, 18],
  //     ["bkc", 20,20, 31, 1, 2, 4, 0, 8]
  // ];
  const table1 = [
    ["Total orders", 0],
    ["ORS", 0],
    ["ORS %", 0],
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
    ["Total", 100],
  ];

  const options = {
    title: "",
    vAxis: { title: "" },
    hAxis: { title: "" },
    seriesType: "bars",
    series: { 5: { type: "line" } },
    // legend: { position: "top" }, // Move legend to the top
    legend: { position: "top",maxLines:5 },
    annotations: {
      textStyle: {
        fontSize: 12,
        color: "#000000", // Annotation text color
      },
    },
    'tooltip' : {
      trigger: 'none'
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

  const graphData = [
    [
      "sub zone",
      "order_statues_delay",
      { role: "annotation" },
      "order_cancellation",
      { role: "annotation" },
      "poor_quality",
      { role: "annotation" },
      "order_spilled",
      { role: "annotation" },
      "instructions_not_followed",
      { role: "annotation" }, // Annotations for each data point
      "wrong_order",
      { role: "annotation" },
      "rejection",
      { role: "annotation" },
      "missing_item",
      { role: "annotation" },
      "instructions",
      { role: "annotation" },
      "untagged",
      { role: "annotation" },
      "refund_query",
      { role: "annotation" },
      "billing_issues",
      { role: "annotation" },
      "food_not__delivered",
      { role: "annotation" },
      "others",
      { role: "annotation" },
      "total",
      { role: "annotation" },
    ],
    [
      "Malad west",
      165,
      165,
      938,
      938,
      522,
      522,
      998,
      998,
      450,
      450,
      165,
      165,
      938,
      938,
      165,
      165,
      938,
      938,
      522,
      522,
      998,
      998,
      450,
      450,
      165,
      165,
      938,
      938,
      938,
      938,
    ],
    [
      "dadar",
      165,
      165,
      938,
      938,
      522,
      522,
      998,
      998,
      450,
      450,
      165,
      165,
      938,
      938,
      165,
      165,
      938,
      938,
      522,
      522,
      998,
      998,
      450,
      450,
      165,
      165,
      938,
      938,
      938,
      938,
    ],
    [
      "navi mumbai",
      135,
      135,
      1120,
      1120,
      599,
      599,
      1268,
      1268,
      288,
      288,
      165,
      165,
      938,
      938,
      135,
      135,
      1120,
      1120,
      599,
      599,
      1268,
      1268,
      288,
      288,
      165,
      165,
      938,
      938,
      165,
      165,
    ],
    [
      "bkc",
      157,
      157,
      1167,
      1167,
      587,
      587,
      807,
      807,
      397,
      397,
      165,
      165,
      938,
      938,
      157,
      157,
      1167,
      1167,
      587,
      587,
      807,
      807,
      397,
      397,
      165,
      165,
      938,
      938,
      938,
      938,
    ],
    [
      "kandivali",
      139,
      139,
      1110,
      1110,
      615,
      615,
      968,
      968,
      215,
      215,
      165,
      165,
      938,
      938,
      139,
      139,
      1110,
      1110,
      615,
      615,
      968,
      968,
      215,
      215,
      165,
      165,
      938,
      938,
      165,
      165,
    ],
    [
      "Borivali",
      136,
      136,
      691,
      691,
      629,
      629,
      1026,
      1026,
      366,
      366,
      165,
      165,
      938,
      938,
      136,
      136,
      691,
      691,
      629,
      629,
      1026,
      1026,
      366,
      366,
      165,
      165,
      938,
      938,
      938,
      938,
    ],
  ];

  const convertTableToSvg = (tableElement, height) => {
    let cellWidth = 75;
    const cellHeight = height;
    const borderWidth = 1;
    const fontSize = 6;

    // Get the number of rows and columns in the table
    const numRows = tableElement.rows.length;
    const numCols = tableElement.rows[0].cells.length;

    // Calculate SVG dimensions
    // const svgWidth = cellWidth * numCols;
    const svgWidth = 140;
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
          cellWidth = 90;
          rect.setAttribute("x", j * cellWidth);
        } else {
          cellWidth = 50;
          rect.setAttribute("x", (j - 1) * cellWidth + 90);
        }
        rect.setAttribute("y", i * cellHeight);
        rect.setAttribute("width", cellWidth);
        rect.setAttribute("height", cellHeight);
        // Check cell content for Zomato or Swiggy and set background color accordingly
        const cellContent = tableElement.rows[i].cells[j].textContent;
        if (cellContent.includes("Reason")|| cellContent == "%") {
          rect.setAttribute("fill", "red");
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

  // useEffect(() => {
  //   console.log("data:");
  //   console.log(data);
  // }, [data]);

  useEffect(() => {
    if (chartImageURI !== "") {
      // console.log(chartImageURI);
      // console.log("hello");
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

              slide.addText("Negative Reviews Zomato...", {
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
          const table1Element = document.getElementById("Slide19table1");
          // console.log(table1Element);
          const table1svgDataUri = convertTableToSvg(table1Element, 10);
          await convertSvgToPng(table1svgDataUri)
            .then((pngDataUri) => {
              // console.log(pngDataUri);
              const table1ImageOptions = {
                data: pngDataUri,
                x: 6.5,
                y: 1,
                w: 3.3,
                h: 0.65,
              };

              // console.log(table1ImageOptions);

              slide.addImage(table1ImageOptions);
            })
            .catch((error) => {
              console.error("Error converting SVG to PNG:", error);
            });
          console.log("hello");
          //mom2 table
          const table2Element = document.getElementById("Slide19table2");
          const table2svgDataUri = convertTableToSvg(table2Element, 10);

          await convertSvgToPng(table2svgDataUri)
            .then((pngDataUri) => {
              // console.log(pngDataUri);
              const table2ImageOptions = {
                data: pngDataUri,
                x: 6.5,
                y: 1.7,
                w: 3.3,
                h: 3.5,
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
      <h2>Welcome to React{++countRef.current}</h2>
      <Chart
        chartType="ComboChart"
        data={graphData}
        options={options}
        graph_id="ScatterChart19"
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
      <Table1 data={table1} />
      <Table2 data={table2} />
    </div>
  );
};

export default Slide19;
