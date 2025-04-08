import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const LeadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phonenumber.value.trim();
    const budget = form.budget.value;
    const manuscript = form.manuscriptStatus.value;

    // WhatsApp Message
    const message = `Hello, I'm interested in a free consultation.%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Phone:* ${phone}%0A*Publishing Budget:* ${budget}%0A*Manuscript Status:* ${manuscript}`;

    const whatsappURL = `https://wa.me/9171242297?text=${message}`;

    // Open WhatsApp
    window.open(whatsappURL, "_blank");

    setIsSubmitting(false);
  };

  return (
    <div className="rounded-4 shadow bg-white py-4 px-4">
      <div className="form-widget">
        <h6 className="text-center mb-3 text-danger">
          Sign Up For <b>Free Consultation</b>
        </h6>

        <form className="row position-relative gap-3" onSubmit={handleSubmit}>
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
              required
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
              required
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
              required
            />
          </div>

          {/* Publishing Budget */}
          <div className="col-sm-12 input-group form-group">
            <div className="input-group-prepend">
              <span className="input-group-text bg-transparent">
                <i className="bi bi-currency-rupee"></i>
              </span>
            </div>
            <select name="budget" className="form-control" required>
              <option value="">Your Publishing Budget</option>
              <option value="Rs. 3000 - Rs. 5000">Rs. 3000 - Rs. 5000</option>
              <option value="Rs. 5,000 - Rs. 10,000">Rs. 5,000 - Rs. 10,000</option>
              <option value="Rs. 10,000 - Rs. 15,000">Rs. 10,000 - Rs. 15,000</option>
              <option value="Rs. 15,000 - Rs. 25,000">Rs. 15,000 - Rs. 25,000</option>
              <option value="Above Rs. 25,000">Above Rs. 25,000</option>
            </select>
          </div>

          {/* Manuscript Status */}
          <div className="col-sm-12 input-group form-group">
            <div className="input-group-prepend">
              <span className="input-group-text bg-transparent">
                <i className="bi bi-journal"></i>
              </span>
            </div>
            <select name="manuscriptStatus" className="form-control" required>
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
