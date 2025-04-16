import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "blue-theme"
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <footer className="page-footer position-fixed bottom-0">
        <p className="mb-0">
          Copyright © 2025. All rights reserved by{" "}
          <a
            href="https://www.rankpublishinghouse.online"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rank Publishing House
          </a> 
        </p>
      </footer>

      {/* Settings Button */}
      <div className="position-fixed bottom-0 end-0 m-3">
        <button
          className="rounded-circle d-flex align-items-center justify-content-center shadow-lg border-0"
          style={{
            backgroundColor: "#d63384", // 🟣 Purple Background
            color: "#fff", // White Icon
            width: "45px", // 🔹 Button size thoda chhota
            height: "45px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span
            className="material-icons-outlined"
            style={{ fontSize: "22px" }}
          >
            {" "}
            {/* 🔹 Icon size chhota */}
            settings
          </span>
        </button>
      </div>

      {/* Animated Theme Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            style={{
              position: "fixed",
              bottom: "90px",
              right: "25px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {[
              { id: "blue-theme", icon: "wb_sunny", color: "#007bff" }, // Blue Theme
              { id: "light-theme", icon: "nights_stay", color: "#f8f9fa" }, // Light Theme
              { id: "semi-dark", icon: "contrast", color: "#343a40" }, // Semi Dark
            ].map((themeOption) => (
              <motion.button
                key={themeOption.id}
                className="rounded-circle p-2 shadow border-0" // p-2 for small padding
                style={{
                  backgroundColor: themeOption.color,
                  color: themeOption.id === "light-theme" ? "#000" : "#fff", // Light theme ke liye dark text
                  width: "40px", // 🔹 Chhota button
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => setTheme(themeOption.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span
                  className="material-icons-outlined"
                  style={{ fontSize: "20px" }}
                >
                  {" "}
                  {/* 🔹 Chhota icon */}
                  {themeOption.icon}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
