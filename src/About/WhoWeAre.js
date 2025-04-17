import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { motion } from "framer-motion";

const WhoWeAre = () => {
  const features = [
    {
      icon: "bi-printer",
      title: "Print",
      color: "text-info",
      description:
        "We provide unbelievable Print On Demand Lifetime Inventory on International Print Quality for your books. We provide best POD service for your book.",
    },
    {
      icon: "bi-people-fill",
      title: "Support",
      color: "text-success",
      description:
        "Get a dedicated Project flow while publishing and a caring post-publishing support once released. You are provided with best in class support platforms.",
    },
    {
      icon: "bi-truck",
      title: "Quick Service",
      color: "text-danger",
      description:
        "With quick publishing within 7 to 10 Days only, your book will be ready for worldwide distribution as print and eBook. We ensure fastest service is delivered to you.",
    },
    {
      icon: "bi-globe",
      title: "Worldwide Distribution",
      color: "text-warning",
      description:
        "We make your book available in upto 150+ countries as paperback and eBook. We are in partnership with largest global book distribution networks.",
    },
  ];

  return (
    <div className="container">
      <div className="row align-items-center justify-content-between">
        <div className="border-bottom-0">
          <h2 className="fs-2 text-danger">
            Most Economical & Trusted Book Publication In India.
          </h2>
        </div>
        <h6
          className="text-muted"
          style={{ fontSize: "16px", textAlign: "justify" }}
        >
          Rank Publishing House offers the most affordable self-publishing
          services in India. We aim to provide professional self book
          publication services, guidance and support to all emerging Indian
          Authors who inspire to write and publish their book with our Worldwide
          Availability on Print & eBook.
        </h6>
        <div className="row">
          {features.map((feature, index) => (
            <motion.div
            key={index}
            className="col-md-6 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <div
              className="p-3 border rounded shadow-sm feature-card"
              style={{ transition: "all 0.3s ease-in-out" }}
            >
              <div className="row align-items-center">
                <div className="col-3">
                  <i className={`bi ${feature.icon} ${feature.color} display-6`}></i>
                </div>
                <div className="col-9">
                  <h6 className={`fw-semibold fs-5 ${feature.color}`}>{feature.title}</h6>
                </div>
              </div>
              <p className="text-muted">{feature.description}</p>
            </div>
          </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
