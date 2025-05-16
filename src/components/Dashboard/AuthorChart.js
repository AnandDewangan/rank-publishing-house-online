import React, { useEffect, useState } from "react";
import axios from "axios";
import ApexCharts from "react-apexcharts"; 

const baseURL = process.env.REACT_APP_API_BASE_URL;

const BooksChart = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalSoldQty: 0,
    totalTransactions: 0,
    totalRoyalty: 0,
  });
  
  const authorId = localStorage.getItem("authorId"); 

  useEffect(() => {
    if (!authorId) return;
  
    const fetchStats = async () => {
      try {
        const bookStatsRes = await axios.get(`${baseURL}/api/books/stats/${authorId}`);
        const salesRes = await axios.get(`${baseURL}/api/orders/author-sales/${authorId}`);
  
        const { total_amazon = 0, total_flipkart = 0, total_other = 0 } = salesRes.data;
        const totalSoldQty = total_amazon + total_flipkart + total_other;
  
        setStats({
          totalBooks: bookStatsRes.data.totalBooks || 0,
          totalSoldQty,
          totalTransactions: bookStatsRes.data.totalTransactions || 0,
          totalRoyalty: totalSoldQty * 20,
          totalTransactionAmount: bookStatsRes.data.totalTransactionAmount || 0,
        });
        
      } catch (err) {
        console.error("Error fetching book stats or sales:", err);
      }
    };
  
    fetchStats();
  }, [authorId]);
  


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
              <h4 className="mb-0">{stats.totalBooks}</h4>
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
              <span className="text-success">Total Book Sale</span>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <h4 className="mb-0">{stats.totalSoldQty}</h4>
            </div>
            <ApexCharts 
              options={createChart([5, 20, 50, 100, stats.totalSoldQty], "#28a745")} 
              series={[{ name: "Books Sold", data: [5, 20, 50, 100, stats.totalSoldQty] }]} 
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
              <span className="text-info">Total Transactions</span>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <h4 className="mb-0">{stats.totalTransactionAmount}</h4>
            </div>
            <ApexCharts 
              options={createChart([1, 5, 15, 30, stats.totalTransactions], "#17a2b8")} 
              series={[{ name: "Books Sold", data: [1, 5, 15, 30, stats.totalTransactions] }]} 
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
              <span className="text-warning">Total Royalty (₹)</span>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <h4 className="mb-0">{stats.totalRoyalty}</h4>
            </div>
            <ApexCharts 
              options={createChart([0, 2, 5, 7, stats.dailyOrders], "#ffc107")} 
              series={[{ name: "Books Sold", data: [0, 2, 5, 7, stats.totalRoyalty] }]} 
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
