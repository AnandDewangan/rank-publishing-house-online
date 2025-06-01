import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import thankYouImage from "./thank-you.png"; 

const ThankYouPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Prevent back navigation
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = () => {
      window.history.go(1);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-pink-100 to-purple-200">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <img
          src={thankYouImage}
          alt="Thank You"
          className="w-72 mx-auto mb-4 drop-shadow-lg"
        />
        <h1 className="text-4xl font-bold text-pink-700 mt-4">Thank You!</h1>
        <p className="text-lg mt-2 text-gray-700">
          Your submission has been successfully received.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
        >
          Go to Homepage
        </button>
      </motion.div>
    </div>
  );
};

export default ThankYouPage;
