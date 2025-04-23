import React from "react";
import { motion } from "framer-motion";
import "bootstrap-icons/font/bootstrap-icons.css";
import Slider from "react-slick"; // make sure this is imported
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = () => {
  const heroSliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    fade: true, // optional: for crossfade effect instead of sliding
  };

  const books = [
    {
      img: "/images/cover/cover12.jpg",
      title: "Serial Killer Sulgati Rakh, Praveen Pamal",
    },
    {
      img: "/images/cover/cover11.jpg",
      title: "Vimuktnama, Dr. B.P. Chavhan",
    },
    {
      img: "/images/cover/cover10.jpg",
      title: "Bhukha Hindusthan, Jivan Kumar",
    },
    {
      img: "/images/cover/Cover9.jpg",
      title: "Jivan ko sahi disha me jeene ki raah, Harish Kumar",
    },
    {
      img: "/images/cover/cover8.jpg",
      title: "Known to Unknown by Subhadeep Ghosh",
    },
    {
      img: "/images/cover/cover7.jpg",
      title: "Natural Vision by Subhadeep Ghosh",
    },
    {
      img: "/images/cover/cover6.jpg",
      title: "Bhramjal by Dr. Kamlesh Kumar",
    },
    {
      img: "/images/cover/Cover5.jpg",
      title: "Saagara Raagamu",
    },
    {
      img: "/images/cover/Cover4.jpg",
      title: "The Cooking God in You",
    },
    {
      img: "/images/cover/Cover3.jpg",
      title: "Samkalin Hindi Sahitya",
    },
    {
      img: "/images/cover/Cover2.jpg",
      title: "Eternally Imperfect",
    },
    {
      img: "/images/cover/Cover1.jpg",
      title: "Beauty Sleep",
    },
  ];

  return (
    <>
      {/* Hero Section */}
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
              <a
                href="tel:+919171242297"
                className="btn custom-btn smoothscroll me-3"
              >
                <i className="bi bi-telephone-fill"></i> Call Now
              </a>

              {/* Email Us Button */}
              <a
                href="mailto:books@rankpublishinghouse.online"
                className="btn btn-outline-light smoothscroll"
              >
                <i className="bi bi-envelope-fill"></i> Email Us
              </a>
            </div>

            {/* Hero Image */}
            <div className="hero-image-wrap col-lg-6 col-12 mt-3 mt-lg-0">
              <Slider {...heroSliderSettings}>
                {books.map((book, index) => (
                  <div key={index} className="text-center">
                    <motion.img
                      src={book.img}
                      alt={book.title}
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

      {/* Featured Section */}
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
