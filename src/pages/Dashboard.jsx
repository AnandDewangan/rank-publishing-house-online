import React, { useEffect, useState } from "react";
import AddTransactionForm from "../components/AddTransactionForm";
import TransactionList from "../components/TransactionList";
import ExportPdfButton from "../components/ExportPdfButton";
import axios from "axios";
import { format } from "date-fns";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const currentDate = new Date();
  const [month, setMonth] = useState(
    String(currentDate.getMonth() + 1).padStart(2, "0")
  );
  const [year, setYear] = useState(String(currentDate.getFullYear()));
  const [transactions, setTransactions] = useState([]);
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const loadData = async () => {
    try {
      const res = await axios.get(
        `${baseURL}/api/transactions?month=${month}&year=${year}`
      );
      setTransactions(res.data);
    } catch (err) {
      console.error("Failed to fetch transactions", err);
    }
  };

  useEffect(() => {
    loadData();
  }, [month, year]);

  const addTransaction = (tx) => {
    setTransactions([tx, ...transactions]);
  };

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, cur) => acc + cur.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, cur) => acc + cur.amount, 0);

  return (
    <main className="main-wrapper">
      <div className="main-content container-fluid">
        {/* Top Bar */}
        <div className="page-breadcrumb d-sm-flex align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-center">
            <div className="breadcrumb-title pe-3 text-uppercase">
              Add Transaction
            </div>
          </div>
          <button
            className="btn btn-danger rounded-circle"
            onClick={() => window.history.back()}
          >
            <BiArrowBack />
          </button>
        </div>

        {/* Month & Year Selector */}
        <div className="d-flex gap-2 mb-4">
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="form-select w-auto"
          >
            {Array.from({ length: 12 }, (_, i) => {
              const m = String(i + 1).padStart(2, "0");
              return (
                <option key={m} value={m}>
                  {m}
                </option>
              );
            })}
          </select>

          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="form-select w-auto"
          >
            {[2023, 2024, 2025].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <button onClick={loadData} className="btn btn-primary">
            Load Data
          </button>
        </div>

        {/* Grid Layout: Add Form + Summary */}
        <div className="row">
          {/* Left: Add Transaction */}
          <div className="col-md-6 mb-4">
            <AddTransactionForm onAdd={addTransaction} />
          </div>

          {/* Right: Summary */}
          <div className="col-md-6 mb-4">
            <div className="card p-3 shadow">
              <h5 className="mb-3">Summary</h5>
              <p>
                Total Income:{" "}
                <span className="text-success fw-bold">₹{totalIncome}</span>
              </p>
              <p>
                Total Expense:{" "}
                <span className="text-danger fw-bold">₹{totalExpense}</span>
              </p>
              <p>
                Net Profit:{" "}
                <span
                  className={
                    totalIncome - totalExpense >= 0
                      ? "text-success fw-bold"
                      : "text-danger fw-bold"
                  }
                >
                  ₹{totalIncome - totalExpense}
                </span>
              </p>
            </div>

            {/* Export Button & Transaction List */}
            <div className="flex items-center gap-4 mb-3">
              {transactions.length > 0 && (
                <ExportPdfButton
                  transactions={transactions}
                  month={month}
                  year={year}
                />
              )}
              <Link
                to="/salary-slip-generator"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Salary Slip
              </Link>
            </div>
          </div>
        </div>

        <div className="card p-3 shadow">
          <h5 className="mb-3">All Transactions</h5>
          <TransactionList transactions={transactions} />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
