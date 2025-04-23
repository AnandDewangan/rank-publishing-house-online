import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  BiArrowBack,
  BiEdit,
  BiSave,
  BiX,
  BiShow,
  BiHide,
} from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AuthorProfile.css";
import BoyImg from "../../images/avatars/01.png";

const AuthorProfile = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const userRole = localStorage.getItem("userRole"); 
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${baseURL}/api/authors/${id}`)
      .then((res) => {
        setAuthor(res.data);
        setFormData(res.data);
      })
      .catch(() => toast.error("Error fetching author details!"));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setSelectedImage(URL.createObjectURL(file)); 
      setFormData({ ...formData, image_path: file }); 
    }
  };

  const handleSave = () => {
  const updateData = new FormData();

  Object.entries(formData).forEach(([key, value]) => {
    if (key !== "image_path") {
      updateData.append(key, value);
    }
  });

  if (selectedFile) {
    updateData.append("image_path", selectedFile);
  }

  axios
    .put(`${baseURL}/api/authors/${id}`, updateData) // ✅ No headers here
    .then(() => {
      setAuthor({
        ...formData,
        image_path: selectedImage
          ? URL.createObjectURL(selectedImage)
          : author.image_path,
      });
      setEditMode(false);
      toast.success("Author updated successfully!");
    })
    .catch((err) => {
      console.error("Error updating:", err);
      toast.error("Error updating author details");
    });
};



  if (!author) return <h2>Loading author details...</h2>;

  return (
    <main className="main-wrapper">
      <ToastContainer />
      <div className="main-content">
        <div className="page-breadcrumb d-none d-sm-flex align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-center">
            <div className="breadcrumb-title pe-3 text-uppercase">
              Author Profile
            </div>
            <nav aria-label="breadcrumb" className="ps-3">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <Link to="/admin-dashboard" className="text-decoration-none fw-semibold">
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

        {/* 🔹 Flip Card */}
        <div className={`flip-card ${editMode ? "flipped" : ""}`}>
          <div className="flip-card-inner">
            {/* 🔹 Front (Profile View) */}
            <div className="flip-card-front">
              <div className="card p-3">
                <div className="row align-items-center">
                  <div className="col-md-3">
                    <img
                      src={
                        author.image_path
                          ? `${baseURL}/uploads/${author.image_path}`
                          : BoyImg
                      }
                      alt="Profile"
                      className="rounded-circle mx-auto"
                      width="100"
                      height="100"
                    />
                  </div>
                  <div className="col-md-9">
                    <h4 className="mt-3">{author.name}</h4>
                  </div>
                </div>
                <hr />
                <div className="row">
                  {/* Left Column: Labels */}
                  <div className="col-3 fw-bold">
                    <p>Email</p>
                    <p>Mobile</p>
                    <p>Book</p>
                    <p>Pass</p>
                    <p>Account</p>
                    <p>Bank</p>
                    <p>IFSC Code</p>
                    <p>UPI ID</p>
                  </div>

                  {/* Right Column: Values */}
                  <div className="col-9 text-end">
                    <p>
                      <a href={`mailto:${author.email}`}>{author.email}</a>
                    </p>
                    <p>
                      <a href={`tel:${author.contact_no}`}>
                        {author.contact_no}
                      </a>
                    </p>
                    <p>{author.first_book_name}</p>
                    <p>{author.password}</p>
                    <p>{author.account_number}</p>
                    <p>
                      {author.bank_name} ({author.account_type})
                    </p>
                    <p>{author.ifsc_code}</p>
                    <p>{author.upi_id}</p>
                  </div>
                </div>

                {/* Bio - Full Width */}
                <div className="row mt-3">
                  <h5 className="text-center">Description</h5>
                  <div className="col-12">
                    <p>{author.bio}</p>
                  </div>
                </div>

                <button className="btn edit" onClick={() => setEditMode(true)}>
                  <BiEdit className="text-warning fs-3" />
                </button>
              </div>
            </div>

            {/* 🔹 Back (Edit Form) */}
            <div className="flip-card-back">
              <div className="card text-center p-3">
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => setEditMode(false)}
                  >
                    <BiX className="fs-5" />
                  </button>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={handleSave}
                  >
                    <BiSave className="fs-5" />
                  </button>
                </div>
                {/* Image Upload */}
                <div className="image-upload-container mb-2">
                  <label htmlFor="imageUpload" className="image-upload-label">
                    <img
                      src={
                        selectedImage ||
                        `${baseURL}/uploads/${author.image_path}`
                      }
                      alt="Change Profile"
                      className="image-preview mt-2"
                    />
                  </label>
                  <input
                    type="file"
                    id="imageUpload"
                    name="image_path"
                    accept="image/*"
                    className="d-none"
                    onChange={handleImageChange}
                  />
                </div>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control mb-2"
                  placeholder="Name"
                />
                {userRole === "admin" && (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control mb-2"
                  placeholder="Email"
                />
                )}
                <div className="position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control mb-2 pe-5"
                    placeholder="Password"
                  />

                  <button
                    type="button"
                    className="btn position-absolute end-0 top-50 translate-middle-y me-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <BiHide size={20} /> : <BiShow size={20} />}
                  </button>
                </div>
                <input
                  type="text"
                  name="contact_no"
                  value={formData.contact_no}
                  onChange={handleChange}
                  className="form-control mb-2"
                  placeholder="Contact"
                />
                {userRole === "admin" && (
                <input
                  type="text"
                  name="first_book_name"
                  value={formData.first_book_name}
                  onChange={handleChange}
                  className="form-control mb-2"
                  placeholder="First Book"
                />
                )}
                <input
                  type="text"
                  name="account_number"
                  value={formData.account_number}
                  onChange={handleChange}
                  className="form-control mb-2"
                  placeholder="Account Number"
                />
                <input
                  type="text"
                  name="bank_name"
                  value={formData.bank_name}
                  onChange={handleChange}
                  className="form-control mb-2"
                  placeholder="Bank Name"
                />
                <input
                  type="text"
                  name="ifsc_code"
                  value={formData.ifsc_code}
                  onChange={handleChange}
                  className="form-control mb-2"
                  placeholder="IFSC Code"
                />
                <input
                  type="text"
                  name="upi_id"
                  value={formData.upi_id}
                  onChange={handleChange}
                  className="form-control mb-2"
                  placeholder="UPI ID"
                />
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="form-control mb-2"
                  placeholder="Bio"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthorProfile;
