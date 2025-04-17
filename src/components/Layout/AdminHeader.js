import React from "react";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("userRole");
    navigate("/admin-login");
  };

  return (
    <header className="top-header bg-white shadow-sm">
      <nav className="navbar navbar-expand-lg px-4 py-2 border-bottom">
        <div className="d-flex align-items-center gap-3">
          <a href="/admin-dashboard" className="d-flex align-items-center gap-2 text-decoration-none">
            <img
              src="/assets/images/favicon.png"
              className="logo-img"
              width="50"
              alt="Logo"
            />
          </a>
        </div>

        <ul className="navbar-nav ms-auto d-flex flex-row gap-4 align-items-center mb-0">
          <li className="nav-item">
            <Link to="/author-list" className="nav-link fw-semibold text-primary">
              Author List
            </Link>
          </li>
          <li className="nav-item">
            <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">
              <BiLogOut />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
