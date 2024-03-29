import React, { useEffect, useState, useRef } from "react";
const Table = ({ data }) => {
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
      id="slide3table1"
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

const StoreWiseGridVisibility = ({ pptx }) => {
  const data = [
    ["Sub-Zone", "Zomato", "Swiggy"],
    ["Oct-2023", 19.9, 49.1],
    ["Nov-2023", 0, 0],
    ["Dec-2023", 0, 0],
    ["Jan-2024", 0, 0],
    ["Feb-2024", 0, 0],
    ["Mar-2024", 0, 0],
    ["Oct-2023", 19.9, 49.1],
    ["Nov-2023", 0, 0],
    ["Dec-2023", 0, 0],
    ["Jan-2024", 0, 0],
    ["Feb-2024", 0, 0],
    ["Mar-2024", 0, 0],
  ];

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
  const convertTableToSvg = (tableElement) => {
    const cellWidth = 120;
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
    // const node = document.createElement("div");
    // node.innerHTML = chartImageURI;

    const parser = new DOMParser();

    try {
      const slide = pptx.addSlide();
      slide.background = { fill: "000000" };
      //main table
      const tableElement = document.getElementById("slide3table1");
      const svgDataUri = convertTableToSvg(tableElement);
      const numRows = tableElement.rows.length;
      const NoOfPages = numRows / 6;

      convertSvgToPng(svgDataUri)
        .then((pngDataUri) => {
          slide.addImage({
            data: pngDataUri,
            x: 2,
            y: 1,
            w: 5.5,
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
        })
        .catch((error) => {
          console.log(error);
        });

        
    } catch (error) {
      console.error("Error converting SVG to image:", error);
    }
    // });
  }, []);

  return <Table data={data} />;
};

export default StoreWiseGridVisibility;
