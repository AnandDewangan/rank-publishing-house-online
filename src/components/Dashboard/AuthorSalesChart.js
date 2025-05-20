import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
const baseURL = process.env.REACT_APP_API_BASE_URL;

const AuthorSalesChart = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "pie",
        height: 200,
      },
      labels: ["Amazon", "Flipkart", "Other", "E-Book"], // ✅ added E-Book
      colors: ["#ff9800", "#2196F3", "#9E9E9E", "#4CAF50"], // ✅ added color
      legend: {
        position: "bottom",
        labels: {
          colors: ["#FF9800", "#2196F3", "#9E9E9E", "#4CAF50"],
        },
      },
      tooltip: {
        y: {
          formatter: (val) => `${val} orders`,
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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authorId = localStorage.getItem("authorId");
    if (!authorId) {
      setLoading(false);
      return;
    }

    axios
      .get(`${baseURL}/api/orders/author-sales/${authorId}`)
      .then((response) => {
        const {
          total_amazon = 0,
          total_flipkart = 0,
          total_other = 0,
          total_ebook = 0, // ✅ fetch ebook sales
        } = response.data || {};

        setChartData((prevData) => ({
          ...prevData,
          series: [total_amazon, total_flipkart, total_other, total_ebook], // ✅ add it to series
        }));
      })
      .catch((error) => {
        console.error("Error fetching author sales:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center p-4">
        <span className="spinner-border text-primary"></span>
      </div>
    );
  }

  return (
    <div className="card w-100 rounded-4 p-3 text-center">
      <h5 className="mb-2">Your Book Sales Report</h5>
      {chartData.series.reduce((a, b) => a + b, 0) > 0 ? (
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="pie"
          height={350}
        />
      ) : (
        <p>No sales data found.</p>
      )}
    </div>
  );
};

export default AuthorSalesChart;
