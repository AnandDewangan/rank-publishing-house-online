import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const InitialForm = () => {
  const [formData, setFormData] = useState({
    rphCode: "",
    authorName: "",
    email: "",
    contactNo: "",
    packages: "",
    amount: "",
    referenceName: "",
    status: "pending",
  });

  const [generatedLink, setGeneratedLink] = useState("");
  useEffect(() => {
    const fetchRPHCode = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/entry/rph-code`);
        setFormData((prev) => ({ ...prev, rphCode: res.data.rphCode }));
      } catch (error) {
        console.error("Error fetching RPH Code:", error);
      }
    };

    fetchRPHCode();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${baseURL}/api/entry/create-entry`,
        formData
      );
      // ✅ Correct path:
      setGeneratedLink(`/step-one/${res.data.rphCode}`);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 shadow-xl rounded-2xl border my-10 card">
      <div className="page-breadcrumb d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center">
          <div className="breadcrumb-title pe-3 text-uppercase">PIF Entry</div>
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
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">RPH Code</label>
          <input
            type="text"
            value={formData.rphCode}
            disabled
            className="w-full p-3 border rounded-xl "
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Author Name *
          </label>
          <input
            type="text"
            name="authorName"
            value={formData.authorName}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-xl text-dark"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl text-dark"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Contact No *</label>
          <input
            type="text"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-xl text-dark"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Packages *</label>
          <select
            name="packages"
            value={formData.packages}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-xl text-dark"
          >
            <option value="">Select Package</option>
            <option value="Classic">Classic</option>
            <option value="Supreme">Supreme</option>
            <option value="Platinum">Platinum</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Amount *</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-xl text-dark"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Reference Name
          </label>
          <input
            type="text"
            name="referenceName"
            value={formData.referenceName}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl text-dark"
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white w-full p-3 border rounded-xl hover:bg-blue-700 transition"
          >
            Generate Link
          </button>
        </div>
      </form>

      {generatedLink && (
        <div className="mt-8 bg-green-50 border border-green-200 p-4 rounded-xl shadow-sm">
          <p className="text-md font-medium text-gray-700 mb-3">
            Form link generated:
          </p>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              readOnly
              className="flex-1 p-3 border rounded-xl bg-white text-blue-800 font-semibold"
              value={`${window.location.origin}${generatedLink}`}
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.origin}${generatedLink}`
                );
                alert("Link copied!");
                window.open(generatedLink, "_blank");
              }}
              className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Copy & Open
            </button>
          </div>
        </div>
      )}
      <div className="mt-5">
        <Link to="/entries" className="btn btn-outline-success">
          PIF LIST
        </Link>
      </div>
    </div>
  );
};

export default InitialForm;
