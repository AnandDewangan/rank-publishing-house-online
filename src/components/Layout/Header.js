import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const [author, setAuthor] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const token = localStorage.getItem("authorToken");
        if (!token) return;

        const response = await fetch(
          `${baseURL}/api/authors/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (data.success) {
          setAuthor(data.author);
        }
      } catch (error) {
        console.error("Error fetching author profile:", error);
      }
    };

    fetchAuthor();
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("authorToken"); 
    localStorage.removeItem("userRole");
    localStorage.removeItem("authorId");
    localStorage.clear();
    navigate("/");
  };

  const handleNavigate = (path) => {
    setDropdownOpen(false); // Close dropdown before navigating
    navigate(path);
  };

  return (
    <header className="bg-dark">
      <nav className="navbar navbar-expand align-items-center justify-content-between border-bottom px-4">
        <div>
          <a href="/dashboard">
            <img
              src="/assets/images/favicon.png"
              className="logo-img"
              width="60"
              alt="Logo"
            />
          </a>
        </div>

        {author && (
          <ul className="navbar-nav gap-1 nav-right-links align-items-center">
            <li
              className="nav-item dropdown position-relative"
              ref={dropdownRef}
            >
              <div
                className="dropdown-toggle dropdown-toggle-nocaret d-flex align-items-center gap-2"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={author.image_path || "/assets/images/avatars/01.png"}
                  onError={(e) => {
                    e.target.src = "/assets/images/avatars/01.png";
                  }}
                  className="rounded-circle p-1 border"
                  width="60"
                  height="60"
                  alt="Profile"
                />
              </div>

              {dropdownOpen && (
                <div
                  className="dropdown-menu dropdown-user dropdown-menu-end shadow position-absolute show"
                  style={{ right: 0, top: "100%" }}
                >
                  <div className="text-center p-3 border-bottom">
                    <img
                      src={author.image_path || "/assets/images/avatars/01.png"}
                      onError={(e) => {
                        e.target.src = "/assets/images/avatars/01.png";
                      }}
                      className="rounded-circle p-1 border mb-2"
                      width="100"
                      height="100"
                      alt="Profile"
                    />
                    <h5 className="user-name mb-0 fw-bold">{author.name}</h5>
                  </div>
                  <button
                    className="dropdown-item d-flex align-items-center gap-2 py-2"
                    onClick={() => handleNavigate(`/dashboard`)}
                  >
                    <i className="bi bi-house-door"></i> Dashboard
                  </button>
                  <button
                    className="dropdown-item d-flex align-items-center gap-2 py-2"
                    onClick={() => handleNavigate(`/authors/${author._id}`)}
                  >
                    <i className="bi bi-person-circle"></i> Profile
                  </button>
                  <button
                    className="dropdown-item d-flex align-items-center gap-2 py-2"
                    onClick={() => handleNavigate(`/books/${author._id}`)}
                  >
                    <i className="bi bi-book-half"></i> Books
                  </button>
                  <button
                    className="dropdown-item d-flex align-items-center gap-2 py-2"
                    onClick={() => handleNavigate(`/transactions/${author._id}`)}
                  >
                    <i className="bi bi-receipt"></i> Transactions
                  </button>

                  <hr className="dropdown-divider" />
                  <button
                    className="dropdown-item d-flex align-items-center gap-2 py-2 text-danger"
                    onClick={handleLogout}
                  >
                    <i className="material-icons-outlined">
                      power_settings_new
                    </i>{" "}
                    Logout
                  </button>
                </div>
              )}
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
