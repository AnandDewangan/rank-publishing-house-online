// src/components/Layout/Layout.js
import React from "react";
import Header from "./AdminHeader";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main style={{ minHeight: "80vh", padding: "20px" }}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
