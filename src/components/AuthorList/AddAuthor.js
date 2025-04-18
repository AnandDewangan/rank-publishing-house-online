import React, { useState } from "react";
import { BiHome, BiShow, BiHide, BiArrowBack } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddAuthor = () => {
  const [formData, setFormData] = useState({
    sku: "",
    isbn: "",
    image_path: null,
    name: "",
    email: "",
    password: generatePassword(8),
    contact_no: "",
    first_book_name: "",
    account_number: "",
    account_holder_name: "",
    bank_name: "",
    ifsc_code: "",
    account_type: "",
    upi_id: "",
    bio: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const handleFileChange = (e) => {
    setFormData({ ...formData, image_path: e.target.files[0] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactRegex = /^[6-9]\d{9}$/;
    const accountNumberRegex = /^\d{9,18}$/;
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    // const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
    const isbnRegex = /^[0-9]{13}$/;

    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (!contactRegex.test(formData.contact_no)) {
      toast.error("Invalid contact number");
      return false;
    }
    if (!accountNumberRegex.test(formData.account_number)) {
      toast.error("Invalid account number");
      return false;
    }
    if (!ifscRegex.test(formData.ifsc_code)) {
      toast.error("❌ Invalid IFSC code");
      return false;
    }
    // if (!upiRegex.test(formData.upi_id)) {
    //   toast.error("Invalid UPI ID");
    //   return false;
    // }
    if (!isbnRegex.test(formData.isbn)) {
      toast.error("Invalid ISBN! It should be exactly 13 digits.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);

    const formPayload = new FormData();
Object.keys(formData).forEach((key) => {
  // Only append the image file if it exists
  if (key === "image_path" && formData[key]) {
    formPayload.append("image_path", formData[key]);
  } else if (key !== "image_path") {
    formPayload.append(key, formData[key]);
  }
});


    try {
      const res = await fetch(`${baseURL}/api/authors/add`, {
        method: "POST",
        body: formPayload,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Something went wrong"); 

      toast.success("Author added successfully!");
      navigate("/author-list");

      setFormData({
        sku: "",
        isbn: "",
        image_path: null,
        name: "",
        email: "",
        password: generatePassword(8),
        contact_no: "",
        first_book_name: "",
        account_number: "",
        account_holder_name: "",
        bank_name: "",
        ifsc_code: "",
        account_type: "",
        upi_id: "",
        bio: "",
      });
    } catch (err) {
      toast.error(`${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  function generatePassword(length) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    return password;
  }

  return (
    <main className="main-wrapper">
      <div className="main-content">
        <ToastContainer />
        <div className="d-flex justify-content-between mb-3">
          {/* Left Side: Author List & Home */}
          <div className="d-flex align-items-center">
            <div className="breadcrumb-title pe-3 text-uppercase">
              Add Author
            </div>
            <nav aria-label="breadcrumb" className="ps-3">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <i className="bx bx-home-alt"></i>
                  <BiHome />
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  <a href="/admin-dashboard" className="text-decoration-none fw-semibold">
                    Home
                  </a>
                </li>
              </ol>
            </nav>
          </div>

          {/* Right Side: Search & Back Button */}
          <button
            className="btn btn-danger rounded-circle"
            onClick={() => window.history.back()}
          >
            <BiArrowBack />
          </button>
        </div>
        <div className="container">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row">
              <div className="col-md-6 my-2">
                <input
                  type="text"
                  name="sku"
                  className="form-control"
                  placeholder="SKU"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 my-2">
                <input
                  type="number"
                  name="isbn"
                  className="form-control"
                  placeholder="ISBN"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 my-2">
                <input
                  type="file"
                  name="image_path"
                  className="form-control"
                  placeholder="Profile Image"
                  onChange={handleFileChange}
                />
              </div>
              <div className="col-md-6 my-2">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 my-2">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 my-2">
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    value={formData.password}
                    readOnly
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <BiHide /> : <BiShow />}
                  </button>
                </div>
              </div>
              <div className="col-md-6 my-2">
                <input
                  type="text"
                  name="contact_no"
                  className="form-control"
                  placeholder="Contact No"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 my-2">
                <input
                  type="text"
                  name="first_book_name"
                  className="form-control"
                  placeholder="First Book Name"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <hr />
            <h5 className="text-primary">Bank Details</h5>
            <div className="row">
              <div className="col-md-6 my-2">
                <input
                  type="number"
                  name="account_number"
                  className="form-control"
                  placeholder="AC Number"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 my-2">
                <input
                  type="text"
                  name="account_holder_name"
                  className="form-control"
                  placeholder="AC Holder Name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 my-2">
                <input
                  type="text"
                  name="bank_name"
                  className="form-control"
                  placeholder="Bank Name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 my-2">
                <input
                  type="text"
                  name="ifsc_code"
                  className="form-control"
                  placeholder="IFSC Code"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 my-2">
                <select
                  name="account_type"
                  className="form-control"
                  onChange={handleChange}
                  value={formData.account_type}
                  required
                >
                  <option value="">----------Select-------------</option>
                  <option value="Saving">Saving</option>
                  <option value="Current">Current</option>
                </select>
              </div>
              <div className="col-md-6 my-2">
                <input
                  type="text"
                  name="upi_id"
                  className="form-control"
                  placeholder="UPI ID"
                  onChange={handleChange}
                />
              </div>
            </div>

            <hr />
            <div className="col-md-12">
              <input
                type="text"
                name="bio"
                className="form-control"
                placeholder="About Author"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-12 my-3">
              <button
                type="submit"
                className="btn btn-success px-5 w-100"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddAuthor;
