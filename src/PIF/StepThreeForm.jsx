import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ProgressBar from "./ProgressBar";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const StepThreeForm = () => {
  const { rphCode } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    coverURL: "",
    backCoverText: "",
  });

  useEffect(() => {
    const fetchStepThreeData = async () => {
      try {
        const res = await axios.get(
          `${baseURL}/api/entry/entry-by-rph/${rphCode}`
        );
        const data = res.data;

        if (!data.authorName || !data.contactNo) {
          alert("Please complete Step 1 first.");
          navigate(`/step-one/${rphCode}`, { replace: true });
          return;
        }

        setFormData({
          coverURL: data.coverURL || "",
          backCoverText: data.backCoverText || "",
        });
      } catch (err) {
        console.error(err);
        navigate("/");
      }
    };

    if (rphCode) fetchStepThreeData();
  }, [rphCode, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${baseURL}/api/entry/step-three/${rphCode}`, formData);

      alert("Cover Details saved successfully!");
      navigate(`/step-four/${rphCode}`);
    } catch (error) {
      console.error(error);
      alert("Error saving Cover Details");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 my-10 bg-white shadow-md rounded-xl">
      <ProgressBar currentStep={3} />
      <h2 className="text-2xl font-semibold mb-4 text-purple-600">
        Cover Page & Manuscript Details
      </h2>

      <div className="bg-yellow-50 border border-yellow-300 text-sm text-gray-700 p-4 rounded-xl space-y-3 mb-6">
        <p>
          <strong>1. Premium Cover:</strong> Provide a Pixabay image URL.
        </p>
        <p>
          <strong>2. Advanced Cover:</strong> Provide Shutterstock image ID.
        </p>
        <p>
          <strong>3. Back Cover:</strong> No customization. Text should be
          150–200 words, image from Step 1 used. For Hindi books, use Kruti Dev
          010/Unicode from Word.
        </p>
        <h6 className="text-red-700 font-semibold">
          <strong>Important:</strong> Author Image, Co-Author Image, Cover Image Sample and Manuscript must be
          emailed to: 
        <br /> 
          📧{" "}
          <a
            href="mailto:books@rankpublishinghouse.online"
            className="underline text-blue-800"
          >
            books@rankpublishinghouse.online
          </a>
          <br />
          OR <br />
          📧{" "}
          <a
            href="mailto:rankpublishinghouse@gmail.com"
            className="underline text-blue-800"
          >
            rankpublishinghouse@gmail.com
          </a>
          </h6>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium">Cover Page URL</label>
          <input
            type="url"
            name="coverURL"
            value={formData.coverURL}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="e.g. https://pixabay.com/..."
          />
        </div>

        <div>
          <label className="block font-medium">Back Cover Text *</label>
          <textarea
            name="backCoverText"
            value={formData.backCoverText}
            onChange={handleChange}
            rows={5}
            required
            className="w-full border p-2 rounded"
          ></textarea>
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

export default StepThreeForm;
