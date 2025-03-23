import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Logo from "./logo.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={Logo} width={100}/>
        </Link>

        <div className="d-lg-none ms-auto me-3">
          <a href="#" className="btn custom-btn custom-border-btn btn-naira btn-inverted">
            <i className="btn-icon bi-cloud-download"></i>
            <span>Download</span>
          </a>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-lg-auto me-lg-4">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/how-to-publish">How to Publish</Link>
            </li>
          </ul>

          <div className="d-none d-lg-block">
            <a href="#" className="btn custom-btn custom-border-btn btn-naira btn-inverted">
              <i className="btn-icon bi-cloud-download"></i>
              <span>Download</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
