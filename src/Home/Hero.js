import React from "react";

const Hero = () => {
  const avatars = [
    "images/avatar/portrait-beautiful-young-woman-standing-grey-wall.jpg",
    "images/avatar/portrait-young-redhead-bearded-male.jpg",
    "images/avatar/pretty-blonde-woman.jpg",
    "images/avatar/studio-portrait-emotional-happy-funny-smiling-boyfriend.jpg",
  ];
  return (
    <>
    <section
      className="hero-section d-flex justify-content-center align-items-center"
      id="section_1"
      style={{ backgroundImage: "url('/images/businessman-sitting-by-table-cafe.jpg')" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-12 mb-5 pb-5 pb-lg-0 mb-lg-0">
            <h6>Introducing ebook</h6>

            <h1 className="text-white mb-4">
              ebook landing page for professionals
            </h1>

            <a href="#section_2" className="btn custom-btn smoothscroll me-3">
              Discover More
            </a>

            <a href="#section_3" className="link link--kale smoothscroll">
              Meet the Author
            </a>
          </div>

          <div className="hero-image-wrap col-lg-6 col-12 mt-3 mt-lg-0">
            <img
              src="/images/education-online-books.png"
              className="hero-image img-fluid"
              alt="education online books"
            />
          </div>
        </div>
      </div>
    </section>
    <section className="featured-section">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-12">
          <div className="avatar-group d-flex flex-wrap align-items-center">
            {avatars.map((src, index) => (
              <img
                key={index}
                src={src}
                className={`img-fluid avatar-image ${
                  index !== 0 ? "avatar-image-left" : ""
                }`}
                alt={`Avatar ${index + 1}`}
              />
            ))}

            <div className="reviews-group mt-3 mt-lg-0">
              <strong>4.5</strong>
              <i className="bi-star-fill"></i>
              <i className="bi-star-fill"></i>
              <i className="bi-star-fill"></i>
              <i className="bi-star-fill"></i>
              <i className="bi-star"></i>
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
