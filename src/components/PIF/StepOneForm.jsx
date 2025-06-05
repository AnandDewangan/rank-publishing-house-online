import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ProgressBar from "./ProgressBar";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const StepOneForm = ({ initialData }) => {
  const { rphCode } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    rphCode: "",
    authorName: "",
    email: "",
    contactNo: "",
    packages: "",
    amount: "",
    coAuthorName: "",
    address: "",
    pincode: "",
    aboutAuthor: "",
  });

  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    const checkStepOneCompleted = async () => {
      try {
        const res = await axios.get(
          `${baseURL}/api/entry/entry-by-rph/${rphCode}`
        );
        const data = res.data;
        setFormData((prev) => ({
          ...prev,
          ...data,
          rphCode: data.rphCode || rphCode,
        }));

        if (!data.authorName || !data.contactNo) {
          alert("Please complete Step 1 first.");
          navigate(`/step-one/${rphCode}`, { replace: true });
        }
      } catch (err) {
        navigate("/");
      }
    };

    if (rphCode) checkStepOneCompleted();
  }, [rphCode, navigate]);

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (val) fd.append(key, val);
    });

    try {
      await axios.post(`${baseURL}/api/entry/step-one`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Author Details saved successfully!");
      navigate(`/step-two/${formData.rphCode}`);
    } catch (err) {
      console.error(err);
      alert("Error submitting Author Details");
    }
  };

  return (
    <div className="relative">
      {showInstructions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl max-w-xl w-full shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-purple-600">
              Important Instructions
            </h2>
            <div className="bg-yellow-50 border border-yellow-300 text-sm text-gray-700 p-4 rounded-xl space-y-3">
              <p>
                <strong>1. Premium Cover:</strong> Provide a Pixabay image URL.
              </p>
              <p>
                <strong>2. Advanced Cover:</strong> Provide Shutterstock image
                ID.
              </p>
              <p>
                <strong>3. Back Cover:</strong> No customization. Text should be
                150–200 words, image from Step 1 used. For Hindi books, use
                Kruti Dev 010/Unicode from Word.
              </p>
              <h6 className="text-red-700 font-semibold">
                <strong>Important:</strong> Author Image, Co-Author Image, Cover
                Image Sample and Manuscript must be emailed to:
                <br />
                📧{" "}
                <a
                  href="mailto:books@rankpublishinghouse.online"
                  className="underline text-blue-800"
                >
                  books@rankpublishinghouse.online
                </a>
              </h6>
            </div>
            <button
              onClick={() => setShowInstructions(false)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              I Understand
            </button>
          </div>
        </div>
      )}

      <div
        className={`max-w-4xl mx-auto p-6 my-10 bg-white shadow-md rounded-xl ${
          showInstructions ? "opacity-20 pointer-events-none" : ""
        }`}
      >
        <ProgressBar currentStep={1} />
        <h2 className="text-2xl font-semibold mb-4 text-purple-600">
          Author Details
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>RPH Code</label>
              <input
                type="text"
                value={formData.rphCode}
                disabled
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label>Author Name</label>
              <input
                name="authorName"
                value={formData.authorName}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label>Contact No *</label>
              <input
                name="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label>Packages</label>
              <input
                type="text"
                value={formData.packages}
                readOnly
                className="w-full border p-2 rounded bg-gray-100"
              />
            </div>
            <div>
              <label>Amount</label>
              <input
                type="text"
                value={formData.amount}
                readOnly
                className="w-full border p-2 rounded bg-gray-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label>Co-author Name</label>
              <input
                name="coAuthorName"
                value={formData.coAuthorName}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label>Pincode *</label>
              <input
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
            </div>
          </div>

          <div className="mt-4">
            <label>Full Address *</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows={2}
              className="w-full border p-2 rounded"
            ></textarea>
          </div>

          <div className="mt-4">
            <label>About Author (Max 250 words)</label>
            <textarea
              name="aboutAuthor"
              value={formData.aboutAuthor}
              onChange={(e) => {
                if (e.target.value.split(/\s+/).length <= 250) handleChange(e);
              }}
              required
              rows={4}
              className="w-full border p-2 rounded"
            ></textarea>
            <p className="text-sm text-gray-500 text-right">
              {formData.aboutAuthor.trim().split(/\s+/).length}/250 words
            </p>
          </div>

          <button
            type="submit"
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save & Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default StepOneForm;
