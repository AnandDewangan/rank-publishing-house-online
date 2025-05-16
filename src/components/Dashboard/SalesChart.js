import axios from "axios";
import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { toast } from "react-toastify";

const baseURL = process.env.REACT_APP_API_BASE_URL;
const SalesChart = () => {
  const [chartData, setChartData] = useState({
    categories: [],
    series: [{ name: "Books Sold", data: [] }],
  });

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/orders/monthly`);
        toast.success("Sales Chart Data loaded!");
        setChartData({
          categories: res.data.months,
          series: [{ name: "Sales", data: res.data.sales_data }],
        });
      } catch (error) {
        toast.error(`Failed to fetch sales chart data: ${error.message}`);
        setChartData({
          categories: [],
          series: [{ name: "Sales", data: [] }],
        });
      }
    };

    fetchChartData();
  }, []);

  const options = {
    chart: {
      type: "bar",
      height: 400,
      foreColor: "green",
      toolbar: { show: false },
      animations: {
        enabled: true,
        easing: "easeout",
        speed: 1500,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "30%",
        endingShape: "rounded",
        borderRadius: 8,
        distributed: true,
      },
    },
    dataLabels: { enabled: false },
    colors: [
      "#ff4d4d",
      "#ff884d",
      "#ffc14d",
      "#a3ff4d",
      "#4dff4d",
      "#4dff88",
      "#4dffc1",
      "#4da3ff",
      "#4d4dff",
      "#884dff",
      "#c14dff",
      "#ff4da3",
    ],
    stroke: { show: true, width: 1, colors: ["#ffffff"] },
    xaxis: {
      categories: chartData.categories,
      labels: { style: { fontSize: "14px", fontWeight: "bold" } },
    },
    yaxis: {
      title: {
        text: "Books Sold",
        style: { fontSize: "16px", fontWeight: "bold" },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        type: "horizontal",
        gradientToColors: [
          "#ff1a1a",
          "#ff6600",
          "#ffcc00",
          "#66ff00",
          "#00ff99",
          "#0099ff",
          "#0033ff",
          "#6600ff",
          "#ff00ff",
        ],
        stops: [0, 100],
      },
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val) =>
          `<span style="font-weight:bold;color:#fff;">${val}</span>`,
      },
    },
  };

  return (
    <div className="col-12">
      <div className="card w-100 rounded-4">
        <div className="card-body">
          <div className="d-flex align-items-start justify-content-between mb-3">
            <h5 className="mb-0">Sales & Views</h5>
          </div>
          {chartData?.categories && chartData?.series && (
            <ApexCharts
              options={{
                ...options,
                xaxis: { categories: chartData.categories },
              }}
              series={chartData.series}
              type="bar"
              height={400}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
