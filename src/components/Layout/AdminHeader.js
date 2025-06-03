import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function AdminHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("userRole");
    localStorage.clear();
    navigate("/admin-login");
  };

  const menuItems = [
    { name: "Author List", path: "/author-list", className: "text-blue-600" },
    { name: "Financial", path: "/admin-finance", className: "text-green-600" },
    { name: "Hero-Image", path: "/hero-image", className: "text-orange-600" },
    { name: "Testimonial", path: "/author-feedback", className: "text-yellow-600" },
    { name: "Articles", path: "/article-manage", className: "text-green-600" },
    { name: "Store Order", path: "/store-order", className: "text-blue-600" },
    { name: "PIF", path: "/pif-form", className: "text-purple-600" },
  ];

  return (
    <header className="shadow-md bg-slate-900">
      <nav className="flex justify-between items-center px-6 py-3 border-b">
        {/* Logo */}
        <Link to="/admin-dashboard" className="flex items-center gap-2">
          <img
            src="/assets/images/favicon.png"
            alt="Logo"
            className="w-10 h-10"
          />
        </Link>

        {/* Menu Button */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md hover:bg-gray-100 transition"
          >
            <FaBars className="text-xl text-gray-700" />
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white border rounded-2xl shadow-lg py-2 z-50 animate-fadeIn">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-2 text-sm font-medium hover:bg-gray-100 transition ${item.className}`}
                >
                  {item.name}
                </Link>
              ))}

              <div className="border-t my-1"></div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-red-600 px-4 py-2 hover:bg-red-50 w-full transition"
              >
                <BiLogOut className="text-lg" />
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
