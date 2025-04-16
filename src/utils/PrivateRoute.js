// src/utils/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, adminOnly = false, authorOnly = false }) => {
  const adminToken = localStorage.getItem("adminToken");
  const authorToken = localStorage.getItem("authorToken");

  if (adminOnly && !adminToken) {
    return <Navigate to="/admin-login" />;
  }

  if (authorOnly && !authorToken) {
    return <Navigate to="/author-login" />;
  }

  if (!adminToken && !authorToken) {
    return <Navigate to="/author-login" />;
  }

  return children;
};

export default PrivateRoute;
