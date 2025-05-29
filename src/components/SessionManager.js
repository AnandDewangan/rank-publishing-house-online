import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes

const SessionManager = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const authTime = localStorage.getItem("authTime");
      const token = localStorage.getItem("authorToken");

      if (authTime && token) {
        const now = Date.now();
        const elapsed = now - parseInt(authTime);

        if (elapsed > SESSION_TIMEOUT) {
          localStorage.clear();
          alert("Session expired. Please login again.");
          navigate("/author-login"); // 🔁 force redirect to login
        }
      }
    }, 60000); // check every 1 minute

    return () => clearInterval(interval); // cleanup
  }, [navigate]);

  return null;
};

export default SessionManager;
