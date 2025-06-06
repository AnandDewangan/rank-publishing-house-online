import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const EntryDetailsPage = () => {
  const { rphCode } = useParams();
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const { data } = await axios.get(
          `${baseURL}/api/entry/entry-by-rph/${rphCode}`
        );
        setEntry(data);
      } catch (err) {
        console.error("Error fetching entry:", err);
      }
    };

    fetchEntry();
  }, [rphCode]);

  const handleDownloadPdf = () => {
    if (!entry) return;

    const doc = new jsPDF();
    doc.text(`Entry Details - RPH Code: ${entry.rphCode}`, 14, 20);

    const rows = Object.entries(entry).map(([key, value]) => [
      key,
      String(value),
    ]);

    autoTable(doc, {
      startY: 30,
      head: [["Field", "Value"]],
      body: rows,
    });

    doc.save(`entry-${entry.rphCode}.pdf`);
  };

  if (!entry) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container my-5">
      <div className="page-breadcrumb d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center">
          <div className="breadcrumb-title pe-3 text-uppercase">RPH - {entry.rphCode}</div>
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
      <div className="card shadow">
        <div className="card-body">
          <div className="row">
            {Object.entries(entry).map(([key, value]) => (
              <div className="col-md-6 mb-3" key={key}>
                <span>{key.replace(/([A-Z])/g, " $1").toUpperCase()}:</span>{" "}
                <strong>{String(value)}</strong><hr />
              </div>
            ))}
          </div>

          <button className="btn btn-success mt-4" onClick={handleDownloadPdf}>
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntryDetailsPage;
