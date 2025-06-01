import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const StepTwoForm = () => {
  const { rphCode } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    language: "",
    paperColor: "",
    lamination: "",
    bookSize: "",
    bookCategory: "",
    noOfPages: "",
  });

  useEffect(() => {
    const fetchStepTwoData = async () => {
      try {
        const res = await axios.get(
          `${baseURL}/api/entry/entry-by-rph/${rphCode}`
        );
        const data = res.data;

        // Optional: Redirect if Step 1 is not filled
        if (!data.authorName || !data.contactNo) {
          alert("Please complete Step 2 first.");
          navigate(`/step-one/${rphCode}`, { replace: true });
          return;
        }

        // Pre-fill Step 2 fields if available
        setFormData((prev) => ({
          ...prev,
          title: data.title || "",
          subTitle: data.subTitle || "",
          language: data.language || "",
          paperColor: data.paperColor || "",
          lamination: data.lamination || "",
          bookSize: data.bookSize || "",
          bookCategory: data.bookCategory || "",
          noOfPages: data.noOfPages || "",
        }));
      } catch (err) {
        console.error(err);
        navigate("/");
      }
    };

    if (rphCode) fetchStepTwoData();
  }, [rphCode, navigate]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${baseURL}/api/entry/step-two/${rphCode}`, formData);

      alert("Book Details saved successfully!");
      navigate(`/step-three/${rphCode}`);
    } catch (error) {
      alert("Error submitting Book Details");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 my-10 bg-white shadow-md rounded-xl">
      <ProgressBar currentStep={2} />
      <h2 className="text-2xl font-semibold mb-4 text-purple-600">Basic Book Details</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title *</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Sub Title</label>
          <input
            name="subTitle"
            value={formData.subTitle}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Language *</label>
          <input
            name="language"
            value={formData.language}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Paper Color *</label>
          <select
            name="paperColor"
            value={formData.paperColor}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select</option>
            <option value="Cream">Cream</option>
            <option value="White">White</option>
            <option value="Colorful">Colorful</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Laminations *</label>
          <select
            name="lamination"
            value={formData.lamination}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select</option>
            <option value="Glossy">Glossy</option>
            <option value="Mate">Mate</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Book Size *</label>
          <select
            name="bookSize"
            value={formData.bookSize}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select</option>
            <option value="5x8">5 x 8</option>
            <option value="6x9">6 x 9</option>
            <option value="8x11">8 x 11</option>
          </select>
        </div>
        <div>
          <label>Book Category *</label>
          <select
            name="bookCategory"
            value={formData.bookCategory}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select</option>
            {[
              "Fiction",
              "Non-Fiction",
              "General",
              "Education",
              "Biography",
              "Academic",
              "Poetry",
              "Science",
              "History",
              "Comics",
              "Social",
              "Other",
            ].map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium">No of Pages *</label>
          <input
            name="noOfPages"
            value={formData.noOfPages}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save & Continue
        </button>
      </form>
    </div>
  );
};

export default StepTwoForm;
