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
    totalTransactionAmount: 0,
  });

  const authorId = localStorage.getItem("authorId");

  useEffect(() => {
    if (!authorId) return;

    const fetchStats = async () => {
      try {
        const bookStatsRes = await axios.get(
          `${baseURL}/api/books/stats/${authorId}`
        );
        const salesRes = await axios.get(
          `${baseURL}/api/orders/author-sales/${authorId}`
        );

        let {
          total_amazon = 0,
          total_flipkart = 0,
          total_other = 0,
          total_ebook = 0,
          totalRoyalty = 0,
        } = salesRes.data;

        const totalSoldQty =
          total_amazon + total_flipkart + total_other + total_ebook;

        setStats({
          totalBooks: bookStatsRes.data.totalBooks || 0,
          totalSoldQty,
          totalTransactions: bookStatsRes.data.totalTransactions || 0,
          totalTransactionAmount: bookStatsRes.data.totalTransactionAmount || 0,
          totalRoyalty,
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
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    colors: [color],
    tooltip: { enabled: false },
  });

  return (
    <div className="row">
      <div className="col-12 col-lg-3 d-flex">
        <div className="card rounded-4 w-100">
          <div className="card-body text-center">
            <span className="text-primary">Total Books</span>
            <h4>{stats.totalBooks}</h4>
            <ApexCharts
              options={createChart(
                [10, 20, 30, 40, stats.totalBooks],
                "#007bff"
              )}
              series={[{ data: [10, 20, 30, 40, stats.totalBooks] }]}
              type="area"
              height={80}
            />
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-3 d-flex">
        <div className="card rounded-4 w-100">
          <div className="card-body text-center">
            <span className="text-success">Total Sold Qty</span>
            <h4>{stats.totalSoldQty}</h4>
            <ApexCharts
              options={createChart(
                [5, 15, 25, 35, stats.totalSoldQty],
                "#28a745"
              )}
              series={[{ data: [5, 15, 25, 35, stats.totalSoldQty] }]}
              type="area"
              height={80}
            />
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-3 d-flex">
        <div className="card rounded-4 w-100">
          <div className="card-body text-center">
            <span className="text-info">Total Transactions</span>
            <h4>{stats.totalTransactions}</h4>
            <ApexCharts
              options={createChart(
                [1, 2, 3, 4, stats.totalTransactions],
                "#17a2b8"
              )}
              series={[{ data: [1, 2, 3, 4, stats.totalTransactions] }]}
              type="area"
              height={80}
            />
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-3 d-flex">
        <div className="card rounded-4 w-100">
          <div className="card-body text-center">
            <span className="text-warning">Total Royalty (₹)</span>
            <h4>{stats.totalRoyalty}</h4>
            <ApexCharts
              options={createChart(
                [0, 10, 20, 30, stats.totalRoyalty],
                "#ffc107"
              )}
              series={[{ data: [0, 10, 20, 30, stats.totalRoyalty] }]}
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
