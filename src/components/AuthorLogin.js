import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
const baseURL = process.env.REACT_APP_API_BASE_URL;

const AuthorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Full reset: clear localStorage, sessionStorage and cookies (if any)
    localStorage.clear();
    sessionStorage.clear();

    // Optional: Clear cookies (if you had cookies set manually via JS)
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  }, []);

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${baseURL}/api/authors/login`, {
        email,
        password,
      });
      const now = new Date().getTime();
      localStorage.setItem("authorToken", res.data.token);
      localStorage.setItem("authorId", res.data.authorId);
      localStorage.setItem("authTime", now);

      toast.success("Login Successful!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <ToastContainer />
      <motion.div
        className="login-box p-4 shadow-lg rounded"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          backgroundColor: "#fff",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3 className="text-center mb-4" style={{ color: "#007bff" }}>
          Author Login
        </h3>

        <motion.input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        />

        <motion.input
          type="password"
          className="form-control mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        />

        <motion.button
          onClick={handleLogin}
          className="btn btn-primary w-100 mb-2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Login
        </motion.button>
      </motion.div>
    </div>
  );
};

export default AuthorLogin;
