import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const PricingTable = () => {
  const packages = [
    {
      name: "Silver",
      price: "₹5,999/-",
      icon: "bi-book-fill",
      features: [
        ["Paperback + eBook Publishing", "Non-Exclusive Contract"],
        ["Dedicated Project Manager", "B&W Book (Colored Cover)"],
        ["Customised Cover Design", "Customised Pagination + Typesetting"],
        ["Digital Proof", "ISBN + Bar Code"],
        ["e-Book Conversion", "Global eBook Distribution"],
        ["Paperback Distribution India", "Unlimited Inventory Management"],
        ["10 Complimentary Copies", "Social Media Templates"],
        ["Publishing E-Certificate", "Annual Sales Reporting"],
        ["(100%) Royalty Payment", "Post Publishing Support"],
      ],
      missingFeatures: [
        ["Extensive Editing & Proof Reading", "B&W Illustrations"],
        ["Amazon Ad Campaign", "Basic Marketing"],
        ["Author Interview"]
      ],
    },
    {
      name: "Gold",
      price: "₹7,999",
      icon: "bi-file-earmark-pdf-fill",
      features: [
        ["Paperback + eBook Publishing", "Non-Exclusive Contract"],
        ["Dedicated Project Manager", "B&W Book (Colored Cover)"],
        ["Extensive Editing & Proof Reading", "Customised Cover Design"],
        ["Customised Pagination + Typesetting", "Up to 20 B&W Illustrations"],
        ["Digital Proof", "ISBN + Bar Code"],
        ["e-Book Conversion", "Global eBook Distribution"],
        ["Paperback Distribution India", "Unlimited Inventory Management"],
        ["20 Complimentary Copies", "Amazon Ad Campaign"],
        ["Social Media Templates", "Publishing Hard Copy Certificate"],
        ["Annual Sales Reporting", "(100%) Royalty Payment"],
        ["Post Publishing Support"]
      ],
      missingFeatures: [["Influencer Marketing", "Author Interview"]],
    },
    {
      name: "Platinum",
      price: "₹11,999",
      icon: "bi-file-earmark-pdf-fill",
      features: [
        ["Paperback + eBook Publishing", "Non-Exclusive Contract"],
        ["Dedicated Project Manager", "B&W Book (Colored Cover)"],
        ["Extensive Editing & Proof Reading", "Customised Cover Design"],
        ["Customised Pagination + Typesetting", "B&W Illustrations"],
        ["Digital Proof", "ISBN + Bar Code"],
        ["e-Book Conversion", "Global eBook Distribution"],
        ["Global Paperback Distribution", "Unlimited Inventory Management"],
        ["30 Complimentary Copies", "Amazon Ad Campaign"],
        ["Influencer Marketing", "Social Media Templates"],
        ["Publishing Hard Copy Certificate", "Annual Sales Reporting"],
        ["(100%) Royalty Payment", "Post Publishing Support"]
      ],
      missingFeatures: [["Author Interview"]],
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
    <div className="container py-5">
      <div className="section-title text-center mb-5">
        <h2 className="fs-2 text-danger">Pricing</h2>
        <h6 className="text-muted">
          Find your best prices of the books premium packages that are available with us. You can purchase the
          prices and get the discount of the purchase of the books.
        </h6>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="nav flex-column nav-pills">
            {packages.map((pkg, index) => (
              <a
                key={index}
                className={`nav-link text-dark border rounded mb-2 p-3 shadow-sm ${
                  activeSection === `package-${index}` ? "active bg-danger text-white" : ""
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
            <div id={`package-${index}`} className="card shadow-lg mb-4" key={index}>
              <div className="card-body">
                <h2 className="card-title text-danger">
                  {pkg.name} <i className={`bi ${pkg.icon}`}></i>
                </h2>
                <p className="price display-6">{pkg.price}</p>
                <ul className="list-unstyled">
                  {pkg.features.map((featurePair, i) => (
                    <li key={i} className="text-success d-flex align-items-center">
                      <i className="bi bi-check-circle-fill me-2"></i>
                      <span className="text-break text-wrap w-50">{featurePair[0]}</span>
                      <span className="text-break text-wrap w-50">{featurePair[1]}</span>
                    </li>
                  ))}
                  {pkg.missingFeatures.map((featurePair, i) => (
                    <li key={i} className="text-danger d-flex align-items-center">
                      <i className="bi bi-x-circle-fill me-2"></i>
                      <span className="text-break text-wrap w-50">{featurePair[0]}</span>
                      {featurePair[1] && <span className="text-break text-wrap w-50">{featurePair[1]}</span>}
                    </li>
                  ))}
                </ul>
                  <a href="tel: +91 9171242297" className="btn btn-outline-success btn-lg"><i className="bi bi-telephone-fill"></i> Call Now</a> 
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingTable;
