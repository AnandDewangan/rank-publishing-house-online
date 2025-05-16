import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "bootstrap-icons/font/bootstrap-icons.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
const baseURL = process.env.REACT_APP_API_BASE_URL;

const Hero = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(
          `${baseURL}/api/images/cover-images`
        );
        setImages(res.data);
      } catch (err) {
        console.error("Failed to fetch images", err);
      }
    };

    fetchImages();
  }, []);

  const heroSliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    fade: true,
  };

  return (
    <>
      <section
        className="hero-section d-flex justify-content-center align-items-center"
        id="section_1"
        style={{
          backgroundImage:
            "url('/images/businessman-sitting-by-table-cafe.jpg')",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-12 mb-5 pb-5 pb-lg-0 mb-lg-0">
              <motion.h1
                className="text-white mb-4"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                India’s Fastest Growing <br /> Self-Publishing Company
              </motion.h1>

              <a
                href="tel:+919171242297"
                className="btn custom-btn smoothscroll me-3"
              >
                <i className="bi bi-telephone-fill"></i> Call Now
              </a>

              <a
                href="mailto:books@rankpublishinghouse.online"
                className="btn btn-outline-light smoothscroll"
              >
                <i className="bi bi-envelope-fill"></i> Email Us
              </a>
            </div>

            <div className="hero-image-wrap col-lg-6 col-12 mt-3 mt-lg-0">
              <Slider {...heroSliderSettings}>
                {images.map((img, index) => (
                  <div key={index} className="text-center">
                    <motion.img
                      src={img}
                      alt={`Book ${index + 1}`}
                      className="hero-image img-fluid rounded"
                      style={{
                        height: "100%",
                        width: "450px",
                        objectFit: "contain",
                        boxShadow: "-6px 6px 10px black",
                        borderRadius: "50px",
                      }}
                      initial={{ opacity: 0.5, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-12">
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                style={{ color: "#FFFF00" }}
              >
                R<span className="text-danger">A</span>NK PUBLISHING HOUSE
              </motion.h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
