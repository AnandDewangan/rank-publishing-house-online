import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Invoice = React.forwardRef(({ formData, selectedPackage, invoiceNo, dateTime }, ref) => (
  <div ref={ref} className="p-6 border rounded text-sm" style={{ width: "600px" }}>
    <div className="mb-4">
      <h2 className="text-xl font-bold">Rank Publishing House</h2>
      <p>Bahartarai Chowk, Sarkanda<br />Bilaspur (Chhattisgarh) 495001</p>
      <p>Mobile: 9171242297</p>
      <p>Email: books@rankpublishinghouse.online</p>
      <p>Website: www.rankpublishinghouse.online</p>
    </div>

    <div className="mb-2">
      <p><strong>Invoice No:</strong> {invoiceNo}</p>
      <p><strong>Date:</strong> {dateTime}</p>
    </div>

    <hr className="my-4" />
    <h3 className="text-lg font-semibold">Author Details</h3>
    <p><strong>Name:</strong> {formData.name}</p>
    <p><strong>Address:</strong> {formData.address}</p>
    <p><strong>Mobile:</strong> {formData.mobile}</p>

    <hr className="my-4" />

    <h3 className="text-lg font-semibold">Package Details</h3>
    <p><strong>Package Name:</strong> {selectedPackage.name}</p>
    <p><strong>Amount:</strong> ₹{formData.amount || "___"}</p>
    <p><strong>GST:</strong>  22ERBPK3704F1ZC</p>

    <p className="mt-6 italic text-gray-600">
      This is an automated invoice. No signature required.
    </p>
  </div>
));

export default function InvoiceForm() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    mobile: "",
    amount: "",
    package: "classic",
  });

  const generateInvoiceNo = () => "INV-" + Date.now();
  const getDateTime = () => new Date().toLocaleString();

  const [invoiceNo] = useState(generateInvoiceNo());
  const [dateTime] = useState(getDateTime());

  const packages = {
    classic: { name: "Classic" },
    supreme: { name: "Supreme"},
    platinum: { name: "Platinum"},
  };

  const selectedPackage = packages[formData.package];
  const invoiceRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDownloadPDF = () => {
    const input = invoiceRef.current;
    if (!input) return;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`${invoiceNo}.pdf`);
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Input Form */}
      <div className="grid grid-cols-2 gap-4">
        <input name="name" placeholder="Name" className="border p-2" onChange={handleChange} />
        <input name="address" placeholder="Address" className="border p-2" onChange={handleChange} />
        <input name="mobile" placeholder="Mobile No." className="border p-2" onChange={handleChange} />
        <input name="amount" placeholder="Amount (₹)" className="border p-2" onChange={handleChange} />
        <select name="package" className="border p-2" value={formData.package} onChange={handleChange}>
          <option value="classic">Classic</option>
          <option value="supreme">Supreme</option>
          <option value="platinum">Platinum</option>
        </select>
      </div>

      {/* Download PDF Button */}
      <button
        onClick={handleDownloadPDF}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Download Invoice PDF
      </button>

      {/* Invoice Preview */}
      <Invoice
        ref={invoiceRef}
        formData={formData}
        selectedPackage={selectedPackage}
        invoiceNo={invoiceNo}
        dateTime={dateTime}
      />
    </div>
  );
}
