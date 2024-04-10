import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Chart } from "react-google-charts";
import ReactDOM from 'react-dom';
import pptxgen from "pptxgenjs";
import Slide2 from "./slides/slide2";
import Slide4 from "./slides/slide1";
import StoreWiseGridVisibility from "./slides/storewisegrid";
import Slide4StoreWiseKTP from "./slides/storewisekpt";
import StoreWiseOrderIDWiseRatingSplit from "./slides/StoreWise-OrderIDWiseRatingSplit";
import Slide24 from "./slides/slide24";
import Slide18 from "./slides/slide18";
import Slide20 from "./slides/slide20";
import SlideX from "./slides/subzoneFunnel2";
import Slide19 from "./slides/slide19";
import Slide26 from "./slides/subzoneRevenueOrders";
import Slide27 from "./slides/subzoneFunnel";
import Slide31 from "./slides/subzoneUserSegment";
import Slide32 from "./slides/subzoneNewVsRepeat";
import TitleSLide from "./slides/titleSlide";
import allslidedata from "./slides/data";

function App() {
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
    graph: [
      [
        "",
        "Net Revenue",
        { role: "annotation" },
        "Orders",
        { role: "annotation" },
      ],
      ["July-2023", 1616197.0, 1616197.0, 7205, 7205],
      ["August-2023", 2313880.740234375, 2313880.740234375, 10466, 10466],
      ["September-2023", 2409313.0, 2409313.0, 10397, 10397],
      ["October-2023", 2404472.0, 2404472.0, 10226, 10226],
      ["November-2023", 1805468.0, 1805468.0, 7184, 7184],
      ["December-2023", 3767566.0, 3767566.0, 15438, 15438],
    ],
    mom: {
      Revenue: 0,
      Orders: 0,
    },
    mo2m: {
      Revenue: 0,
      Orders: 0,
    },
  };

  let data4 = {
    title: "Overall Revenues - month on month",
    table: [
      ["Month", "Swiggy (in lacs)", "Zomato (in lacs)", "Total (in lacs)"],
      ["Jul-2023", 0.0, 16.16, 16.16],
      ["Aug-2023", 8.55, 14.59, 23.14],
      ["Sep-2023", 9.3, 14.79, 24.09],
      ["Oct-2023", 7.43, 16.62, 24.04],
      ["Nov-2023", 5.24, 12.81, 18.05],
      ["Dec-2023", 11.59, 26.08, 37.68],
    ],
    graph: [
      [
        "",
        "Net Revenue",
        { role: "annotation" },
        "Orders",
        { role: "annotation" },
      ],
      ["July-2023", 1616197.0, 1616197.0, 7205, 7205],
      ["August-2023", 2313880.740234375, 2313880.740234375, 10466, 10466],
      ["September-2023", 2409313.0, 2409313.0, 10397, 10397],
      ["October-2023", 2404472.0, 2404472.0, 10226, 10226],
      ["November-2023", 1805468.0, 1805468.0, 7184, 7184],
      ["December-2023", 3767566.0, 3767566.0, 15438, 15438],
    ],
    mom: [
      ["revenue", 114.89],
      ["orders", 108.68],
    ],
    mo2m: [
      ["revenue", 50.97],
      ["orders", 56.69],
    ],
  };

  let data6 = {
    title: "Let\\u2019s take a deeper look at Zomato",
    table: [
      ["Month", "Net Revenue (in lacs)", "Orders", "AOV"],
      ["Jul-2023", 16.16, 7205, 224.32],
      ["Aug-2023", 14.59, 6196, 235.48],
      ["Sep-2023", 14.79, 5895, 250.95],
      ["Oct-2023", 16.62, 6661, 249.51],
      ["Nov-2023", 12.81, 4831, 265.18],
      ["Dec-2023", 26.08, 10164, 256.63],
    ],
    graph: [
      [
        "",
        "Net Revenue",
        { role: "annotation" },
        "Orders",
        { role: "annotation" },
      ],
      ["July-2023", 1616197.0, 1616197.0, 7205, 7205],
      ["August-2023", 1459030.0, 1459030.0, 6196, 6196],
      ["September-2023", 1479325.0, 1479325.0, 5895, 5895],
      ["October-2023", 1661962.0, 1661962.0, 6661, 6661],
      ["November-2023", 1281062.0, 1281062.0, 4831, 4831],
      ["December-2023", 2608414.0, 2608414.0, 10164, 10164],
    ],
    mom: [
      ["revenue", 110.39],
      ["orders", 103.61],
    ],
    mo2m: [
      ["revenue", 52.59],
      ["orders", 56.95],
    ],
  };

  let data7 = {
    title: "Let\\u2019s take a deeper look at Swiggy",
    table: [
      ["Month", "Net Revenue (in lacs)", "Orders", "AOV"],
      ["Jul-2023", 0.0, 0.0, 224.32],
      ["Aug-2023", 8.55, 0.04, 235.48],
      ["Sep-2023", 9.3, 0.05, 250.95],
      ["Oct-2023", 7.43, 0.04, 249.51],
      ["Nov-2023", 5.24, 0.02, 265.18],
      ["Dec-2023", 11.59, 0.05, 256.63],
    ],
    graph: [
      [
        "",
        "Orders",
        { role: "annotation" },
        "Net Revenue",
        { role: "annotation" },
      ],
      ["July-2023", 0.0, 0.0, 0, 0],
      ["August-2023", 854850.740234375, 854850.740234375, 4270, 4270],
      ["September-2023", 929988.0, 929988.0, 4502, 4502],
      ["October-2023", 742510.0, 742510.0, 3565, 3565],
      ["November-2023", 524406.0, 524406.0, 2353, 2353],
      ["December-2023", 1159152.0, 1159152.0, 5274, 5274],
    ],
    mom: [
      ["revenue", 124.14],
      ["orders", 121.04],
    ],
    mo2m: [
      ["revenue", 47.94],
      ["orders", 56.11],
    ],
  };

  let data8 = {
    title: "ROI through Ads Spends",
    table1: [
      ["Month", "Spends", "ROI"],
      ["Jul-2023", 239284.1, 40.86],
      ["Aug-2023", 90709.13, 12.35],
      ["Sep-2023", 295065.12, 29.14],
      ["Oct-2023", 151249.44, 44.98],
      ["Nov-2023", 0.0, 0.0],
      ["Dec-2023", 0.0, 0.0],
    ],
    table2: [
      ["Month", "Spends", "ROI"],
      ["Jul-2023", 90577.2, 33.12],
      ["Aug-2023", 88715.0, 46.73],
      ["Sep-2023", 86900.0, 52.62],
      ["Oct-2023", 74015.0, 41.81],
      ["Nov-2023", 0.0, 0.0],
      ["Dec-2023", 0.0, 0.0],
    ],
    graph: [
      [
        "",
        "s_spends",
        { role: "annotation" },
        "z_spends",
        { role: "annotation" },
        "s_roi",
        { role: "annotation" },
        "z_roi",
        { role: "annotation" },
      ],
      [
        "July-2023",
        90577.2,
        90577.2,
        239284.1,
        239284.1,
        33.12,
        33.12,
        40.86,
        40.86,
      ],
      [
        "August-2023",
        88715.0,
        88715.0,
        90709.13,
        90709.13,
        46.73,
        46.73,
        12.35,
        12.35,
      ],
      [
        "September-2023",
        86900.0,
        86900.0,
        295065.12,
        295065.12,
        52.62,
        52.62,
        29.14,
        29.14,
      ],
      [
        "October-2023",
        74015.0,
        74015.0,
        151249.44,
        151249.44,
        41.81,
        41.81,
        44.98,
        44.98,
      ],
      ["November-2023", 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      ["December-2023", 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    ],
  };

  let data9 = {
    title: "Store Wise - Grid Visibility",
    table: [
      ["Sub-Zone", "Zomato", "Swiggy"],
      ["Panjrapol", 0.0, 0.0],
      ["Kudasan", 0.0, 0.0],
      ["Bodakdev", 0.0, 0.0],
      ["Prahladnagar", 0.0, 0.0],
      ["Gota", 0.0, 0.0],
      ["Sayajigunj", 0.0, 0.0],
      ["Urban Chowk", 0.0, 0.0],
      ["Vastrapur", 0.0, 0.0],
      ["Sayona City", 0.0, 0.0],
      ["Riverfront", 0.0, 0.0],
    ],
  };

  let data10 = {
    title: "Store Wise - KPT - monthly view",
    table: [
      [
        "Sub-Zone",
        "Dec-2023",
        "Nov-2023",
        "Oct-2023",
        "Sep-2023",
        "Aug-2023",
        "Jul-2023",
      ],
      ["Panjrapol", 0.0, 0.0, 8.0, 9.0, 7.0, 8.84],
      ["Kudasan", 0.0, 0.0, 9.0, 9.0, 9.0, 9.33],
      ["Bodakdev", 0.0, 0.0, 8.0, 9.0, 8.0, 9.94],
      ["Prahladnagar", 0.0, 0.0, 8.0, 9.0, 9.0, 10.94],
      ["Gota", 0.0, 0.0, 7.0, 9.0, 7.0, 8.3],
      ["Sayajigunj", 0.0, 0.0, 7.0, 6.0, 6.0, 5.84],
      ["Urban Chowk", 0.0, 0.0, 14.0, 13.0, 12.0, 12.43],
      ["Vastrapur", 0.0, 0.0, 8.0, 8.0, 8.0, 10.6],
      ["Sayona City", 0.0, 0.0, 11.0, 9.0, 6.0, 7.02],
      ["Riverfront", 0.0, 0.0, 13.0, 11.0, 10.0, 14.73],
    ],
  };

  let data18 = {
    title: "Negative Reviews",
    table1: [
      ["Total orders", 5082],
      ["ORS", 204],
      ["ORS %", 4.0],
    ],
    table2: [
      ["Reasons", "%"],
      ["order_status_delay", 16.7],
      ["order_cancellation", 13.2],
      ["poor_quality", 18.1],
      ["order_spilled", 12.7],
      ["instructions_not_followed", 0.0],
      ["wrong_order", 7.8],
      ["rejection", 0.0],
      ["missing_item", 8.8],
      ["instructions", 0],
      ["untagged", 4],
      ["refund_query", 0],
      ["billing_issues", 0],
      ["food_not_delivered", 0],
      ["others", 19],
      ["Total", 100],
    ],
    graph: [
      [
        "sub_zone",
        "order_status_delay",
        { role: "annotation" },
        "order_cancellation",
        { role: "annotation" },
        "poor_quality",
        { role: "annotation" },
        "order_spilled",
        { role: "annotation" },
        "instructions_not_followed",
        { role: "annotation" },
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
        "food_not_delivered",
        { role: "annotation" },
        "others",
        { role: "annotation" },
      ],
      [
        "Panjrapol",
        4,
        4,
        3,
        3,
        3,
        3,
        6,
        6,
        0,
        0,
        1,
        1,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
      ],
      [
        "Kudasan",
        1,
        1,
        1,
        1,
        4,
        4,
        2,
        2,
        0,
        0,
        3,
        3,
        0,
        0,
        3,
        3,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        2,
        2,
      ],
      [
        "Bodakdev",
        1,
        1,
        4,
        4,
        4,
        4,
        1,
        1,
        0,
        0,
        2,
        2,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        3,
        3,
      ],
      [
        "Prahladnagar",
        7,
        7,
        3,
        3,
        1,
        1,
        0,
        0,
        0,
        0,
        2,
        2,
        0,
        0,
        5,
        5,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        4,
        4,
      ],
      [
        "Gota",
        5,
        5,
        3,
        3,
        2,
        2,
        4,
        4,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
      ],
      [
        "Sayajigunj",
        2,
        2,
        2,
        2,
        3,
        3,
        4,
        4,
        0,
        0,
        1,
        1,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        2,
        2,
      ],
      [
        "Urban Chowk",
        4,
        4,
        2,
        2,
        7,
        7,
        2,
        2,
        0,
        0,
        2,
        2,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
      ],
      [
        "Vastrapur",
        3,
        3,
        4,
        4,
        5,
        5,
        4,
        4,
        0,
        0,
        1,
        1,
        0,
        0,
        2,
        2,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
      ],
      [
        "Sayona City",
        2,
        2,
        1,
        1,
        2,
        2,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        3,
        3,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
      ],
      [
        "Riverfront",
        4,
        4,
        0,
        0,
        2,
        2,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],
      [
        "Navrangpura",
        1,
        1,
        4,
        4,
        3,
        3,
        2,
        2,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        3,
        3,
      ],
      [
        "Morbi Town",
        0,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        2,
        2,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],
    ],
  };

  let data20 = {
    title: "Store Wise - Order ID Wise Rating Split",
    graph: [
      [
        "sub_zone",
        "poor",
        {
          role: "annotation",
        },
        "neutral",
        {
          role: "annotation",
        },
        "good",
        {
          role: "annotation",
        },
      ],
      ["Dadar", 14, 14, 9, 9, 31, 31],
      ["Saki Vihar", 14, 14, 6, 6, 35, 35],
      ["Lower Parel", 18, 18, 6, 6, 49, 49],
      ["Chembur", 8, 8, 6, 6, 44, 44],
      ["Kharghar", 6, 6, 5, 5, 203, 203],
      ["Samata Nagar", 6, 6, 3, 3, 27, 27],
      ["Bhandup West", 12, 12, 2, 2, 27, 27],
      ["Vashi", 16, 16, 2, 2, 37, 37],
      ["Kalina", 10, 10, 6, 6, 207, 207],
      ["Airoli", 6, 6, 4, 4, 23, 23],
      ["Dombivali", 24, 24, 11, 11, 33, 33],
      ["Mira Road", 13, 13, 10, 10, 219, 219],
      ["Nerul", 7, 7, 2, 2, 177, 177],
      ["Thane West", 8, 8, 3, 3, 13, 13],
      ["Majiwada", 10, 10, 5, 5, 300, 300],
      ["Versova", 16, 16, 8, 8, 27, 27],
      ["Borivali", 21, 21, 9, 9, 63, 63],
      ["Kandivali East", 11, 11, 6, 6, 31, 31],
      ["Malad West", 22, 22, 9, 9, 222, 222],
      ["Kalyan", 16, 16, 6, 6, 59, 59],
      ["Khar", 18, 18, 2, 2, 36, 36],
      ["Andheri East", 28, 28, 8, 8, 65, 65],
      ["Heera Panna", 9, 9, 7, 7, 28, 28],
      ["Elpro", 17, 17, 5, 5, 319, 319],
      ["Kharadi", 19, 19, 4, 4, 277, 277],
      ["Hinjewadi", 15, 15, 9, 9, 281, 281],
    ],
  };

  const data22 = {
    title: "Overall Funnel - month on month",
    table: [
      ["Month", "Menu Opens", "M2C", "M2O", "C2O"],
      ["Aug-2023", 218874.0, 0.23, 0.11, 0.49],
      ["Sep-2023", 280379.0, 0.22, 0.1, 0.45],
      ["Oct-2023", 274012.0, 0.24, 0.11, 0.46],
      ["Nov-2023", 264811.0, 0.26, 0.13, 0.5],
      ["Dec-2023", 302531.0, 0.25, 0.13, 0.53],
      ["Jan-2024", 367501.0, 0.22, 0.11, 0.49],
    ],
    graph: [
      [
        "months",
        "Menu Opens",
        { role: "annotation" },
        "M2C",
        { role: "annotation" },
        "M2O",
        { role: "annotation" },
        "C2O",
        { role: "annotation" },
      ],
      [
        "August-2023",
        218874,
        218874,
        0.2305,
        0.2305,
        0.1137,
        0.1137,
        0.4932,
        0.4932,
      ],
      [
        "September-2023",
        280379,
        280379,
        0.2226,
        0.2226,
        0.1007,
        0.1007,
        0.4524,
        0.4524,
      ],
      [
        "October-2023",
        274012,
        274012,
        0.243,
        0.243,
        0.1129,
        0.1129,
        0.4648,
        0.4648,
      ],
      [
        "November-2023",
        264811,
        264811,
        0.256,
        0.256,
        0.1274,
        0.1274,
        0.4976,
        0.4976,
      ],
      [
        "December-2023",
        302531,
        302531,
        0.252,
        0.252,
        0.133,
        0.133,
        0.5276,
        0.5276,
      ],
      [
        "January-2024",
        367501,
        367501,
        0.2234,
        0.2234,
        0.1094,
        0.1094,
        0.4894,
        0.4894,
      ],
    ],
  };

  const subzone1 = {
    title: "Belapur - Revenue & Orders",
    graph: [
      [
        "months",
        "Net Revenue (in lacs)",
        { role: "annotation" },
        "Orders",
        { role: "annotation" },
      ],
      ["July-2023", 94287.86625744047, 94287.86625744047, 312, 312],
      ["August-2023", 116533.80022321428, 116533.80022321428, 426, 426],
      ["September-2023", 122599.85714285714, 122599.85714285714, 463, 463],
      ["October-2023", 123588.61904761904, 123588.61904761904, 426, 426],
      ["November-2023", 115383.02938988095, 115383.02938988095, 420, 420],
      ["December-2023", 149221.90476190476, 149221.90476190476, 390, 390],
    ],
    mom: [
      ["Revenue", 29.3],
      ["Orders", -7.1],
    ],
    mo2m: [
      ["Revenue", 20.7],
      ["Orders", -8.5],
    ],
  };

  const subzone2 = {
    title: "Belapur - Funnel",
    graph: [
      [
        "months",
        "Menu Opens",
        { role: "annotation" },
        "M2C in %",
        { role: "annotation" },
        "M2O in %",
        { role: "annotation" },
        "C2O in %",
        { role: "annotation" },
      ],
      ["July-2023", 2718, 2718, 22.0, 22.0, 11.0, 11.0, 52.0, 52.0],
      ["August-2023", 3006, 3006, 27.0, 27.0, 14.0, 14.0, 53.0, 53.0],
      ["September-2023", 3200, 3200, 27.0, 27.0, 14.0, 14.0, 54.0, 54.0],
      ["October-2023", 2941, 2941, 27.0, 27.0, 14.0, 14.0, 55.0, 55.0],
      ["November-2023", 3150, 3150, 27.0, 27.0, 13.0, 13.0, 49.0, 49.0],
      ["December-2023", 3584, 3584, 23.0, 23.0, 11.0, 11.0, 47.0, 47.0],
    ],
    mom: [
      ["M2O", -15.4],
      ["M2C", -14.8],
      ["C2O", -4.1],
    ],
  };

  const subzone3 = {
    title: "Belapur - Funnel",
    graph1: [
      [
        "months",
        "Menu Opens",
        { role: "annotation" },
        "M2C in %",
        { role: "annotation" },
        "M2O in %",
        { role: "annotation" },
        "C2O in %",
        { role: "annotation" },
      ],
      ["July-2023", 1118, 1118, 24.0, 24.0, 12.0, 12.0, 52.0, 52.0],
      ["August-2023", 1375, 1375, 21.0, 21.0, 9.0, 9.0, 43.0, 43.0],
      ["September-2023", 1664, 1664, 23.0, 23.0, 11.0, 11.0, 47.0, 47.0],
      ["October-2023", 1573, 1573, 23.0, 23.0, 11.0, 11.0, 47.0, 47.0],
      ["November-2023", 1888, 1888, 24.0, 24.0, 10.0, 10.0, 41.0, 41.0],
      ["December-2023", 2630, 2630, 23.0, 23.0, 10.0, 10.0, 44.0, 44.0],
    ],
    graph2: [
      [
        "months",
        "Menu Opens",
        { role: "annotation" },
        "M2C in %",
        { role: "annotation" },
        "M2O in %",
        { role: "annotation" },
        "C2O in %",
        { role: "annotation" },
      ],
      ["July-2023", 1600, 1600, 21.0, 21.0, 11.0, 11.0, 52.0, 52.0],
      ["August-2023", 1631, 1631, 32.0, 32.0, 19.0, 19.0, 58.0, 58.0],
      ["September-2023", 1536, 1536, 31.0, 31.0, 18.0, 18.0, 59.0, 59.0],
      ["October-2023", 1368, 1368, 31.0, 31.0, 19.0, 19.0, 61.0, 61.0],
      ["November-2023", 1262, 1262, 32.0, 32.0, 19.0, 19.0, 58.0, 58.0],
      ["December-2023", 954, 954, 25.0, 25.0, 14.0, 14.0, 56.0, 56.0],
    ],
  };

  const subzone4 = {
    title: "Belapur - User Segments Split",
    graph1: [
      [
        "months",
        "LA in %",
        { role: "annotation" },
        "MM in %",
        { role: "annotation" },
        "UM in %",
        { role: "annotation" },
      ],
      ["July-2023", 50.0, 50.0, 31.0, 31.0, 19.0, 19.0],
      ["August-2023", 49.0, 49.0, 35.0, 35.0, 16.0, 16.0],
      ["September-2023", 55.0, 55.0, 34.0, 34.0, 11.0, 11.0],
      ["October-2023", 46.0, 46.0, 35.0, 35.0, 19.0, 19.0],
      ["November-2023", 34.0, 34.0, 50.0, 50.0, 16.0, 16.0],
      ["December-2023", 33.0, 33.0, 46.0, 46.0, 21.0, 21.0],
    ],
    graph2: [
      [
        "months",
        "P3 in %",
        { role: "annotation" },
        "P2 in %",
        { role: "annotation" },
        "P1 in %",
        { role: "annotation" },
      ],
      ["July-2023", 37.0, 37.0, 14.0, 14.0, 49.0, 49.0],
      ["August-2023", 44.0, 44.0, 14.0, 14.0, 42.0, 42.0],
      ["September-2023", 35.0, 35.0, 22.0, 22.0, 43.0, 43.0],
      ["October-2023", 43.0, 43.0, 16.0, 16.0, 41.0, 41.0],
      ["November-2023", 43.0, 43.0, 16.0, 16.0, 41.0, 41.0],
      ["December-2023", 0, 0, 0, 0, 0, 0],
    ],
  };

  const subzone5 = {
    title: "Belapur - New User v/s Repeat User",
    graph1: [
      [
        "months",
        "New User in %",
        { role: "annotation" },
        "Repeat User in %",
        { role: "annotation" },
      ],
      ["July-2023", 70.0, 70.0, 30.0, 30.0],
      ["August-2023", 75.0, 75.0, 25.0, 25.0],
      ["September-2023", 72.0, 72.0, 28.0, 28.0],
      ["October-2023", 70.0, 70.0, 30.0, 30.0],
      ["November-2023", 61.0, 61.0, 39.0, 39.0],
      ["December-2023", 67.0, 67.0, 33.0, 33.0],
    ],
    graph2: [
      [
        "months",
        "New User in %",
        { role: "annotation" },
        "Repeat User in %",
        { role: "annotation" },
      ],
      ["July-2023", 83.0, 83.0, 17.0, 17.0],
      ["August-2023", 73.0, 73.0, 27.0, 27.0],
      ["September-2023", 72.0, 72.0, 28.0, 28.0],
      ["October-2023", 63.0, 63.0, 37.0, 37.0],
      ["November-2023", 60.0, 60.0, 40.0, 40.0],
      ["December-2023", 55.0, 55.0, 45.0, 45.0],
    ],
  };
  const [presentation, setPresentation] = useState(null);

  // const pptx = new pptxgen();

  // const handelsubmit = () => {
  //   pptx.writeFile("output.pptx");
  // };

  // const generateppt = () => {
  //   pptx.writeFile("output.pptx");
  // };

  const [currentIndex, setCurrentIndex] = useState(0);
  // const arr = [
  //   <TitleSLide pptx={pptx} />,
  //   //slide4
  //   <Slide4 pptx={pptx} data={data4} title="Slide 4" />,
  //   //slide 6
  //   <Slide4 pptx={pptx} data={data6} title="Slide 6" />,
  //   //slide 7
  //   <Slide4 pptx={pptx} data={data7} title="Slide 7" />,
  //   // slide 8 RoI and ads
  //   <Slide2 pptx={pptx} data={data8} title="Slide 8" />,
  //   // slide 9
  //   <StoreWiseGridVisibility pptx={pptx} data={data9} title="Slide 9" />,
  //   //slide  10 storewise kpt  monthly
  //   <Slide4StoreWiseKTP pptx={pptx} data={data10} title="slide 10" />,
  //   //slide 18 Negatiereviews
  //   <Slide18 data={data18} pptx={pptx} title="slide 18  and 19" />,
  //   <Slide19 pptx={pptx} />,
  //   <Slide20 pptx={pptx} />,

  //   // slide 20
  //   <StoreWiseOrderIDWiseRatingSplit
  //     pptx={pptx}
  //     data={data20}
  //     title="Slide 20"
  //   />,

  //   //slide 22
  //   <Slide24 data={data22} pptx={pptx} title="slide 22" />,
  //   //slide 1  of Subzone
  //   <Slide26 data={subzone1} pptx={pptx} title="subzone 1" />,

  //   //slide 2  of Subzone
  //   <Slide27 data={subzone2} pptx={pptx} title="subzone 2" />,

  //   //slide 3  of Subzone
  //   <SlideX data={subzone3} pptx={pptx} title="subzone 3" />,
  //   //slide 4  of Subzone
  //   <Slide31 data={subzone4} pptx={pptx} title="subzone 4" />,
  //   //slide 5  of Subzone
  //   <Slide32 data={subzone5} pptx={pptx} title="subzone 5" />,
  // ];

  let arraySlides = [];
  const pptFooter = "©2024 - Restaverse pvt ltd, and/or its subsidiaries. This material is confidential unless otherwise stated in writing"
  const [slides,setSlides] = useState([])
  const pptxRef = useRef(null);
  console.log(allslidedata)
    // Initialize pptx when the component mounts
    useEffect(() => {
      pptxRef.current = new pptxgen();
    }, []);

    // const generateppt = () => {
    //   pptx.writeFile("output.pptx");
    // };

    const generateppt = () => {
      pptxRef.current.writeFile("output.pptx");
    };

  useEffect(()=>{
    // const pptx = new pptxgen();
    // const pptx = new pptxgen();
    // const root = ReactDOM.createRoot(document.getElementById('tables-charts'));
   console.log(allslidedata)
    console.log("inside useEEffect")
    for (var prop in allslidedata) {
      if (prop === "per_subzone") {
        arraySlides.push(<TitleSLide  data={"Store Wise Insights"} pptx={pptxRef.current} />)
        for (var subzone in allslidedata[prop]) {
          console.log(subzone);
          arraySlides.push(<TitleSLide data={subzone} pptx={pptxRef.current}/>)
  
          for (var slide in allslidedata[prop][subzone]) {
            if(slide  == 'slide_1'){
              console.log(allslidedata[prop][subzone][slide]);
              arraySlides.push(<Slide26 pptFooter={pptFooter} subzonename={subzone} tableid={subzone+slide} data={allslidedata[prop][subzone][slide]} pptx={pptxRef.current} />)
            }
            else if(slide  == 'slide_2'){
              console.log(allslidedata[prop][subzone][slide]);
              arraySlides.push(<Slide27 pptFooter={pptFooter} tableid={subzone+slide} data={allslidedata[prop][subzone][slide]} pptx={pptxRef.current} />)
            }
            else if(slide  == 'slide_3'){
              console.log(allslidedata[prop][subzone][slide]);
              arraySlides.push(<SlideX pptFooter={pptFooter} data={allslidedata[prop][subzone][slide]} pptx={pptxRef.current}/>)
            }
            else if(slide  == 'slide_4'){
              console.log(allslidedata[prop][subzone][slide]);
              arraySlides.push(<Slide31 pptFooter={pptFooter} data={allslidedata[prop][subzone][slide]} pptx={pptxRef.current}/>)
            }
            else if(slide  == 'slide_5'){
              console.log(allslidedata[prop][subzone][slide]);
              arraySlides.push(<Slide32 pptFooter={pptFooter} data={allslidedata[prop][subzone][slide]} pptx={pptxRef.current}/>)
            }
    
          }
        }
      } else {
        console.log(prop); 
        if(prop == "slide_4"){  
          // root.render(<div>hello....</div>)
          console.log(allslidedata[prop])
          arraySlides.push( <Slide4  pptFooter={pptFooter} tableid="slide_4" pptx={pptxRef.current} data={allslidedata[prop]} title="Slide 4" />,)
        }
        else if(prop == "slide_5"){
          console.log(allslidedata[prop])
          // root.render(<div>wello....</div>)
          arraySlides.push( <StoreWiseGridVisibility pptFooter={pptFooter} tableid="slide_5" pptx={pptxRef.current} data={allslidedata[prop]} title="Slide 5" />,)
  
        }
        else if(prop == "slide_6"){
          console.log(allslidedata[prop])
          // root.render(<div>wello....</div>)
          arraySlides.push( <Slide4 pptFooter={pptFooter} tableid="slide_6" pptx={pptxRef.current} data={allslidedata[prop]} title="Slide 4" />,)
  
        }
        else if(prop == "slide_7"){
          console.log(allslidedata[prop])
          arraySlides.push( <Slide4 pptFooter={pptFooter} tableid="slide_7" pptx={pptxRef.current} data={allslidedata[prop]} title="Slide 4" />,)
  
        }
        else if(prop == "slide_8"){
          console.log(allslidedata[prop])
          arraySlides.push( <Slide2 pptFooter={pptFooter} tableid="slide_8" pptx={pptxRef.current} data={allslidedata[prop]} title="Slide 4" />,)
  
        }
        else if(prop == "slide_9"){
          console.log(allslidedata[prop])
          arraySlides.push( <StoreWiseGridVisibility pptFooter={pptFooter} tableid="slide_9" pptx={pptxRef.current} data={allslidedata[prop]}/>,)
  
        }
        else if(prop == "slide_10"){
          console.log(allslidedata[prop])
          arraySlides.push( <Slide4StoreWiseKTP pptFooter={pptFooter} tableid="slide_10" pptx={pptxRef.current} data={allslidedata[prop]}/>,)
  
        }
        else if(prop == "slide_11"){
          console.log(allslidedata[prop])
          arraySlides.push( <Slide4StoreWiseKTP pptFooter={pptFooter} tableid="slide_11" pptx={pptxRef.current} data={allslidedata[prop]}/>,)
  
        }
        else if(prop == "slide_12"){
          console.log(allslidedata[prop])
          arraySlides.push( <Slide4StoreWiseKTP pptFooter={pptFooter} tableid="slide_12" pptx={pptxRef.current} data={allslidedata[prop]}/>,)
  
        }
        else if(prop == "slide_15"){
          console.log(allslidedata[prop])
          arraySlides.push( <Slide4StoreWiseKTP pptFooter={pptFooter} tableid="slide_15" pptx={pptxRef.current} data={allslidedata[prop]}/>,)
  
        }
        else if(prop == "slide_16"){
          console.log(allslidedata[prop])
          arraySlides.push( <Slide4StoreWiseKTP pptFooter={pptFooter} tableid="slide_16" pptx={pptxRef.current} data={allslidedata[prop]}/>,)
  
        }
        else if(prop ==  "slide_18"){
          console.log(allslidedata[prop])
          arraySlides.push( <Slide18 pptFooter={pptFooter} tableid="slide_18" pptx={pptxRef.current} data={allslidedata[prop]} />,)
        }
        else if(prop ==  "slide_19"){
          console.log(allslidedata[prop])
          arraySlides.push( <Slide20 pptFooter={pptFooter} tableid="slide_19" pptx={pptxRef.current} data={allslidedata[prop]} />,)
        }
        else if(prop ==  "slide_20"){
          console.log(allslidedata[prop])
          arraySlides.push( <StoreWiseOrderIDWiseRatingSplit pptFooter={pptFooter} tableid="slide_20" pptx={pptxRef.current} data={allslidedata[prop]} />,)
        }
        else if(prop ==  "slide_21"){
          console.log(allslidedata[prop])
          arraySlides.push( <StoreWiseOrderIDWiseRatingSplit pptFooter={pptFooter} tableid="slide_21" pptx={pptxRef.current} data={allslidedata[prop]} />,)
        }
        else if(prop ==  "slide_22"){
          console.log(allslidedata[prop])
          arraySlides.push( <Slide4 pptFooter={pptFooter} tableid="slide_21" pptx={pptxRef.current} data={allslidedata[prop]} />,)
        }
      }
    }
  
    setSlides(arraySlides)


  },[])
  
  console.log(arraySlides)



  useEffect(()=>console.log(slides),[slides])

  // arr.map((a) => console.log(a));

  return (
    <>
      <div>
        {/* {arr.map((component, index) => (
          <React.Fragment key={index}>{component}</React.Fragment>
        ))} */}
        <div id="tables-charts">heelo</div>

        {slides.length >0 && slides.map((component, index) => (
          <React.Fragment key={index}>{component}</React.Fragment>
        ))}
      </div>
      <button onClick={generateppt}>Generate PPT</button>
    </>
  );
}

export default App;
