import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqsData = [
  {
    question: "Print on Demand (PoD) methodology",
    answer: `Mostly, traditional publishers print books in bulk (1000+ copies), which is why they charge high fees. 
    Rank Publishing House adopts the Print on Demand (PoD) technique, printing copies only when required, 
    allowing even single copies to be produced without upfront costs for authors.`,
  },
  {
    question: "Minimum Selling Price (MSP)",
    answer: `Since books are printed on demand, there is a production cost associated with each copy. Additionally, 
    distribution margins are added. The Minimum Selling Price (MSP) ensures production costs are covered while 
    maintaining optimal author royalties. PoD books cost more due to digital printing, similar to photocopying costs.`,
  },
  {
    question: "Maximum Retail Price (MRP) and Author Royalty",
    answer: `Authors can set their book price, but it must meet minimum pricing set by the publisher. Royalties are calculated as:<br/>
    <strong>Amazon, Flipkart, and other paperback channels (India):</strong><br/>
    Royalty = MRP - 50% of MRP - Printing Cost.<br/><br/>
    <strong>Rank Publishing Store (Paperback in India):</strong><br/>
    Royalty = MRP - 15% - Printing Cost.<br/><br/>
    <strong>Playstore ebooks:</strong> 50% Royalty.<br/><br/>
    Payments above ₹500 are processed at the end of the month via UPI or NEFT to Indian bank accounts.`,
  },
  {
    question: "Author Royalty from International Copies & eBook Sales",
    answer: `100% Royalty is provided to authors on all International print orders and eBook sales. Sales details are 
    updated in the author dashboard in the second week of the next month. The exact royalty varies by book and genre.`,
  },
  {
    question: "Order Author Copies",
    answer: `Authors can order additional copies of their book at production cost (plus taxes & shipping). 
    The minimum order quantity is 30 books, but lower quantities are available with additional processing fees. 
    Printing takes 5-7 working days + shipping time.`,
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container pt-lg-4 pb-lg-6 bg-white">
      <div className="text-center pb-4">
        <div className="badge badge-pill badge-default">FAQs</div>
        <h2>Frequently Asked Questions</h2>
        <p>Have more questions? Check out the FAQs related to author royalty.</p>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            {faqsData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="toggle mb-3"
              >
                <div
                  className="toggle-header d-flex justify-content-between"
                  onClick={() => toggleFAQ(index)}
                  style={{ cursor: "pointer", padding: "10px", background: "#f8f9fa", borderRadius: "5px" }}
                >
                  <h3 className="h5">{faq.question}</h3>
                  <motion.i 
                    className={`bi ${openIndex === index ? "bi-chevron-down" : "bi-chevron-right"}`}
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  ></motion.i>
                </div>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="toggle-content p-3"
                    >
                      <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="col-lg-4 text-center">
            <motion.img
              src="/images/faq.gif"
              alt="FAQs"
              className="img-fluid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;