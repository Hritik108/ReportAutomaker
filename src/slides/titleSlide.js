import React, { useEffect, useState, useRef } from "react";
const Table = ({ data, id }) => {
  const cellWidth = 120;
  const cellHeight = 10;
  const borderWidth = 1;
  const fontSize = 12;

  return (
    <>
    <h2>table+{id}</h2>
    <table
      style={{
        borderCollapse: "collapse",
        background: "black",
        color: "white",
        width: "80%",
      }}
      id={"storewisetable" + id}
    >
      <tbody>
        {data.map((row, rowIndex) => (
          <tr style={{ width: "500px" }} key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                style={{
                  border: "1px solid white",
                  padding: "8px",
                  width: "70px",
                }}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
};

const TitleSLide = ({ pptx }) => {
  
  


  useEffect(() => {
    // const node = document.createElement("div");
    // node.innerHTML = chartImageURI;

      try {
        const slide = pptx.addSlide();
        slide.background = { fill: "000000" };
        //main table
        
            slide.addText("Title", {
              y: 2,
              x: 0.6,
              w: 10,
              h: 2,
              color: "FFFFFF",
              fontFace: "Calibri",
              fontSize: 60,
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

      } catch (error) {
        console.error("Error converting SVG to image:", error);
      }
    
  
  }, []);

  return (
    <>
      <h1>Title</h1>
    </>
  );
};

export default TitleSLide;