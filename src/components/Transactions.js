import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { BiArrowBack, BiTransfer, BiTrash } from "react-icons/bi";

const Transactions = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [sortedTransactions, setSortedTransactions] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "transaction_date_time",
    direction: "asc",
  });

  const [formData, setFormData] = useState({
    transaction_id: "",
    transaction_date_time: "",
    source_of_payment: "",
    amount: "",
  });
  const userRole = localStorage.getItem("userRole");
  const token = localStorage.getItem("adminToken");
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    if (authorId) {
      fetchAuthorDetails();
      fetchTransactions();
    }
  }, [authorId]);

  useEffect(() => {
    sortTransactions(transactions);
  }, [transactions, sortConfig]);

  const fetchAuthorDetails = async () => {
    try {
      const res = await axios.get(
        `${baseURL}/api/authors/${authorId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAuthor(res.data);
    } catch (err) {
      toast.error("Failed to fetch author details", err);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(
        `${baseURL}/api/transactions/by-author/${authorId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTransactions(res.data);
      setSortedTransactions(res.data);
    } catch (err) {
      toast.error("Transactions fetch failed:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseURL}/api/transactions/add`, {
        ...formData,
        author_id: authorId,
      });
      fetchTransactions();
      setFormData({
        transaction_id: "",
        transaction_date_time: "",
        source_of_payment: "",
        amount: "",
      });
      toast.success("Transaction added successfully");

      // Close modal
      const modal = window.bootstrap.Modal.getInstance(
        document.getElementById("addTransactionModal")
      );
      modal.hide();
    } catch (error) {
      toast.error("Failed to add transaction", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await axios.delete(`${baseURL}/api/transactions/${id}`);
        toast.success("Transaction deleted successfully");
        fetchTransactions();
      } catch (error) {
        toast.error("Failed to delete transaction");
      }
    }
  };

  const sortTransactions = (data, config = sortConfig) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      if (a[config.key] < b[config.key])
        return config.direction === "asc" ? -1 : 1;
      if (a[config.key] > b[config.key])
        return config.direction === "asc" ? 1 : -1;
      return 0;
    });
    setSortedTransactions(sortedData);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const newSortConfig = { key, direction };
    setSortConfig(newSortConfig);
    sortTransactions(transactions, newSortConfig);
  };

  return (
    <main className="main-wrapper">
      <ToastContainer />
      <div className="main-content">
        <div className="page-breadcrumb d-flex align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-center">
            <div className="breadcrumb-title pe-3 text-uppercase">
              Transactions
            </div>
            <nav aria-label="breadcrumb" className="ps-3">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <Link to="/" className="text-decoration-none fw-semibold">
                    Home
                  </Link>
                </li>
              </ol>
            </nav>
          </div>
          <button
            className="btn btn-danger rounded-circle"
            onClick={() => window.history.back()}
          >
            <BiArrowBack />
          </button>
        </div>

        <div className="container mt-4">
        {userRole === "admin" && (
          <div className="d-flex justify-content-between align-items-center"> 
          <button
            className="btn btn-primary mb-3"
            data-bs-toggle="modal"
            data-bs-target="#addTransactionModal"
          >
            <BiTransfer />
          </button> 
            <h6 className="fw-bold">{author?.name} ({author?.contact_no})</h6>
          </div> 
        )}
          {/* Modal */}
          <div
            className="modal fade"
            id="addTransactionModal"
            tabIndex="-1"
            aria-labelledby="addTransactionModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addTransactionModalLabel">
                    Add Transaction
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label>Date and Time</label>
                        <input
                          type="datetime-local"
                          name="transaction_date_time"
                          className="form-control"
                          value={formData.transaction_date_time}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              transaction_date_time: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label>Transaction ID</label>
                        <input
                          type="text"
                          name="transaction_id"
                          className="form-control"
                          value={formData.transaction_id}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              transaction_id: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label>Payment Source</label>
                        <select
                          name="source_of_payment"
                          className="form-control"
                          value={formData.source_of_payment}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              source_of_payment: e.target.value,
                            })
                          }
                          required
                        >
                          <option value="">Select Payment Source</option>
                          <option value="UPI">UPI</option>
                          <option value="Bank">Bank</option>
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label>Amount</label>
                        <input
                          type="number"
                          name="amount"
                          className="form-control"
                          value={formData.amount}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              amount: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                    <button className="btn btn-success w-100" type="submit">
                      Add Transaction
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div> 
          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="table-primary">
                <tr>
                  <th onClick={() => handleSort("transaction_id")}>S.No.</th>
                  <th onClick={() => handleSort("transaction_date_time")}>
                    Date & Time
                  </th>
                  <th onClick={() => handleSort("source_of_payment")}>
                    Source
                  </th>
                  <th onClick={() => handleSort("amount")}>Amount</th>
                  {userRole === "admin" && (<th>Actions</th>)}
                </tr>
              </thead>
              <tbody>
                {sortedTransactions.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  sortedTransactions.map((txn, index) => (
                    <tr key={txn._id}>
                      <td>{index + 1}</td>
                      <td>
                        {new Date(txn.transaction_date_time).toLocaleString()}
                      </td>
                      <td>{txn.source_of_payment}</td>
                      <td>₹{txn.amount}</td>
                      {userRole === "admin" && (
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(txn._id)}
                        >
                          <BiTrash />
                        </button>
                      </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Transactions;
