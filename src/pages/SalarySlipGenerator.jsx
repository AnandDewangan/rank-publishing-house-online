import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "./rank-logo.png"; // Make sure the logo file exists
import { BiArrowBack } from "react-icons/bi";

const SalarySlipGenerator = () => {
  const currentMonthName = new Date().toLocaleString("default", {
    month: "long",
  });
  const currentYear = new Date().getFullYear();

  const employees = [
    {
      name: "Anand Dewangan",
      id: "RANK2501",
      designation: "Software Developer",
      department: "IT",
    },
    {
      name: "Rakesh Sahu",
      id: "RANK2502",
      designation: "Project Manager & Book Interior Designer",
      department: "Project Management / Publishing / Design",
    },
    {
      name: "Lileshwari Verma",
      id: "RANK2503",
      designation: "Sales Executive & Distribution",
      department: "Sales & Distribution",
    },
    {
      name: "Koitoor Kalap",
      id: "RANK2504",
      designation: "Graphic & Motion Designer",
      department: "Creative / Design",
    },
  ];

  const [form, setForm] = useState({
    employeeName: "",
    employeeId: "",
    designation: "",
    department: "",
    month: currentMonthName,
    year: currentYear,
    basic: "",
    hra: "",
    allowances: "",
    deductions: "",
    leaveDays: "",
  });

  const handleEmployeeChange = (e) => {
    const selectedId = e.target.value;
    const emp = employees.find((emp) => emp.id === selectedId);
    if (emp) {
      setForm((prev) => ({
        ...prev,
        employeeName: emp.name,
        employeeId: emp.id,
        designation: emp.designation,
        department: emp.department,
      }));
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generatePDF = () => {
    const {
      employeeName,
      employeeId,
      designation,
      department,
      month,
      year,
      basic,
      hra,
      allowances,
      deductions,
      leaveDays,
    } = form;

    const basicNum = Number(basic);
    const adjustedBasic = ((basicNum / 30) * (30 - Number(leaveDays))).toFixed(
      2
    );
    const net =
      Number(adjustedBasic) +
      Number(hra) +
      Number(allowances) -
      Number(deductions);

    const doc = new jsPDF();
    const company = {
      name: "Rank Publishing House",
      address: "Bahartarai Chowk, Sarkanda, Bilaspur(Chhattisgarh), 495006",
    };

    // Header
    doc.addImage(logo, "PNG", 150, 10, 40, 15);
    doc.setFontSize(16);
    doc.text(company.name, 14, 20);
    doc.setFontSize(11);
    doc.text(company.address, 14, 26);
    doc.line(14, 30, 195, 30);

    doc.setFontSize(14);
    doc.text(`Salary Slip - ${month} ${year}`, 14, 40);

    // Employee info
    autoTable(doc, {
      startY: 45,
      head: [["Employee Name", "Employee ID", "Designation", "Department"]],
      body: [[employeeName, employeeId, designation, department]],
    });

    // Salary breakdown
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Component", "Amount (₹)"]],
      body: [
        ["Adjusted Basic Salary", adjustedBasic],
        ["HRA", hra],
        ["Allowances", allowances],
        ["Deductions", `- ${deductions}`],
        ["Leave Days (Unpaid)", leaveDays],
        ["Net Pay", `${net.toFixed(2)}`],
      ],
    });

    doc.setFontSize(10);
    doc.text(
      "Note: Adjusted Basic Salary is calculated based on leaves taken.",
      14,
      doc.lastAutoTable.finalY + 10
    );
    doc.save(`SalarySlip-${employeeName}-${month}-${year}.pdf`);
  };

  return (
    <main className="main-wrapper">
      <div className="main-content container-fluid">
        {/* Top Bar */}
        <div className="page-breadcrumb d-sm-flex align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-center">
            <div className="breadcrumb-title pe-3 text-uppercase">
              Salary Slip
            </div>
          </div>
          <button
            className="btn btn-danger rounded-circle"
            onClick={() => window.history.back()}
          >
            <BiArrowBack />
          </button>
        </div>
        <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Employee Dropdown */}
            <div>
              <label className="block text-sm font-medium">Employee</label>
              <select
                name="employeeId"
                value={form.employeeId}
                onChange={handleEmployeeChange}
                className="w-full border px-3 py-2 rounded mt-1"
              >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} ({emp.id})
                  </option>
                ))}
              </select>
            </div>

            {/* Month Dropdown */}
            <div>
              <label className="block text-sm font-medium">Month</label>
              <select
                name="month"
                value={form.month}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded mt-1"
              >
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Field */}
            <div>
              <label className="block text-sm font-medium">Year</label>
              <input
                type="number"
                name="year"
                value={form.year}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded mt-1"
              />
            </div>

            {/* Other Input Fields */}
            {[
              { label: "Basic Salary (Monthly)", name: "basic" },
              { label: "HRA", name: "hra" },
              { label: "Allowances", name: "allowances" },
              { label: "Deductions", name: "deductions" },
              { label: "Leave Days (Unpaid)", name: "leaveDays" },
            ].map(({ label, name }) => (
              <div key={name}>
                <label className="block text-sm font-medium">{label}</label>
                <input
                  type="number"
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded mt-1"
                />
              </div>
            ))}
          </div>

          <button
            onClick={generatePDF}
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Generate Salary Slip PDF
          </button>
        </div>
      </div>
    </main>
  );
};

export default SalarySlipGenerator;
