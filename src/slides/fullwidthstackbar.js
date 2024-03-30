import React from "react";
import { Chart } from "react-google-charts";

export const data = [
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

export const options = {
  title: "Population of Largest U.S. Cities",
  chartArea: { width: "50%" },
  hAxis: {
    title: "",
    gridlines: { color: "transparent" },
  },
  vAxis: {
    title: "",
    gridlines: { color: "transparent" },
  },
  annotations: {
    textStyle: {
      fontSize: 7, // Adjust the font size of annotations
    },
  },
  legend: "none", // Hide legends
  isStacked: "percent", // Set to 'percent' for horizontal stacked bar chart
  colors: ["rgb(119, 217, 112)", "rgb(255, 152, 0)", "rgb(250, 112, 112)"], // Specify the colors for each category
};

export function App() {
  return (
    <div style={{ backgroundColor: "black" }}>
      <Chart
        chartType="BarChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
}
