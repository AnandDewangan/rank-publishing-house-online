import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiArrowBack, BiLeftArrow, BiRightArrow, BiShow } from "react-icons/bi";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const statusColors = {
  pending: "table-warning",
  "author completed": "table-info",
  "cover confirmation": "table-primary",
  "isbn confirmation": "table-secondary",
  "manuscript confirmation": "table-success",
  "work completed": "table-success",
  cancelled: "table-danger",
};

const statusOptions = [
  "pending",
  "author completed",
  "cover confirmation",
  "isbn confirmation",
  "manuscript confirmation",
  "work completed",
  "cancelled",
];

const AllEntriesPage = () => {
  const [entries, setEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/api/entry/all`);
        setEntries(data);
      } catch (err) {
        console.error("Failed to fetch entries:", err);
      }
    };
    fetchAll();
  }, []);

  // Apply status filter first
  const filteredEntries =
    filterStatus === "all"
      ? entries
      : entries.filter(
          (entry) => entry.status?.toLowerCase() === filterStatus.toLowerCase()
        );

  // Then paginate
  const indexOfLast = currentPage * entriesPerPage;
  const indexOfFirst = indexOfLast - entriesPerPage;
  const currentEntries = filteredEntries.slice(indexOfFirst, indexOfLast);

  // Update total pages based on filtered results
  const totalPages = Math.ceil(filteredEntries.length / entriesPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleStatusChange = async (rphCode, newStatus) => {
    try {
      // Call backend to update status
      await axios.put(`${baseURL}/api/entry/update-status/${rphCode}`, {
        status: newStatus,
      });

      // Update frontend state for instant UI feedback
      setEntries((prevEntries) =>
        prevEntries.map((entry) =>
          entry.rphCode === rphCode ? { ...entry, status: newStatus } : entry
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    }
  };

  return (
    <div className="container my-5">
      <div className="page-breadcrumb d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center">
          <div className="breadcrumb-title pe-3 text-uppercase">PIF LIST</div>
          <nav aria-label="breadcrumb" className="ps-3">
            <ol className="breadcrumb mb-0 p-0">
              <li className="breadcrumb-item">
                <Link
                  to="/admin-dashboard"
                  className="text-decoration-none fw-semibold"
                >
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

      <div className="mb-3 d-flex align-items-center gap-2">
        <label htmlFor="statusFilter" className="form-label fw-semibold mb-0">
          Filter by Status:
        </label>
        <select
          id="statusFilter"
          className="form-select w-auto"
          value={filterStatus}
          onChange={(e) => {
            setCurrentPage(1); // Reset to first page on filter change
            setFilterStatus(e.target.value);
          }}
        >
          <option value="all">All</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Date</th>
            <th>RPH Code</th>
            <th>Name</th>
            <th>Contact No</th>
            <th>Package</th>
            <th>Amount</th>
            <th>Status</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {currentEntries.map((entry) => (
            <tr
              key={entry.rphCode}
              className={statusColors[entry.status?.toLowerCase()] || ""}
            >
              <td>{new Date(entry.submittedAt).toLocaleDateString()}</td>
              <td>{entry.rphCode}</td>
              <td>{entry.authorName}</td>
              <td>{entry.contactNo}</td>
              <td>{entry.packages}</td>
              <td>{entry.amount}</td>
              <td>
                <select
                  value={entry.status?.toLowerCase() || "pending"}
                  onChange={(e) =>
                    handleStatusChange(entry.rphCode, e.target.value)
                  }
                  className="form-select"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <Link
                  to={`/entry-details/${entry.rphCode}`}
                  className="btn btn-outline-primary btn-sm"
                >
                  <BiShow />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center">
        <button
          className="btn btn-outline-secondary"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          <BiLeftArrow />
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-outline-secondary"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          <BiRightArrow />
        </button>
      </div>
    </div>
  );
};

export default AllEntriesPage;
