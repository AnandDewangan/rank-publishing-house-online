import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const WhoWeAre = () => {
  const features = [
    {
      icon: "bi-printer",
      title: "Print",
      image: "https://www.orangebooks.in/assets/images/featured-img/2.jpg",
      description:
        "We provide unbelievable Print On Demand Lifetime Inventory on International Print Quality for your books. We provide best POD service for your book.",
    },
    {
      icon: "bi-truck",
      title: "Quick Service",
      image: "https://www.orangebooks.in/assets/images/featured-img/3.jpg",
      description:
        "With quick publishing within 7 to 10 Days only, your book will be ready for worldwide distribution as print and eBook. We ensure fastest service is delivered to you.",
    },
    {
      icon: "bi-handshake",
      title: "Support",
      image: "https://www.orangebooks.in/assets/images/featured-img/1.jpg",
      description:
        "Get a dedicated Project flow while publishing and a caring post-publishing support once released. You are provided with best in class support platforms.",
    },
    {
      icon: "bi-globe",
      title: "Worldwide Distribution",
      image: "https://www.orangebooks.in/assets/images/featured-img/2.jpg",
      description:
        "We make your book available in upto 150+ countries as paperback and eBook. We are in partnership with largest global book distribution networks.",
    },
  ];

  return (
    <div className="container">
      <div className="row align-items-center justify-content-between">
        <div className="border-bottom-0">
          <span className="badge bg-secondary">Who Are We</span>
          <h6 className="fs-3">
            Most Economical & Trusted Book Publication In India.
          </h6>
        </div>
        <p
          className="text-muted"
          style={{ fontSize: "16px", textAlign: "justify" }}
        >
          Rank Publication House offers the most affordable self-publishing
          services in India. We aim to provide professional self book
          publication services, guidance and support to all emerging Indian
          Authors who inspire to write and publish their book with our Worldwide
          Availability on Print & eBook.
        </p>
        <div className="row">
          {features.map((feature, index) => (
            <div key={index} className="col-md-6 mb-4">
              <div className="p-lg-3 border rounded shadow-sm">
                <div className="row align-items-center p-2">
                  <div className="col-3">
                    <i
                      className={`bi ${feature.icon} text-primary display-6`}
                    ></i>
                  </div>
                  <div className="col-9">
                    <h6 className="fw-semibold fs-5">{feature.title}</h6>
                  </div>
                </div>
                <p className="text-muted">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
