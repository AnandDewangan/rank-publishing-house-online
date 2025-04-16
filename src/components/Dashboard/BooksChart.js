import React, { useEffect, useState } from "react";
import axios from "axios";
import ApexCharts from "react-apexcharts";

const BooksChart = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    lastMonthOrders: 0,
    lastWeekOrders: 0,
    dailyOrders: 0,
  });
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    axios.get(`${baseURL}/api/books/stats`)
      .then(response => setStats(response.data))
      .catch(error => console.error("Error fetching book stats:", error));
  }, []);
  

  const createChart = (data, color) => ({
    chart: { type: "area", height: 80, sparkline: { enabled: true } },
    stroke: { curve: "smooth", width: 2 },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0, stops: [0, 100] },
    },
    colors: [color],
    tooltip: { enabled: false },
  });

  return (
    <div className="row">
      {/* Total Books */}
      <div className="col-12 col-lg-3 d-flex">
        <div className="card rounded-4 w-100">
          <div className="card-body">
            <div className="mb-3 d-flex align-items-end justify-content-center">
              <span className="text-primary">Total Books</span>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <h4 className="mb-0">{stats.totalOrders}</h4>
            </div>
            <ApexCharts 
              options={createChart([10, 30, 50, 80, stats.totalOrders], "#007bff")} 
              series={[{ name: "Books Sold", data: [10, 30, 50, 80, stats.totalOrders] }]} 
              type="area" 
              height={80} 
            />
          </div>
        </div>
      </div>

      {/* Last Month Books */}
      <div className="col-12 col-lg-3 d-flex">
        <div className="card rounded-4 w-100">
          <div className="card-body">
            <div className="mb-3 d-flex align-items-end justify-content-center">
              <span className="text-success">Last Month Books</span>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <h4 className="mb-0">{stats.lastMonthOrders}</h4>
            </div>
            <ApexCharts 
              options={createChart([5, 20, 50, 100, stats.lastMonthOrders], "#28a745")} 
              series={[{ name: "Books Sold", data: [5, 20, 50, 100, stats.lastMonthOrders] }]} 
              type="area" 
              height={80} 
            />
          </div>
        </div>
      </div>

      {/* Last Week Books */}
      <div className="col-12 col-lg-3 d-flex">
        <div className="card rounded-4 w-100">
          <div className="card-body">
            <div className="mb-3 d-flex align-items-end justify-content-center">
              <span className="text-info">Last Week Books</span>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <h4 className="mb-0">{stats.lastWeekOrders}</h4>
            </div>
            <ApexCharts 
              options={createChart([1, 5, 15, 30, stats.lastWeekOrders], "#17a2b8")} 
              series={[{ name: "Books Sold", data: [1, 5, 15, 30, stats.lastWeekOrders] }]} 
              type="area" 
              height={80} 
            />
          </div>
        </div>
      </div>

      {/* Daily Books */}
      <div className="col-12 col-lg-3 d-flex">
        <div className="card rounded-4 w-100">
          <div className="card-body">
            <div className="mb-3 d-flex align-items-end justify-content-center">
              <span className="text-warning">Daily Books</span>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <h4 className="mb-0">{stats.dailyOrders}</h4>
            </div>
            <ApexCharts 
              options={createChart([0, 2, 5, 7, stats.dailyOrders], "#ffc107")} 
              series={[{ name: "Books Sold", data: [0, 2, 5, 7, stats.dailyOrders] }]} 
              type="area" 
              height={80} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksChart;
