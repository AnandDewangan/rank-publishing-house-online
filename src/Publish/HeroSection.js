import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const HeroSection = () => {
  return (
    <div className="section pt-5 bg-white my-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Content */}
          <div className="col-md-8 text-center text-md-start">
            <h2 className="fs-2 text-danger">Still Confused<br />How To Publish a Book?</h2>
            <h6 className="mt-3 text-muted">
              Rank Publishing House provides you the platform, independence, and flexibility to create and share what you love and feel with the entire world through book publishing. With our team of experts, we’ll guide you on how to publish a book and sell globally, earning 100% of the profit.
            </h6>
            <a href="tel: +918963906336" className="btn custom-btn mt-3">
              Publish Book Now
            </a>
          </div>
          {/* Right Image */}
          <div className="col-md-4 d-flex justify-content-center p-4">
            <img src="/images/publish/confused.png" alt="Confused about publishing a book" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
