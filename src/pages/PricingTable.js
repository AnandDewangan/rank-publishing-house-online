import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const PricingTable = () => {
  const packages = [
    {
      name: "CLASSIC",
      price: "₹6,999/-",
      icon: "bi-book-fill",
      features: [
        ["Paperback + E-Book Publishing", "Author Contract"],
        ["Publishing Duration – 20-25 Days", "Author Copyright"],
        [
          "Including Pages (Up-To 150 Pages Regular Size)",
          "Dedicated Project Manager",
        ],
        ["B&W Book (Colored Cover)", "Cover Design (Template Based)"],
        ["Interior Design ", "ISBN + Bar Code Assignment"],
        ["Digital Proof", "Publishing E-Certificate"],
        [
          "Author Dashboard (Check Live Sales Report)",
          "Social Media Templates ",
        ],
        ["Basic Marketing (1 Weak)", "(100%) Royalty Payment"],
        [
          "Unlimited Inventory Management (Print On Demand Service)",
          "Distribution To Major Platforms ( Amazon, Flipkart And Google Books Etc)",
        ],
      ],
      missingFeatures: [
        ["Custom Cover Design", "Pagination + Typesetting"],
        ["Amazon Prime listing", "Basic Marketing"],
        ["Book trailer video", ""],
      ],
    },
    {
      name: "SUPREME",
      price: "₹8,999",
      icon: "bi-file-earmark-pdf-fill",
      features: [
        ["Paperback + E-Book Publishing", "Author Contract"],
        ["Publishing Duration – 15-20 Days", "Author Copyright"],
        [
          "Including Pages (Up-To 250 Pages Regular Size)",
          "Dedicated Project Manager",
        ],
        [
          "B&W Book (Colored Cover)",
          "Custom Cover Design (2 Concept+3 Revisions)",
        ],
        [
          "Interior Design (Pagination + Typesetting)",
          "ISBN + Bar Code Assignment",
        ],
        ["Digital Proof", "Publishing E-Certificate"],
        [
          "Author Dashboard (Check Live Sales Report)",
          "Social Media Templates ",
        ],
        ["Basic Marketing (1 Weak)", "(100%) Royalty Payment"],
        [
          "Amazon Prime listing- 1 Month",
          "Basic Marketing (15 Days Instagram and Facebook )",
        ],
        [
          "Book trailer video (Only One Concept & 1 Revisions)",
          "Publishing E-Certificate",
        ],
        [
          "Unlimited Inventory Management (Print On Demand Service)",
          "Distribution To Major Platforms ( Amazon, Flipkart, Kindle And Google Books Etc)",
        ],
      ],
      missingFeatures: [
        ["Extensive Editing & Proofreading", "Govt. Copyright"],
        ["B&W Book & Illustration", "Listing On Global ebook and Paperback Distribution ( Amazon, Flipkart, Amazon kindle and Google Books Etc)"],
        ["Amazon Prime Listing - 1 Year", "Customised Cover Design (Unlimited Concept+ Unlimited Revisions)"]
      ],
    },
    {
      name: "PLATINUM",
      price: "₹12,999",
      icon: "bi-file-earmark-pdf-fill",
      features: [
        ["Paperback + E-Book Publishing", "Author Contract"],
        ["Publishing Duration - 7-10 Days", "Author Copyright"],
        [
          "Including Pages (Up-To 350 Pages Regular Size)",
          "Dedicated Project Manager",
        ],
        ["Extensive Editing & Proofreading ", "Govt. Copyright"],
        [
          "B&W Book & Illustration",
          "Customised Cover Design (Unlimited Concept+ Unlimited Revisions)",
        ],
        [
          "Interior Design (Customised Pagination + Typesetting)",
          "ISBN + Bar Code Assignment",
        ],
        ["Digital Proof", "Publishing E-Certificate"],
        [
          "Author Dashboard (Check Live Sales Report)",
          "Social Media Templates ",
        ],
        ["Basic Marketing (1 Weak)", "(100%) Royalty Payment"],
        [
          "Amazon Prime Listing-1Year",
          "Book Marketing (30 Days Instagram and Facebook)",
        ],
        [
          "Custom Book Trailer Video",
          "Publishing E-Certificate",
        ],
        [
          "Unlimited Inventory Management (Print On Demand Service)",
          "Listing On Global ebook and Paperback Distribution ( Amazon, Flipkart, Amazon kindle and Google Books Etc)"
        ],
      ],
      missingFeatures: [],
    },
  ];

  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = "";
      packages.forEach((_, index) => {
        const element = document.getElementById(`package-${index}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = `package-${index}`;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container-fluid py-5">
      <div className="section-title text-center mb-5">
        <h2 className="fs-2 text-danger">Pricing</h2>
        <h6 className="text-muted">
          Find your best prices of the books premium packages that are available
          with us. You can purchase the prices and get the discount of the
          purchase of the books.
        </h6>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="nav flex-column nav-pills">
            {packages.map((pkg, index) => (
              <a
                key={index}
                className={`nav-link text-dark border rounded mb-2 p-3 shadow-sm ${
                  activeSection === `package-${index}`
                    ? "active bg-danger text-white"
                    : ""
                }`}
                href={`#package-${index}`}
              >
                {pkg.name} ({pkg.price})
              </a>
            ))}
          </div>
        </div>
        <div className="col-md-8">
          {packages.map((pkg, index) => (
            <div
              id={`package-${index}`}
              className="card shadow-lg mb-4"
              key={index}
            >
              <div className="card-body">
                <h2 className="card-title text-danger">
                  {pkg.name} <i className={`bi ${pkg.icon}`}></i>
                </h2>
                <p className="price display-6">{pkg.price}</p>
                <ul className="list-unstyled">
                  {pkg.features.map((featurePair, i) => (
                    <li
                      key={i}
                      className="text-success d-flex align-items-center"
                    >
                      <i className="bi bi-check-circle-fill me-2"></i>
                      <span className="text-break text-wrap w-50">
                        {featurePair[0]}
                      </span>
                      <span className="text-break text-wrap w-50">
                        {featurePair[1]}
                      </span>
                    </li>
                  ))}
                  {pkg.missingFeatures.map((featurePair, i) => (
                    <li
                      key={i}
                      className="text-danger d-flex align-items-center"
                    >
                      <i className="bi bi-x-circle-fill me-2"></i>
                      <span className="text-break text-wrap w-50">
                        {featurePair[0]}
                      </span>
                      {featurePair[1] && (
                        <span className="text-break text-wrap w-50">
                          {featurePair[1]}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
                <a
                  href="tel: +919171242297"
                  className="btn btn-outline-success btn-lg"
                >
                  <i className="bi bi-telephone-fill"></i> Call Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingTable;
