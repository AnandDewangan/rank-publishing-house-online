import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

export default function LoadingPage() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 vw-100 bg-light position-relative overflow-hidden">
      <motion.img
        src="/open-book.gif"
        alt="Loading Book Animation"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="mb-3"
        width={100}
      />
      <motion.h1
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeIn" }}
        className="fs-4 text-warning fw-bold"
      >
        R<span className="text-danger">A</span>NK PUBLISHING HOUSE
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, scale: 1.5 }}
        transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
        className="position-absolute top-0 start-0 w-100 h-100 bg-white opacity-10"
      />
    </div>
  );
}
