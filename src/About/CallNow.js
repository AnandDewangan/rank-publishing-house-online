import React from "react";
import { motion } from "framer-motion";

const CallNow = () => {
  const phoneNumber = "+919171242297";

  return (
    <div className="my-5">
      <motion.a
        href={`tel:${phoneNumber}`}
        className="btn btn-success btn-lg d-flex align-items-center px-4 py-3"
        whileHover={{ scale: 1.1, boxShadow: "0px 0px 10px rgba(0,255,0,0.6)" }}
        whileTap={{ scale: 0.9 }}
      >
        <i className="bi bi-telephone-fill me-2 fs-4"></i> Call Now
      </motion.a>
    </div>
  );
};

export default CallNow;
