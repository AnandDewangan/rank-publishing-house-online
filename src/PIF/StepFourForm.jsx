import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const StepFourForm = () => {
  const { rphCode } = useParams();
  const navigate = useNavigate();

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  const [formData, setFormData] = useState({
    acHolderName: "",
    bankName: "",
    acNumber: "",
    ifscCode: "",
    accountType: "saving",
    upiId: "",
    submittedDate: getCurrentDate(),
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "ifscCode") {
      value = value.toUpperCase();
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${baseURL}/api/entry/step-four/${rphCode}`, formData);
      alert("Final Step (Royalty Details) saved successfully! Thank you.");
      navigate("/thank-you");
    } catch (error) {
      console.error(error);
      alert("Error saving Royalty Details.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 my-10 bg-white shadow-md rounded-xl">
      <ProgressBar currentStep={4} />
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold mb-4 text-purple-600">
          Royalty Remuneration Details
        </h2>

        <div>
          <label>A/C Holder Name*</label>
          <input
            type="text"
            name="acHolderName"
            value={formData.acHolderName}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label>Bank Name*</label>
          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label>A/C No.*</label>
          <input
            type="text"
            name="acNumber"
            value={formData.acNumber}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label>IFSC Code*</label>
          <input
            type="text"
            name="ifscCode"
            value={formData.ifscCode}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label>Account Type*</label>
          <select
            name="accountType"
            value={formData.accountType}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="saving">Saving</option>
            <option value="current">Current</option>
          </select>
        </div>

        <div>
          <label>UPI ID</label>
          <input
            type="text"
            name="upiId"
            value={formData.upiId}
            onChange={handleChange}
            placeholder="Optional"
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label>Date</label>
          <input
            type="date"
            name="submittedDate"
            value={formData.submittedDate}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit Final Details
        </button>
      </form>
    </div>
  );
};

export default StepFourForm;
