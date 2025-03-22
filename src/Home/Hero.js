import React from "react";
import { motion } from "framer-motion";
import "bootstrap-icons/font/bootstrap-icons.css"; // Bootstrap Icons

const Hero = () => {
  const avatars = [
    "images/avatar/portrait-beautiful-young-woman-standing-grey-wall.jpg",
    "images/avatar/portrait-young-redhead-bearded-male.jpg",
    "images/avatar/pretty-blonde-woman.jpg",
    "images/avatar/studio-portrait-emotional-happy-funny-smiling-boyfriend.jpg",
  ];

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
              {/* Rank Publication House - Animated */}
              <motion.h5
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-warning"
              >
                Rank Publication House
              </motion.h5>

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
              <a href="tel:+919876543210" className="btn custom-btn smoothscroll me-3">
                <i className="bi bi-telephone-fill"></i> Call Now
              </a>

              {/* Email Us Button */}
              <a href="mailto:info@rankpublication.com" className="btn btn-outline-light smoothscroll">
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
              <div className="avatar-group d-flex flex-wrap align-items-center">
                {avatars.map((src, index) => (
                  <motion.img
                    key={index}
                    src={src}
                    className={`img-fluid avatar-image ${index !== 0 ? "avatar-image-left" : ""}`}
                    alt={`Avatar ${index + 1}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                  />
                ))}

                {/* Star Ratings */}
                <div className="reviews-group mt-3 mt-lg-0">
                  <strong>4.5</strong>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star"></i>
                  <small className="ms-3">2,564 reviews</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
