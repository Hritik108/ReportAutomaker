import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Chart } from "react-google-charts";
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

  const pptx = new pptxgen();

  const handelsubmit = () => {
    pptx.writeFile("output.pptx");
  };

  const generateppt = () => {
    pptx.writeFile("output.pptx");
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const arr = [
    <TitleSLide pptx={pptx} />,
    //slide4
    <Slide4 pptx={pptx} data={data4} title="Slide 4" />,
    //slide 6
    <Slide4 pptx={pptx} data={data6} title="Slide 6" />,
    //slide 7
    <Slide4 pptx={pptx} data={data7} title="Slide 7" />,
    // slide 8 RoI and ads
    <Slide2 pptx={pptx} data={data8} title="Slide 8" />,
    // slide 9
    <StoreWiseGridVisibility pptx={pptx} data={data9} title="Slide 9" />,
    //slide  10 storewise kpt  monthly
    <Slide4StoreWiseKTP pptx={pptx} data={data10} title="slide 10" />,
    //slide 18 Negatiereviews
    <Slide18 data={data18} pptx={pptx} title="slide 18  and 19" />,
    <Slide19 pptx={pptx} />,
    <Slide20 pptx={pptx} />,

    // slide 20
    <StoreWiseOrderIDWiseRatingSplit
      pptx={pptx}
      data={data20}
      title="Slide 20"
    />,

    //slide 22
    <Slide24 data={data22} pptx={pptx} title="slide 22" />,
    //slide 1  of Subzone
    <Slide26 data={subzone1} pptx={pptx} title="subzone 1" />,

    //slide 2  of Subzone
    <Slide27 data={subzone2} pptx={pptx} title="subzone 2" />,

    //slide 3  of Subzone
    <SlideX data={subzone3} pptx={pptx} title="subzone 3" />,
    //slide 4  of Subzone
    <Slide31 data={subzone4} pptx={pptx} title="subzone 4" />,
    //slide 5  of Subzone
    <Slide32 data={subzone5} pptx={pptx} title="subzone 5" />,
  ];

  let allData = {
    slide_4: {
      title: "Overall Revenues - month on month",
      table: [
        ["Month", "Swiggy (in lacs)", "Zomato (in lacs)", "Total (in lacs)"],
        ["Aug-2023", 17.11, 18.46, 35.57],
        ["Sep-2023", 14, 17.33, 31.34],
        ["Oct-2023", 14.58, 18.76, 33.33],
        ["Nov-2023", 16.42, 18.12, 34.55],
        ["Dec-2023", 16, 18.88, 34.88],
        ["Jan-2024", 26.74, 38.96, 65.7],
      ],
      graph: [
        [
          "",
          "Net Revenue",
          {
            role: "annotation",
          },
          "Orders",
          {
            role: "annotation",
          },
        ],
        ["August-2023", 3556919.6, 3556919.6, 6008, 6008],
        ["September-2023", 3133567.63, 3133567.63, 5209, 5209],
        ["October-2023", 3333385.3200000003, 3333385.3200000003, 5526, 5526],
        ["November-2023", 3454606.91, 3454606.91, 5357, 5357],
        ["December-2023", 3488198.79, 3488198.79, 5942, 5942],
        ["January-2024", 6570070.78, 6570070.78, 11246, 11246],
      ],
      mom: [
        ["revenue", 89.26],
        ["orders", 88.35],
      ],
      mo2m: [
        ["revenue", 109.93],
        ["orders", 90.18],
      ],
    },
    slide_5: {
      title: "Our performance across the stores in the previous month",
      table: [
        [
          "Location",
          "Swiggy Revenue (in lacs) ",
          "Zomato Revenue (in lacs)",
          "Total Revenue (in lacs)",
        ],
        ["Khar", 0, 0, 0],
        ["Lower Parel", 0, 0, 0],
        ["Powai", 0, 0, 0],
        ["Andheri Lokhandwala, Andheri West", 0, 0, 0],
      ],
    },
    slide_6: {
      title: "Let’s take a deeper look at Zomato",
      table: [
        ["Month", "Net Revenue (in lacs)", "Orders", "AOV"],
        ["Aug-2023", 18.46, 3119, 591.73],
        ["Sep-2023", 17.33, 2851, 608],
        ["Oct-2023", 18.76, 3262, 575],
        ["Nov-2023", 18.12, 2883, 628.58],
        ["Dec-2023", 18.88, 3124, 604.45],
        ["Jan-2024", 38.96, 6842, 569.4],
      ],
      graph: [
        [
          "",
          "Net Revenue",
          {
            role: "annotation",
          },
          "Orders",
          {
            role: "annotation",
          },
        ],
        ["August-2023", 1845613.6, 1845613.6, 3119, 3119],
        ["September-2023", 1733421.63, 1733421.63, 2851, 2851],
        ["October-2023", 1875653.32, 1875653.32, 3262, 3262],
        ["November-2023", 1812200.9100000001, 1812200.9100000001, 2883, 2883],
        ["December-2023", 1888292.79, 1888292.79, 3124, 3124],
        ["January-2024", 3895850.7800000003, 3895850.7800000003, 6842, 6842],
      ],
      mom: [
        ["revenue", 119.01],
        ["orders", 106.32],
      ],
      mo2m: [
        ["revenue", 137.32],
        ["orders", 114.98],
      ],
    },
    slide_7: {
      title: "Let’s take a deeper look at Swiggy",
      table: [
        ["Month", "Net Revenue (in lacs)", "Orders", "AOV"],
        ["Aug-2023", 17.11, 0.03, 591.73],
        ["Sep-2023", 14, 0.02, 608],
        ["Oct-2023", 14.58, 0.02, 575],
        ["Nov-2023", 16.42, 0.02, 628.58],
        ["Dec-2023", 16, 0.03, 604.45],
        ["Jan-2024", 26.74, 0.04, 569.4],
      ],
      graph: [
        [
          "",
          "Orders",
          {
            role: "annotation",
          },
          "Net Revenue",
          {
            role: "annotation",
          },
        ],
        ["August-2023", 1711306, 1711306, 2889, 2889],
        ["September-2023", 1400146, 1400146, 2358, 2358],
        ["October-2023", 1457732, 1457732, 2264, 2264],
        ["November-2023", 1642406, 1642406, 2474, 2474],
        ["December-2023", 1599906, 1599906, 2818, 2818],
        ["January-2024", 2674220, 2674220, 4404, 4404],
      ],
      mom: [
        ["revenue", 56.28],
        ["orders", 67.15],
      ],
      mo2m: [
        ["revenue", 78.01],
        ["orders", 62.82],
      ],
    },
    slide_8: {
      title: "ROI through Ads Spends",
      table1: [
        ["Month", "Spends", "ROI"],
        ["Aug-2023", 204396.19, 19.24],
        ["Sep-2023", 150272.42, 17.01],
        ["Oct-2023", 129451.4, 28.69],
        ["Nov-2023", 0, 0],
        ["Dec-2023", 0, 0],
        ["Jan-2024", 0, 0],
      ],
      table2: [
        ["Month", "Spends", "ROI"],
        ["Aug-2023", 210068.84, 13.01],
        ["Sep-2023", 102330.01, 11.32],
        ["Oct-2023", 97884.49, 16.87],
        ["Nov-2023", 0, 0],
        ["Dec-2023", 0, 0],
        ["Jan-2024", 0, 0],
      ],
      graph: [
        [
          "",
          "s_spends",
          {
            role: "annotation",
          },
          "z_spends",
          {
            role: "annotation",
          },
          "s_roi",
          {
            role: "annotation",
          },
          "z_roi",
          {
            role: "annotation",
          },
        ],
        [
          "August-2023",
          210068.84,
          210068.84,
          204396.19,
          204396.19,
          13.01,
          13.01,
          19.24,
          19.24,
        ],
        [
          "September-2023",
          102330.01,
          102330.01,
          150272.42,
          150272.42,
          11.32,
          11.32,
          17.01,
          17.01,
        ],
        [
          "October-2023",
          97884.49,
          97884.49,
          129451.4,
          129451.4,
          16.87,
          16.87,
          28.69,
          28.69,
        ],
        ["November-2023", 0, 0, 0, 0, 0, 0, 0, 0],
        ["December-2023", 0, 0, 0, 0, 0, 0, 0, 0],
        ["January-2024", 0, 0, 0, 0, 0, 0, 0, 0],
      ],
    },
    slide_9: {
      title: "Store Wise - Grid Visibility",
      table: [
        ["Sub-Zone", "Zomato", "Swiggy"],
        ["Khar", 0, 0],
        ["Lower Parel", 0, 0],
        ["Powai", 0, 0],
        ["Andheri Lokhandwala, Andheri West", 0, 0],
      ],
    },
    slide_10: {
      title: "Store Wise - KPT - monthly view",
      table: [
        [
          "Sub-Zone",
          "Jan-2024",
          "Dec-2023",
          "Nov-2023",
          "Oct-2023",
          "Sep-2023",
          "Aug-2023",
        ],
        ["Khar", 0, 0, 0, 17.44, 16.89, 19.18],
        ["Lower Parel", 0, 0, 0, 19.33, 19.06, 19.11],
        ["Powai", 0, 0, 0, 16.9, 16.84, 16.63],
        ["Andheri Lokhandwala, Andheri West", 0, 0, 0, 19.16, 18.4, 16.72],
      ],
    },
    slide_11: {
      title: "Store Wise - KPT - monthly view",
      table: [
        [
          "Sub-Zone",
          "Jan-2024",
          "Dec-2023",
          "Nov-2023",
          "Oct-2023",
          "Sep-2023",
          "Aug-2023",
        ],
        ["Andheri Lokhandwala, Andheri West", 0, 0, 0, 18.17, 18.43, 15.68],
        ["Khar", 0, 0, 0, 17.62, 17.18, 19.5],
        ["Lower Parel", 0, 0, 0, 20.32, 19.21, 19.27],
        ["Powai", 0, 0, 0, 16.1, 13.87, 16.57],
      ],
    },
    slide_12: {
      title: "Average Delivery Time - monthly view",
      table: [
        [
          "Sub-Zone",
          "Jan-2024",
          "Dec-2023",
          "Nov-2023",
          "Oct-2023",
          "Sep-2023",
          "Aug-2023",
        ],
        ["Khar", 0, 0, 0, 41.79, 42.25, 42.29],
        ["Lower Parel", 0, 0, 0, 43.89, 46.67, 44.42],
        ["Powai", 0, 0, 0, 41.53, 43.66, 40.31],
        ["Andheri Lokhandwala, Andheri West", 0, 0, 0, 41.25, 42.17, 39.48],
      ],
    },
    slide_16: {
      title: "Food Ratings - monthly view",
      table: [
        [
          "Sub-Zone",
          "Jan-2024",
          "Dec-2023",
          "Nov-2023",
          "Oct-2023",
          "Sep-2023",
          "Aug-2023",
        ],
        ["Khar", 4.3, 4.44, 4.06, 3.7, 4.15, 3.97],
        ["Lower Parel", 3.72, 3.67, 3.91, 3.3, 4.12, 3.53],
        ["Powai", 4.08, 3.97, 3.33, 3.59, 3.9, 3.14],
        [
          "Andheri Lokhandwala, Andheri West",
          3.95,
          4.16,
          3.79,
          4.06,
          4.25,
          4.26,
        ],
      ],
    },
    slide_19: {
      title: "Negative Reviews",
      table1: [
        ["Total orders", 2202],
        ["ORS", 62],
        ["ORS %", 2.82],
      ],
      table2: [
        ["Reasons", "%"],
        ["bad_order", 0],
        ["total_food", 50],
        ["quality_issue", 16.13],
        ["quantity_issue", 3.23],
        ["packaging", 3.23],
        ["wrong_item", 9.68],
        ["special_inst", 0],
        ["missing_item", 17.74],
        ["Total", 100],
      ],
      graph: [
        [
          "sub_zone",
          "total_food",
          {
            role: "annotation",
          },
          "quality_issue",
          {
            role: "annotation",
          },
          "quantity_issue",
          {
            role: "annotation",
          },
          "packaging",
          {
            role: "annotation",
          },
          "wrong_item",
          {
            role: "annotation",
          },
          "special_inst",
          {
            role: "annotation",
          },
          "missing_item",
          {
            role: "annotation",
          },
        ],
        [
          "Andheri Lokhandwala, Andheri West",
          17,
          17,
          5,
          5,
          2,
          2,
          0,
          0,
          5,
          5,
          0,
          0,
          5,
          5,
        ],
        ["Khar", 13, 13, 4, 4, 0, 0, 2, 2, 1, 1, 0, 0, 6, 6],
        ["Lower Parel", 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ["Powai", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
    },
    slide_20: {
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
        ["Khar", 12, 12, 5, 5, 61, 61],
        ["Lower Parel", 12, 12, 8, 8, 18, 18],
        ["Powai", 2, 2, 1, 1, 7, 7],
        ["Andheri Lokhandwala, Andheri West", 28, 28, 10, 10, 70, 70],
      ],
    },
    slide_21: {
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
      ],
    },
    slide_22: {
      title: "Overall Funnel - month on month",
      table: [
        ["Month", "Menu Opens", "M2C", "M2O", "C2O"],
        ["Aug-2023", 39449, 0.26, 0.15, 0.59],
        ["Sep-2023", 30541, 0.28, 0.17, 0.62],
        ["Oct-2023", 35330, 0.27, 0.16, 0.57],
        ["Nov-2023", 32463, 0.28, 0.17, 0.59],
        ["Dec-2023", 38492, 0.27, 0.15, 0.58],
        ["Jan-2024", 40232, 0.26, 0.14, 0.54],
      ],
      graph: [
        [
          "months",
          "Menu Opens",
          {
            role: "annotation",
          },
          "M2C",
          {
            role: "annotation",
          },
          "M2O",
          {
            role: "annotation",
          },
          "C2O",
          {
            role: "annotation",
          },
        ],
        [
          "August-2023",
          39449,
          39449,
          0.2561,
          0.2561,
          0.1523,
          0.1523,
          0.5946,
          0.5946,
        ],
        [
          "September-2023",
          30541,
          30541,
          0.2773,
          0.2773,
          0.1706,
          0.1706,
          0.6151,
          0.6151,
        ],
        [
          "October-2023",
          35330,
          35330,
          0.2742,
          0.2742,
          0.1564,
          0.1564,
          0.5703,
          0.5703,
        ],
        [
          "November-2023",
          32463,
          32463,
          0.2816,
          0.2816,
          0.165,
          0.165,
          0.5859,
          0.5859,
        ],
        [
          "December-2023",
          38492,
          38492,
          0.266,
          0.266,
          0.1544,
          0.1544,
          0.5804,
          0.5804,
        ],
        [
          "January-2024",
          40232,
          40232,
          0.2598,
          0.2598,
          0.1398,
          0.1398,
          0.5379,
          0.5379,
        ],
      ],
    },
    slide_18: {
      title: "Negative Reviews",
      table1: [
        ["Total orders", 3421],
        ["ORS", 145],
        ["ORS %", 4.2],
      ],
      table2: [
        ["Reasons", "%"],
        ["order_status_delay", 29.7],
        ["order_cancellation", 15.2],
        ["poor_quality", 16.6],
        ["order_spilled", 6.2],
        ["instructions_not_followed", 0],
        ["wrong_order", 4.1],
        ["rejection", 0],
        ["missing_item", 8.3],
        ["instructions", 0],
        ["untagged", 2],
        ["refund_query", 0],
        ["billing_issues", 0],
        ["food_not_delivered", 0],
        ["others", 8],
        ["Total", 100],
      ],
      graph: [
        [
          "sub_zone",
          "order_status_delay",
          {
            role: "annotation",
          },
          "order_cancellation",
          {
            role: "annotation",
          },
          "poor_quality",
          {
            role: "annotation",
          },
          "order_spilled",
          {
            role: "annotation",
          },
          "instructions_not_followed",
          {
            role: "annotation",
          },
          "wrong_order",
          {
            role: "annotation",
          },
          "rejection",
          {
            role: "annotation",
          },
          "missing_item",
          {
            role: "annotation",
          },
          "instructions",
          {
            role: "annotation",
          },
          "untagged",
          {
            role: "annotation",
          },
          "refund_query",
          {
            role: "annotation",
          },
          "billing_issues",
          {
            role: "annotation",
          },
          "food_not_delivered",
          {
            role: "annotation",
          },
          "others",
          {
            role: "annotation",
          },
        ],
        [
          "Khar",
          15,
          15,
          9,
          9,
          6,
          6,
          2,
          2,
          0,
          0,
          2,
          2,
          0,
          0,
          7,
          7,
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
          "Lower Parel",
          2,
          2,
          2,
          2,
          4,
          4,
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
          "Powai",
          2,
          2,
          2,
          2,
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
          "Andheri Lokhandwala, Andheri West",
          24,
          24,
          9,
          9,
          13,
          13,
          7,
          7,
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
          1,
          1,
          0,
          0,
          0,
          0,
          0,
          0,
          5,
          5,
        ],
      ],
    },
    slide_15: {
      title: "Page Ratings - monthly view",
      table: [
        [
          "Name",
          "Sub-zone",
          "Nov-2023",
          "Dec-2023",
          "Jan-2024",
          "Nov-2023",
          "Dec-2023",
          "Jan-2024",
        ],
        ["Go Biryan", "Khar", 4.1, 4.1, 4.2, 4.2, 4.3, 4.4],
        ["Go Biryan", "Powai", 3.9, 3.8, 3.7, 4, 4.1, 4.1],
        [
          "Go Biryan",
          "Andheri Lokhandwala, Andheri West",
          4.2,
          4.1,
          4.2,
          4.3,
          4.3,
          4.3,
        ],
        ["Go Biryan", "Lower Parel", 3.9, 4, 3.8, 4, 4.2, 4.1],
      ],
    },
    per_subzone: {
      Khar: {
        slide_1: {
          title: "Khar - Revenue & Orders",
          graph: [
            [
              "months",
              "Net Revenue (in lacs)",
              {
                role: "annotation",
              },
              "Orders",
              {
                role: "annotation",
              },
            ],
            [
              "September-2023",
              982517.4580952381,
              982517.4580952381,
              1580,
              1580,
            ],
            ["October-2023", 1026493.7, 1026493.7, 1592, 1592],
            ["November-2023", 1011623.8, 1011623.8, 1534, 1534],
            ["December-2023", 1057109.47, 1057109.47, 1727, 1727],
            ["January-2024", 1089421.576190476, 1089421.576190476, 1866, 1866],
            ["February-2024", 1194401.3805, 1194401.3805, 2106, 2106],
          ],
          mom: [
            ["Revenue", 9.6],
            ["Orders", 12.9],
          ],
          mo2m: [
            ["Revenue", 13],
            ["Orders", 21.9],
          ],
        },
        slide_2: {
          title: "Khar - Funnel",
          graph: [
            [
              "months",
              "Menu Opens",
              {
                role: "annotation",
              },
              "M2C in %",
              {
                role: "annotation",
              },
              "M2O in %",
              {
                role: "annotation",
              },
              "C2O in %",
              {
                role: "annotation",
              },
            ],
            ["September-2023", 8135, 8135, 30, 30, 19, 19, 66, 66],
            ["October-2023", 8948, 8948, 29, 29, 18, 18, 61, 61],
            ["November-2023", 8206, 8206, 31, 31, 19, 19, 60, 60],
            ["December-2023", 8914, 8914, 29, 29, 19, 19, 66, 66],
            ["January-2024", 12417, 12417, 28, 28, 15, 15, 54, 54],
            ["February-2024", 13642, 13642, 27, 27, 15, 15, 58, 58],
          ],
          mom: [
            ["M2O", 0],
            ["M2C", -3.6],
            ["C2O", 7.4],
          ],
        },
        slide_3: {
          title: "Khar - Funnel",
          graph1: [
            [
              "months",
              "Menu Opens",
              {
                role: "annotation",
              },
              "M2C in %",
              {
                role: "annotation",
              },
              "M2O in %",
              {
                role: "annotation",
              },
              "C2O in %",
              {
                role: "annotation",
              },
            ],
            ["September-2023", 4321, 4321, 29, 29, 17, 17, 60, 60],
            ["October-2023", 5308, 5308, 27, 27, 14, 14, 52, 52],
            ["November-2023", 4204, 4204, 30, 30, 16, 16, 52, 52],
            ["December-2023", 4369, 4369, 31, 31, 17, 17, 56, 56],
            ["January-2024", 8191, 8191, 27, 27, 13, 13, 48, 48],
            ["February-2024", 9005, 9005, 26, 26, 13, 13, 51, 51],
          ],
          graph2: [
            [
              "months",
              "Menu Opens",
              {
                role: "annotation",
              },
              "M2C in %",
              {
                role: "annotation",
              },
              "M2O in %",
              {
                role: "annotation",
              },
              "C2O in %",
              {
                role: "annotation",
              },
            ],
            ["September-2023", 3814, 3814, 30, 30, 22, 22, 72, 72],
            ["October-2023", 3640, 3640, 32, 32, 23, 23, 72, 72],
            ["November-2023", 4002, 4002, 32, 32, 22, 22, 68, 68],
            ["December-2023", 4545, 4545, 28, 28, 21, 21, 76, 76],
            ["January-2024", 4226, 4226, 29, 29, 19, 19, 65, 65],
            ["February-2024", 4637, 4637, 29, 29, 20, 20, 70, 70],
          ],
        },
        slide_4: {
          title: "Khar - User Segments Split",
          graph1: [
            [
              "months",
              "LA in %",
              {
                role: "annotation",
              },
              "MM in %",
              {
                role: "annotation",
              },
              "UM in %",
              {
                role: "annotation",
              },
            ],
            ["September-2023", 18, 18, 31, 31, 51, 51],
            ["October-2023", 25, 25, 32, 32, 43, 43],
            ["November-2023", 25, 25, 35, 35, 40, 40],
            ["December-2023", 31, 31, 33, 33, 36, 36],
            ["January-2024", 29, 29, 32, 32, 39, 39],
            ["February-2024", 23, 23, 37, 37, 40, 40],
          ],
          graph2: [
            [
              "months",
              "P3 in %",
              {
                role: "annotation",
              },
              "P2 in %",
              {
                role: "annotation",
              },
              "P1 in %",
              {
                role: "annotation",
              },
            ],
            ["September-2023", 7, 7, 10, 10, 83, 83],
            ["October-2023", 5, 5, 7, 7, 88, 88],
            ["November-2023", 4, 4, 6, 6, 90, 90],
            ["December-2023", 6, 6, 8, 8, 86, 86],
            ["January-2024", 8, 8, 7, 7, 85, 85],
            ["February-2024", 9, 9, 9, 9, 82, 82],
          ],
        },
        slide_5: {
          title: "Khar - New User v/s Repeat User",
          graph1: [
            [
              "months",
              "New User in %",
              {
                role: "annotation",
              },
              "Repeat User in %",
              {
                role: "annotation",
              },
            ],
            ["September-2023", 37, 37, 63, 63],
            ["October-2023", 38, 38, 62, 62],
            ["November-2023", 39, 39, 61, 61],
            ["December-2023", 40, 40, 60, 60],
            ["January-2024", 52, 52, 48, 48],
            ["February-2024", 49, 49, 51, 51],
          ],
          graph2: [
            [
              "months",
              "New User in %",
              {
                role: "annotation",
              },
              "Repeat User in %",
              {
                role: "annotation",
              },
            ],
            ["September-2023", 38, 38, 62, 62],
            ["October-2023", 36, 36, 64, 64],
            ["November-2023", 43, 43, 57, 57],
            ["December-2023", 29, 29, 71, 71],
            ["January-2024", 40, 40, 60, 60],
            ["February-2024", 37, 37, 63, 63],
          ],
        },
      },
      "Lower Parel": {
        slide_1: {
          title: "Lower Parel - Revenue & Orders",
          graph: [
            [
              "months",
              "Net Revenue (in lacs)",
              {
                role: "annotation",
              },
              "Orders",
              {
                role: "annotation",
              },
            ],
            [
              "September-2023",
              305388.72571428574,
              305388.72571428574,
              606,
              606,
            ],
            ["October-2023", 345527.7380952381, 345527.7380952381, 716, 716],
            ["November-2023", 395864.4919047619, 395864.4919047619, 693, 693],
            ["December-2023", 402705.82666666666, 402705.82666666666, 807, 807],
            ["January-2024", 376359.40095238097, 376359.40095238097, 719, 719],
            ["February-2024", 403860.49591666664, 403860.49591666664, 817, 817],
          ],
          mom: [
            ["Revenue", 7.3],
            ["Orders", 13.6],
          ],
          mo2m: [
            ["Revenue", 0.3],
            ["Orders", 1.2],
          ],
        },
        slide_2: {
          title: "Lower Parel - Funnel",
          graph: [
            [
              "months",
              "Menu Opens",
              {
                role: "annotation",
              },
              "M2C in %",
              {
                role: "annotation",
              },
              "M2O in %",
              {
                role: "annotation",
              },
              "C2O in %",
              {
                role: "annotation",
              },
            ],
            ["September-2023", 6013, 6013, 20, 20, 10, 10, 50, 50],
            ["October-2023", 6899, 6899, 23, 23, 10, 10, 45, 45],
            ["November-2023", 6370, 6370, 23, 23, 11, 11, 48, 48],
            ["December-2023", 8165, 8165, 22, 22, 10, 10, 46, 46],
            ["January-2024", 7669, 7669, 20, 20, 9, 9, 47, 47],
            ["February-2024", 9175, 9175, 20, 20, 9, 9, 45, 45],
          ],
          mom: [
            ["M2O", 0],
            ["M2C", 0],
            ["C2O", -4.3],
          ],
        },
        slide_3: {
          title: "Lower Parel - Funnel",
          graph1: [
            [
              "months",
              "Menu Opens",
              {
                role: "annotation",
              },
              "M2C in %",
              {
                role: "annotation",
              },
              "M2O in %",
              {
                role: "annotation",
              },
              "C2O in %",
              {
                role: "annotation",
              },
            ],
            ["September-2023", 3921, 3921, 20, 20, 10, 10, 48, 48],
            ["October-2023", 4915, 4915, 23, 23, 9, 9, 40, 40],
            ["November-2023", 4071, 4071, 22, 22, 10, 10, 47, 47],
            ["December-2023", 5304, 5304, 22, 22, 8, 8, 37, 37],
            ["January-2024", 4456, 4456, 22, 22, 9, 9, 43, 43],
            ["February-2024", 6581, 6581, 20, 20, 8, 8, 39, 39],
          ],
          graph2: [
            [
              "months",
              "Menu Opens",
              {
                role: "annotation",
              },
              "M2C in %",
              {
                role: "annotation",
              },
              "M2O in %",
              {
                role: "annotation",
              },
              "C2O in %",
              {
                role: "annotation",
              },
            ],
            ["September-2023", 2092, 2092, 21, 21, 11, 11, 53, 53],
            ["October-2023", 1984, 1984, 24, 24, 13, 13, 54, 54],
            ["November-2023", 2299, 2299, 23, 23, 12, 12, 51, 51],
            ["December-2023", 2861, 2861, 20, 20, 13, 13, 63, 63],
            ["January-2024", 3213, 3213, 18, 18, 9, 9, 53, 53],
            ["February-2024", 2594, 2594, 20, 20, 12, 12, 60, 60],
          ],
        },
        slide_4: {
          title: "Lower Parel - User Segments Split",
          graph1: [
            [
              "months",
              "LA in %",
              {
                role: "annotation",
              },
              "MM in %",
              {
                role: "annotation",
              },
              "UM in %",
              {
                role: "annotation",
              },
            ],
            ["September-2023", 33, 33, 33, 33, 34, 34],
            ["October-2023", 43, 43, 29, 29, 28, 28],
            ["November-2023", 35, 35, 33, 33, 32, 32],
            ["December-2023", 41, 41, 33, 33, 26, 26],
            ["January-2024", 37, 37, 33, 33, 30, 30],
            ["February-2024", 38, 38, 36, 36, 26, 26],
          ],
          graph2: [
            [
              "months",
              "P3 in %",
              {
                role: "annotation",
              },
              "P2 in %",
              {
                role: "annotation",
              },
              "P1 in %",
              {
                role: "annotation",
              },
            ],
            ["September-2023", 10, 10, 16, 16, 74, 74],
            ["October-2023", 12, 12, 12, 12, 76, 76],
            ["November-2023", 13, 13, 8, 8, 79, 79],
            ["December-2023", 19, 19, 10, 10, 71, 71],
            ["January-2024", 9, 9, 8, 8, 83, 83],
            ["February-2024", 14, 14, 12, 12, 74, 74],
          ],
        },
        slide_5: {
          title: "Lower Parel - New User v/s Repeat User",
          graph1: [
            [
              "months",
              "New User in %",
              {
                role: "annotation",
              },
              "Repeat User in %",
              {
                role: "annotation",
              },
            ],
            ["September-2023", 49, 49, 51, 51],
            ["October-2023", 56, 56, 44, 44],
            ["November-2023", 51, 51, 49, 49],
            ["December-2023", 53, 53, 47, 47],
            ["January-2024", 54, 54, 46, 46],
            ["February-2024", 58, 58, 42, 42],
          ],
          graph2: [
            [
              "months",
              "New User in %",
              {
                role: "annotation",
              },
              "Repeat User in %",
              {
                role: "annotation",
              },
            ],
            ["September-2023", 56, 56, 44, 44],
            ["October-2023", 52, 52, 48, 48],
            ["November-2023", 45, 45, 55, 55],
            ["December-2023", 52, 52, 48, 48],
            ["January-2024", 53, 53, 47, 47],
            ["February-2024", 53, 53, 47, 47],
          ],
        },
      },
      Powai: {
        slide_1: {
          title: "Powai - Revenue & Orders",
          graph: [
            [
              "months",
              "Net Revenue (in lacs)",
              {
                role: "annotation",
              },
              "Orders",
              {
                role: "annotation",
              },
            ],
            [
              "September-2023",
              194475.64857142855,
              194475.64857142855,
              440,
              440,
            ],
            ["October-2023", 237838.94857142854, 237838.94857142854, 548, 548],
            ["November-2023", 237918.3419047619, 237918.3419047619, 438, 438],
            ["December-2023", 245789.2980952381, 245789.2980952381, 538, 538],
            ["January-2024", 132664.41285714286, 132664.41285714286, 267, 267],
            ["February-2024", 0, 0, 0, 0],
          ],
          mom: [
            ["Revenue", -100],
            ["Orders", -100],
          ],
          mo2m: [
            ["Revenue", -100],
            ["Orders", -100],
          ],
        },
        slide_2: {
          title: "Powai - Funnel",
          graph: [
            [
              "months",
              "Menu Opens",
              {
                role: "annotation",
              },
              "M2C in %",
              {
                role: "annotation",
              },
              "M2O in %",
              {
                role: "annotation",
              },
              "C2O in %",
              {
                role: "annotation",
              },
            ],
            ["September-2023", 4533, 4533, 20, 20, 10, 10, 49, 49],
            ["October-2023", 5579, 5579, 21, 21, 10, 10, 47, 47],
            ["November-2023", 4375, 4375, 21, 21, 10, 10, 47, 47],
            ["December-2023", 5879, 5879, 21, 21, 9, 9, 44, 44],
            ["January-2024", 2226, 2226, 23, 23, 12, 12, 51, 51],
            ["February-2024", 0, 0, 0, 0, 0, 0, 0, 0],
          ],
          mom: [
            ["M2O", -100],
            ["M2C", -100],
            ["C2O", -100],
          ],
        },
        slide_3: {
          title: "Powai - Funnel",
          graph1: [
            [
              "months",
              "Menu Opens",
              {
                role: "annotation",
              },
              "M2C in %",
              {
                role: "annotation",
              },
              "M2O in %",
              {
                role: "annotation",
              },
              "C2O in %",
              {
                role: "annotation",
              },
            ],
            ["September-2023", 2373, 2373, 20, 20, 8, 8, 43, 43],
            ["October-2023", 3803, 3803, 20, 20, 8, 8, 42, 42],
            ["November-2023", 2512, 2512, 20, 20, 8, 8, 43, 43],
            ["December-2023", 3356, 3356, 20, 20, 7, 7, 37, 37],
            ["January-2024", 1186, 1186, 23, 23, 11, 11, 50, 50],
            ["February-2024", 0, 0, 0, 0, 0, 0, 0, 0],
          ],
          graph2: [
            [
              "months",
              "Menu Opens",
              {
                role: "annotation",
              },
              "M2C in %",
              {
                role: "annotation",
              },
              "M2O in %",
              {
                role: "annotation",
              },
              "C2O in %",
              {
                role: "annotation",
              },
            ],
            ["September-2023", 2160, 2160, 20, 20, 11, 11, 54, 54],
            ["October-2023", 1776, 1776, 23, 23, 13, 13, 57, 57],
            ["November-2023", 1863, 1863, 23, 23, 12, 12, 53, 53],
            ["December-2023", 2523, 2523, 23, 23, 12, 12, 52, 52],
            ["January-2024", 1040, 1040, 24, 24, 13, 13, 53, 53],
            ["February-2024", 0, 0, 0, 0, 0, 0, 0, 0],
          ],
        },
        slide_4: {
          title: "Powai - User Segments Split",
          graph1: [
            [
              "months",
              "LA in %",
              {
                role: "annotation",
              },
              "MM in %",
              {
                role: "annotation",
              },
              "UM in %",
              {
                role: "annotation",
              },
            ],
            ["September-2023", 36, 36, 30, 30, 34, 34],
            ["October-2023", 53, 53, 27, 27, 20, 20],
            ["November-2023", 48, 48, 39, 39, 13, 13],
            ["December-2023", 44, 44, 30, 30, 26, 26],
            ["January-2024", 44, 44, 31, 31, 25, 25],
            ["February-2024", 0, 0, 0, 0, 0, 0],
          ],
          graph2: [
            [
              "months",
              "P3 in %",
              {
                role: "annotation",
              },
              "P2 in %",
              {
                role: "annotation",
              },
              "P1 in %",
              {
                role: "annotation",
              },
            ],
            ["September-2023", 17, 17, 14, 14, 69, 69],
            ["October-2023", 15, 15, 16, 16, 69, 69],
            ["November-2023", 12, 12, 11, 11, 77, 77],
            ["December-2023", 18, 18, 10, 10, 72, 72],
            ["January-2024", 20, 20, 13, 13, 67, 67],
            ["February-2024", 0, 0, 0, 0, 0, 0],
          ],
        },
        slide_5: {
          title: "Powai - New User v/s Repeat User",
          graph1: [
            [
              "months",
              "New User in %",
              {
                role: "annotation",
              },
              "Repeat User in %",
              {
                role: "annotation",
              },
            ],
            ["September-2023", 53, 53, 47, 47],
            ["October-2023", 64, 64, 36, 36],
            ["November-2023", 63, 63, 37, 37],
            ["December-2023", 50, 50, 50, 50],
            ["January-2024", 42, 42, 58, 58],
            ["February-2024", 0, 0, 0, 0],
          ],
          graph2: [
            [
              "months",
              "New User in %",
              {
                role: "annotation",
              },
              "Repeat User in %",
              {
                role: "annotation",
              },
            ],
            ["September-2023", 62, 62, 38, 38],
            ["October-2023", 63, 63, 37, 37],
            ["November-2023", 44, 44, 56, 56],
            ["December-2023", 59, 59, 41, 41],
            ["January-2024", 43, 43, 57, 57],
            ["February-2024", 0, 0, 0, 0],
          ],
        },
      },
      "Andheri Lokhandwala, Andheri West": {
        slide_1: {
          title: "Andheri Lokhandwala, Andheri West - Revenue & Orders",
          graph: [
            [
              "months",
              "Net Revenue (in lacs)",
              {
                role: "annotation",
              },
              "Orders",
              {
                role: "annotation",
              },
            ],
            [
              "September-2023",
              1584512.1785714286,
              1584512.1785714286,
              2583,
              2583,
            ],
            [
              "October-2023",
              1654109.1238095239,
              1654109.1238095239,
              2670,
              2670,
            ],
            [
              "November-2023",
              1730990.4666666668,
              1730990.4666666668,
              2692,
              2692,
            ],
            [
              "December-2023",
              1706408.1952380952,
              1706408.1952380952,
              2870,
              2870,
            ],
            [
              "January-2024",
              1622918.0952380951,
              1622918.0952380951,
              2771,
              2771,
            ],
            ["February-2024", 1735707.843404762, 1735707.843404762, 3092, 3092],
          ],
          mom: [
            ["Revenue", 6.9],
            ["Orders", 11.6],
          ],
          mo2m: [
            ["Revenue", 1.7],
            ["Orders", 7.7],
          ],
        },
        slide_2: {
          title: "Andheri Lokhandwala, Andheri West - Funnel",
          graph: [
            [
              "months",
              "Menu Opens",
              {
                role: "annotation",
              },
              "M2C in %",
              {
                role: "annotation",
              },
              "M2O in %",
              {
                role: "annotation",
              },
              "C2O in %",
              {
                role: "annotation",
              },
            ],
            ["September-2023", 11860, 11860, 33, 33, 22, 22, 66, 66],
            ["October-2023", 13904, 13904, 31, 31, 19, 19, 62, 62],
            ["November-2023", 13512, 13512, 31, 31, 20, 20, 63, 63],
            ["December-2023", 15534, 15534, 30, 30, 18, 18, 62, 62],
            ["January-2024", 17920, 17920, 28, 28, 15, 15, 56, 56],
            ["February-2024", 19735, 19735, 28, 28, 16, 16, 56, 56],
          ],
          mom: [
            ["M2O", 6.7],
            ["M2C", 0],
            ["C2O", 0],
          ],
        },
        slide_3: {
          title: "Andheri Lokhandwala, Andheri West - Funnel",
          graph1: [
            [
              "months",
              "Menu Opens",
              {
                role: "annotation",
              },
              "M2C in %",
              {
                role: "annotation",
              },
              "M2O in %",
              {
                role: "annotation",
              },
              "C2O in %",
              {
                role: "annotation",
              },
            ],
            ["September-2023", 7467, 7467, 32, 32, 20, 20, 63, 63],
            ["October-2023", 9854, 9854, 30, 30, 18, 18, 59, 59],
            ["November-2023", 8614, 8614, 31, 31, 19, 19, 60, 60],
            ["December-2023", 9310, 9310, 31, 31, 18, 18, 58, 58],
            ["January-2024", 12152, 12152, 27, 27, 15, 15, 54, 54],
            ["February-2024", 13692, 13692, 27, 27, 14, 14, 52, 52],
          ],
          graph2: [
            [
              "months",
              "Menu Opens",
              {
                role: "annotation",
              },
              "M2C in %",
              {
                role: "annotation",
              },
              "M2O in %",
              {
                role: "annotation",
              },
              "C2O in %",
              {
                role: "annotation",
              },
            ],
            ["September-2023", 4393, 4393, 35, 35, 24, 24, 69, 69],
            ["October-2023", 4050, 4050, 34, 34, 23, 23, 68, 68],
            ["November-2023", 4898, 4898, 33, 33, 22, 22, 69, 69],
            ["December-2023", 6224, 6224, 28, 28, 19, 19, 68, 68],
            ["January-2024", 5768, 5768, 28, 28, 17, 17, 61, 61],
            ["February-2024", 6043, 6043, 29, 29, 19, 19, 64, 64],
          ],
        },
        slide_4: {
          title: "Andheri Lokhandwala, Andheri West - User Segments Split",
          graph1: [
            [
              "months",
              "LA in %",
              {
                role: "annotation",
              },
              "MM in %",
              {
                role: "annotation",
              },
              "UM in %",
              {
                role: "annotation",
              },
            ],
            ["September-2023", 19, 19, 37, 37, 44, 44],
            ["October-2023", 20, 20, 38, 38, 42, 42],
            ["November-2023", 19, 19, 36, 36, 45, 45],
            ["December-2023", 23, 23, 35, 35, 42, 42],
            ["January-2024", 24, 24, 39, 39, 37, 37],
            ["February-2024", 22, 22, 38, 38, 40, 40],
          ],
          graph2: [
            [
              "months",
              "P3 in %",
              {
                role: "annotation",
              },
              "P2 in %",
              {
                role: "annotation",
              },
              "P1 in %",
              {
                role: "annotation",
              },
            ],
            ["September-2023", 10, 10, 11, 11, 79, 79],
            ["October-2023", 8, 8, 8, 8, 84, 84],
            ["November-2023", 7, 7, 6, 6, 87, 87],
            ["December-2023", 7, 7, 8, 8, 85, 85],
            ["January-2024", 9, 9, 10, 10, 81, 81],
            ["February-2024", 12, 12, 10, 10, 78, 78],
          ],
        },
        slide_5: {
          title: "Andheri Lokhandwala, Andheri West - New User v/s Repeat User",
          graph1: [
            [
              "months",
              "New User in %",
              {
                role: "annotation",
              },
              "Repeat User in %",
              {
                role: "annotation",
              },
            ],
            ["September-2023", 27, 27, 73, 73],
            ["October-2023", 34, 34, 66, 66],
            ["November-2023", 31, 31, 69, 69],
            ["December-2023", 31, 31, 69, 69],
            ["January-2024", 36, 36, 64, 64],
            ["February-2024", 38, 38, 62, 62],
          ],
          graph2: [
            [
              "months",
              "New User in %",
              {
                role: "annotation",
              },
              "Repeat User in %",
              {
                role: "annotation",
              },
            ],
            ["September-2023", 37, 37, 63, 63],
            ["October-2023", 39, 39, 61, 61],
            ["November-2023", 43, 43, 57, 57],
            ["December-2023", 35, 35, 65, 65],
            ["January-2024", 38, 38, 62, 62],
            ["February-2024", 40, 40, 60, 60],
          ],
        },
      },
    },
  };
  let arraySlides = [];
  for (var prop in allData) {
    if (prop === "per_subzone") {
      // arraySlides.push(<TitleSLide  data={"Store Wise Insights"} pptx={pptx} />)
      for (var subzone in allData[prop]) {
        console.log(subzone);
        // arraySlides.push(<TitleSLide data={subzone} pptx={pptx}/>)

        for (var slide in allData[prop][subzone]) {
          if (slide == "slide_1") {
            console.log(allData[prop][subzone][slide]);
            arraySlides.push(
              <Slide26
                subzonename={subzone}
                tableid={subzone + slide}
                data={allData[prop][subzone][slide]}
                pptx={pptx}
              />
            );
          } else if (slide == "slide_2") {
            console.log(allData[prop][subzone][slide]);
            arraySlides.push(
              <Slide27
                tableid={subzone + slide}
                data={allData[prop][subzone][slide]}
                pptx={pptx}
              />
            );
          } else if (slide == "slide_3") {
            console.log(allData[prop][subzone][slide]);
            arraySlides.push(
              <SlideX data={allData[prop][subzone][slide]} pptx={pptx} />
            );
          } else if (slide == "slide_4") {
            console.log(allData[prop][subzone][slide]);
            arraySlides.push(
              <Slide31 data={allData[prop][subzone][slide]} pptx={pptx} />
            );
          } else if (slide == "slide_5") {
            console.log(allData[prop][subzone][slide]);
            arraySlides.push(
              <Slide32 data={allData[prop][subzone][slide]} pptx={pptx} />
            );
          }
        }
      }
    } else {
      console.log(prop);
      if (prop == "slide_4") {
        console.log(allData[prop]);
        arraySlides.push(
          <Slide4
            tableid="slide_4"
            pptx={pptx}
            data={allData[prop]}
            title="Slide 4"
          />
        );
      } else if (prop == "slide_6") {
        console.log(allData[prop]);
        arraySlides.push(
          <Slide4
            tableid="slide_6"
            pptx={pptx}
            data={allData[prop]}
            title="Slide 4"
          />
        );
      } else if (prop == "slide_7") {
        console.log(allData[prop]);
        arraySlides.push(
          <Slide4
            tableid="slide_7"
            pptx={pptx}
            data={allData[prop]}
            title="Slide 4"
          />
        );
      } else if (prop == "slide_8") {
        console.log(allData[prop]);
        arraySlides.push(
          <Slide2
            tableid="slide_8"
            pptx={pptx}
            data={allData[prop]}
            title="Slide 4"
          />
        );
      } else if (prop == "slide_9") {
        console.log(allData[prop]);
        arraySlides.push(
          <StoreWiseGridVisibility
            tableid="slide_9"
            pptx={pptx}
            data={allData[prop]}
          />
        );
      } else if (prop == "slide_18") {
        console.log(allData[prop]);
        arraySlides.push(
          <Slide18 tableid="slide_18" pptx={pptx} data={allData[prop]} />
        );
      } else if (prop == "slide_19") {
        console.log(allData[prop]);
        arraySlides.push(
          <Slide20 tableid="slide_19" pptx={pptx} data={allData[prop]} />
        );
      } else if (prop == "slide_20") {
        console.log(allData[prop]);
        arraySlides.push(
          <StoreWiseOrderIDWiseRatingSplit
            tableid="slide_20"
            pptx={pptx}
            data={allData[prop]}
          />
        );
      } else if (prop == "slide_21") {
        console.log(allData[prop]);
        arraySlides.push(
          <StoreWiseOrderIDWiseRatingSplit
            tableid="slide_21"
            pptx={pptx}
            data={allData[prop]}
          />
        );
      } else if (prop == "slide_22") {
        console.log(allData[prop]);
        arraySlides.push(
          <Slide4 tableid="slide_21" pptx={pptx} data={allData[prop]} />
        );
      }
    }
  }

  console.log(arraySlides);

  const generateNextPPT = () => {
    setCurrentIndex(currentIndex + 1);
  };

  // arr.map((a) => console.log(a));

  return (
    <>
      <div>
        {/* {arr.map((component, index) => (
          <React.Fragment key={index}>{component}</React.Fragment>
        ))} */}

        {/* <Slide18 tableid="slide_18" pptx={pptx} data={allData["slide_18"]} /> */}
        <Slide4
          tableid="slide_6"
          pptx={pptx}
          data={allData["slide_4"]}
          title="Slide 4"
        />
        {/* {arraySlides.map((component, index) => (
          <React.Fragment key={index}>{component}</React.Fragment>
        ))} */}
      </div>
      <button onClick={generateppt}>Generate PPT</button>
    </>
  );
}

export default App;
