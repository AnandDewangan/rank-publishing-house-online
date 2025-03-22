import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "bootstrap-icons/font/bootstrap-icons.css";

const LeadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phonenumber: "",
      budget: "",
      manuscriptStatus: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phonenumber: Yup.string()
        .matches(/^[6-9]\d{9}$/, "Invalid phone number")
        .required("Phone number is required"),
      budget: Yup.string().required("Publishing budget is required"),
      manuscriptStatus: Yup.string().required("Manuscript status is required"),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      // Simulate form submission (Replace with actual API call)
      setTimeout(() => {
        console.log("Form Submitted:", values);
        window.location.href =
          "https://www.orangebooks.in/thankyou?utm_source=web&utm_medium=main_lead_form&utm_campaign=home_header";
      }, 2000);
    },
  });

  return (
    <div className="rounded-4 shadow bg-white py-4 px-4">
      <div className="form-widget">
        <h6 className="text-center mb-3">Sign Up For <b>Free Consultation</b></h6>
        
        <form onSubmit={formik.handleSubmit} className="row position-relative gap-3">
          {/* Name */}
          <div className="col-sm-12 input-group form-group">
            <div className="input-group-prepend">
              <span className="input-group-text bg-transparent">
                <i className="bi bi-person"></i>
              </span>
            </div>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Your Full Name"
              {...formik.getFieldProps("name")}
            />
          </div>

          {/* Email */}
          <div className="col-sm-12 input-group form-group">
            <div className="input-group-prepend">
              <span className="input-group-text bg-transparent">
                <i className="bi bi-envelope"></i>
              </span>
            </div>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Your Email"
              {...formik.getFieldProps("email")}
            />
          </div>

          {/* Phone Number */}
          <div className="col-sm-12 input-group form-group">
            <div className="input-group-prepend">
              <span className="input-group-text bg-transparent">
                <i className="bi bi-telephone"></i>
              </span>
            </div>
            <input
              type="tel"
              name="phonenumber"
              className="form-control"
              placeholder="Your Phone Number"
              {...formik.getFieldProps("phonenumber")}
            />
          </div>

          {/* Publishing Budget */}
          <div className="col-sm-12 input-group form-group">
            <div className="input-group-prepend">
              <span className="input-group-text bg-transparent">
                <i className="bi bi-currency-rupee"></i>
              </span>
            </div>
            <select
              name="budget"
              className="form-control"
              {...formik.getFieldProps("budget")}
            >
              <option value="">Your Publishing Budget</option>
              <option value="Rs. 8000 - Rs. 10000">Rs. 8000 - Rs. 10000</option>
              <option value="Rs. 14,000 - Rs. 15,000">Rs. 14,000 - Rs. 15,000</option>
              <option value="Rs. 20,000 - Rs. 25,000">Rs. 20,000 - Rs. 25,000</option>
              <option value="Rs. 30,000 - Rs. 40,000">Rs. 30,000 - Rs. 40,000</option>
              <option value="Above Rs. 50,000">Above Rs. 50,000</option>
            </select>
          </div>

          {/* Manuscript Status */}
          <div className="col-sm-12 input-group form-group">
            <div className="input-group-prepend">
              <span className="input-group-text bg-transparent">
                <i className="bi bi-journal"></i>
              </span>
            </div>
            <select
              name="manuscriptStatus"
              className="form-control"
              {...formik.getFieldProps("manuscriptStatus")}
            >
              <option value="">Your Manuscript Status</option>
              <option value="Want to start the process today.">Want to start the process today.</option>
              <option value="Want to start the process within a week.">Want to start the process within a week.</option>
              <option value="It will take a month to get ready.">It will take a month to get ready.</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="col-12">
            <button
              type="submit"
              className="btn custom-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Sign Up For Free Consultation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadForm;
