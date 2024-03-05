import React, { useState } from "react";
import { render } from "react-dom";
import { Chart } from "react-google-charts";
import pptxgen from "pptxgenjs";
import { toPng } from "html-to-image";
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

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      options: {},
    };
    this.table = [
      ["Month", "Swiggy (in lacs)", "Zomato (in lacs)", "Total (in lacs)"],
      ["Oct-2023", 19.9, 49.1, 69],
      ["Nov-2023", 0, 0, 0],
      ["Dec-2023", 0, 0, 0],
      ["Jan-2024", 0, 0, 0],
      ["Feb-2024", 0, 0, 0],
      ["Mar-2024", 0, 0, 0],
    ];

    this.mom = [
      ["Revenue", "-100%"],
      ["Orders", "-100%"],
    ];

    this.mom2 = [
      ["Revenue", "-100%"],
      ["Orders", "-100%"],
    ];
  }

  convertTableToSvg(tableElement) {
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
        rect.setAttribute("fill", "black");
        rect.setAttribute("stroke", "white");
        rect.setAttribute("stroke-width", borderWidth);
        svg.appendChild(rect);

        // Get cell content
        const cellContent = tableElement.rows[i].cells[j].textContent;

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
  }

  componentDidMount() {
    let options = {
      series: {
        0: { targetAxisIndex: 0, type: "bars" }, // First series as bars, using the first y-axis
        1: { targetAxisIndex: 1, type: "line", lineWidth: 2 }, // Second series as line, using the second y-axis
      },
      vAxes: {
        // Define the first y-axis
        0: {
          gridlines: { color: "transparent" },
          viewWindow: { min: 0 },
        },
        // Define the second y-axis
      },
      legend: { position: "top" },
      annotations: {
        alwaysOutside: true,
        textStyle: {
          fontSize: 14, // Set the font size for the line graph values
          bold: true, // Set the font weight for the line graph values
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

    let data = [
      [
        "",
        "Net Revenue",
        { role: "annotation" },
        "Orders",
        { role: "annotation" },
      ],
      ["Jul-2023", 94.2, 94.2, 19502, 19502],
      ["Aug-2023", 92.2, 92.2, 19715, 19715],
      ["Sep-2023", 104.0, 104.0, 21665, 21665],
      ["Oct-2023", 118.1, 118.1, 25366, 25366],
      ["Nov-2023", 127.3, 127.3, 25802, 25802],
      ["Dec-2023", 150.0, 150.0, 31199, 31199],
    ];
    let chart_events = [
      {
        eventName: "ready",
        callback: (rcatChart) => {
          const imageURI = rcatChart.chartWrapper
            .getChart()
            .getImageURI({ imageResolution: 1 });

          if (imageURI !== this.state.chartImageURI) {
            this.setState({
              chartImageURI:
                rcatChart.chartWrapper.getChart().container.innerHTML,
            });
          }
        },
      },
    ];

    this.setState({
      data: data,
      options: options,
      chart_events: chart_events,
    });
  }

  convertSvgToPng(svgDataUri) {
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
  }

  generateppt() {
    const pptx = new pptxgen();
    const slide = pptx.addSlide();
    slide.background = { fill: "000000" };

    const node = document.createElement("div");
    node.innerHTML = this.state.chartImageURI;

    const parser = new DOMParser();
    const doc = parser.parseFromString(this.state.chartImageURI, "text/html");
    const svgs = doc.querySelectorAll("svg");

    const images = [];

    svgs.forEach(async (svg, index) => {
      try {
        const svgData = new XMLSerializer().serializeToString(svg);
        const base64Image = btoa(svgData);

        const imageuri = `data:image/svg+xml;base64,${base64Image}`;
        console.log(imageuri);

        this.convertSvgToPng(imageuri)
          .then((pngDataUri) => {
            // console.log(pngDataUri);

            slide.addImage({
              data: pngDataUri,
              x: 0.6,
              y: 1,
              w: 4.5,
              h: 3,
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
          })

          .catch((error) => {
            console.error("Error converting SVG to PNG:", error);
          });

        //main table
        const tableElement = document.getElementById("table");
        const svgDataUri = this.convertTableToSvg(tableElement);

        this.convertSvgToPng(svgDataUri)
          .then((pngDataUri) => {
            // console.log(pngDataUri);
            slide.addImage({
              data: pngDataUri,
              x: 5.9,
              y: 1,
              w: 3.5,
              h: 3,
            });
            // pptx.writeFile("output.pptx");
          })
          .catch((error) => {
            console.error("Error converting SVG to PNG:", error);
          });

        //mom table
        const momtableElement = document.getElementById("momtable");
        console.log(momtableElement);
        const momsvgDataUri = this.convertTableToSvg(momtableElement);
        this.convertSvgToPng(momsvgDataUri)
          .then((pngDataUri) => {
            console.log(pngDataUri);
            const momImageOptions = {
              data: pngDataUri,
              x: 0.6,
              y: 4.5,
              w: 1.5,
              h: 0.7,
            };

            console.log(momImageOptions);

            slide.addImage(momImageOptions);
            // slide.addText("MOM", {
            //   y: 4.2,
            //   x: 0.6,
            //   w: 0.75,
            //   h: 0.75,
            //   color: "FFFFFF",
            //   fontFace: "Calibri",
            //   fontSize: 15,
            //   bold: true,
            // });
            // pptx.writeFile("output.pptx");
          })
          .catch((error) => {
            console.error("Error converting SVG to PNG:", error);
          });

        //mom2 table
        const mom2tableElement = document.getElementById("momtable");
        console.log(momtableElement);
        const mom2svgDataUri = this.convertTableToSvg(mom2tableElement);
        this.convertSvgToPng(mom2svgDataUri)
          .then((pngDataUri) => {
            console.log(pngDataUri);
            const momImageOptions = {
              data: pngDataUri,
              x: 3,
              y: 4.5,
              w: 1.7,
              h: 0.7,
            };

            console.log(momImageOptions);

            slide.addImage(momImageOptions);
            pptx.writeFile("output.pptx");
          })
          .catch((error) => {
            console.error("Error converting SVG to PNG:", error);
          });
      } catch (error) {
        console.error("Error converting SVG to image:", error);
      }
    });
  }
  render() {
    return (
      <div>
        <h2>Welcome to React</h2>
        <Chart
          chartType="ScatterChart"
          data={this.state.data}
          options={this.state.options}
          graph_id="ScatterChart"
          width="70%"
          height={"400px"}
          legend_toggle={true}
          chartPackage={["controls"]}
          chartEvents={this.state.chart_events}
          ref={(ref) => (this.GoogleChart = ref)}
        />
        <div
          onClick={() => {
            this.setState({
              chartImageURI: this.GoogleChart.chart,
            });
          }}
        >
          <DataTable id="table" data={this.table} />
          <MomTable id="momtable" data={this.mom} />
          <Mom2Table id="mom2table" data={this.mom2} />
          <h1>CLICK ME TO TURN CHART INTO PNG </h1>{" "}
        </div>

        <div>
          <h2>Chart as png</h2>
          <div dangerouslySetInnerHTML={{ __html: this.state.chartImageURI }} />
        </div>
        <div>
          <button onClick={() => this.generateppt()}>Generate PPT</button>
        </div>
      </div>
    );
  }
}
