import { jwtDecode } from "jwt-decode"; 
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const baseURL = "http://localhost:5000";

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${baseURL}/api/admin/login`, {
        email,
        password,
      });
  
      const token = res.data.token;
  
      // Decode the JWT to extract role
      const decoded = jwtDecode(token);
      const role = decoded.role;
  
      // Save both token and role to localStorage
      localStorage.setItem("adminToken", token);
      localStorage.setItem("userRole", role); 
  
      toast.success("Login successful!");
      navigate("/admin-dashboard");
    } catch (err) {
      toast.error("Invalid Credentials");
    }
  };
  

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
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
          Admin Login
        </h3>

        <motion.input
          type="text"
          className="form-control mb-3"
          placeholder="Admin ID"
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
          className="btn btn-primary w-100"
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

export default AdminLogin;
