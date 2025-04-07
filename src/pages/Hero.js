import React from "react";
import { motion } from "framer-motion";
import "bootstrap-icons/font/bootstrap-icons.css"; // Bootstrap Icons

const Hero = () => { 
  return (
    <>
      {/* Hero Section */}
      <section
        className="hero-section d-flex justify-content-center align-items-center"
        id="section_1"
        style={{ backgroundImage: "url('/images/businessman-sitting-by-table-cafe.jpg')" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-12 mb-5 pb-5 pb-lg-0 mb-lg-0"> 
              {/* India’s Fastest Growing Self-Publishing Company */}
              <motion.h1
                className="text-white mb-4"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                India’s Fastest Growing <br /> Self-Publishing Company
              </motion.h1>

              {/* Call Now Button */}
              <a href="tel:+919171242297" className="btn custom-btn smoothscroll me-3">
                <i className="bi bi-telephone-fill"></i> Call Now
              </a>

              {/* Email Us Button */}
              <a href="mailto:books@rankpublishinghouse.online" className="btn btn-outline-light smoothscroll">
                <i className="bi bi-envelope-fill"></i> Email Us
              </a>
            </div>

            {/* Hero Image */}
            <div className="hero-image-wrap col-lg-6 col-12 mt-3 mt-lg-0">
              <motion.img
                src="/images/education-online-books.png"
                className="hero-image img-fluid"
                alt="education online books"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="featured-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-12">
                {/* Rank Publication House - Animated */}
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-warning"
              >
                R<span className="text-danger">A</span>NK PUBLICATION HOUSE
              </motion.h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
