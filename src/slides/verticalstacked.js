import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Year", "Sales", { role: "annotation" }, "Expenses", { role: "annotation" }],
  ["2014", 1000, "1000", 400, "400"],
  ["2015", 1170, "1170", 460, "460"],
  ["2016", 660, "660", 1120, "1120"],
  ["2017", 1030, "1030", 540, "540"],
  ["2018", 1530, "1530", 740, "740"],
  ["2019", 1430, "1430", 640, "640"],
];

export const options = {
  chart: {
    title: "Company Performance",
    subtitle: "Sales and Expenses: 2014-2019",
  },
  isStacked: "percent", // Specify that the chart should be stacked in percentage
  legend: { position: "top" }, // Position legend at the top

  hAxis: {
    gridlines: { color: "transparent" }, // Hide horizontal gridlines
  },

  vAxis: { format: "percent" }, // Format the vertical axis labels as percentages
  annotations: {
    textStyle: {
      fontSize: 11,
      bold: true,
      italic: true,
      color: "#871b47",
      auraColor: "none",
    },
  },
  colors: ["rgb(255, 32, 78)", "rgb(0, 141, 218)"],
};

export function App() {
  return (
    <Chart
      width="100%"
      height="400px"
      chartType="ColumnChart" // Specify chart type as "ColumnChart"
      data={data}
      options={options}
    />
  );
}
