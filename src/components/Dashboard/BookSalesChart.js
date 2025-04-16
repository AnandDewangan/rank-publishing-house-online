import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const BookSalesChart = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "pie",
        height: 200,
      },
      labels: ["Amazon", "Flipkart", "Other"],
      colors: ["#ff9800", "#2196F3", "#9E9E9E"],
      legend: {
        position: "bottom",
        labels: {
          colors: ["#FF9800", "#2196F3", "#9E9E9E"],
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  const baseURL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${baseURL}/api/orders/book-orders`)
      .then((response) => {
        const { total_amazon = 0, total_flipkart = 0, total_other = 0 } = response.data || {};

        setChartData((prevData) => ({
          ...prevData,
          series: [total_amazon, total_flipkart, total_other],
        }));
      })
      .catch((error) => console.error("Error fetching book order data:", error));
  }, []);

  return (
    <div className="card w-100 rounded-4 p-3 text-center">
      <h5 className="mb-2">Books Sales Report</h5>
      {chartData.series.length > 0 ? (
        <Chart options={chartData.options} series={chartData.series} type="pie" height={350} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default BookSalesChart;
