import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const HeroSection = () => {
  return (
    <div className="section pt-5 bg-white my-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Content */}
          <div className="col-md-8 text-center text-md-start">
            <h2 className="fs-2 text-danger">
              Still Confused?
              <br />
              Here's How to Publish Your Book Easily!
            </h2>
            <h6 className="mt-3 text-muted">
              <strong>Rank Publishing House</strong> gives you the power,
              freedom, and guidance to turn your ideas into a bestselling book.
              We provide full support from start to finish — editing, designing,
              printing, and distribution — all at the most affordable price in
              India.
              <br />
              <br />
              Whether you're a new author or experienced writer, we ensure your
              publishing journey is smooth, fast, and rewarding. Publish
              globally, earn <strong>100% of the profit</strong>, and get{" "}
              <strong>lifetime author support</strong> from our expert team.
            </h6>
            <a href="tel:+919171242297" className="btn custom-btn mt-3">
              📞 Publish Your Book Now
            </a>
          </div>

          {/* Right Image */}
          <div className="col-md-4 d-flex justify-content-center p-4">
            <img
              src="/images/publish/confused.png"
              alt="Confused about publishing a book"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
