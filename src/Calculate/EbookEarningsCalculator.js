import React, { useState } from "react";

const EbookEarningsCalculator = () => {
  const [ebookMRP, setEbookMRP] = useState("");
  const [kindleRoyalty, setKindleRoyalty] = useState("");
  const [playstoreRoyalty, setPlaystoreRoyalty] = useState("");

  const calculateEbookRoyalty = () => {
    const minPrice = 49;

    if (!ebookMRP || ebookMRP < minPrice) {
      alert(`Ebook price must be at least ₹${minPrice}.`);
      return;
    }

    // Dummy Calculation Logic (Replace with actual royalty formula)
    const kindleRate = 0.7; // Example: 70% royalty
    const playstoreRate = 0.6; // Example: 60% royalty

    setKindleRoyalty(`₹${(ebookMRP * kindleRate).toFixed(2)}`);
    setPlaystoreRoyalty(`₹${(ebookMRP * playstoreRate).toFixed(2)}`);
  };

  return (
    <div className="form-widget col-md-6 col-12 p-4">
      <div className="row shadow bg-light border m-0 p-0 rounded">
        <div className="col-lg-12 p-0">
          <div className="text-center p-3 rounded" style={{ background: "#fdefe0" }}>
            <h3 className="m-2 text-danger">4. Ebook Earnings</h3>
            <small>Use this tool to estimate the ebook royalty of your book.</small>
          </div> 
          <div className="row p-4">
            <div className="col-12 form-group">
              <div className="row">
                <label className="col-sm-5 col-form-label">Quote Ebook MRP:</label>
                <div className="col-sm-7">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-white">₹</span>
                    </div>
                    <input
                      type="number"
                      className="form-control required"
                      placeholder="Set Ebook Selling Price"
                      value={ebookMRP}
                      onChange={(e) => setEbookMRP(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 form-group col-form-label m-0">
              <p style={{ fontSize: "75%", textAlign: "justify" }}>
                <strong>Note:</strong> The selling price for your ebook should be less than the price of the paperback book.
                Ebook price cannot be less than ₹49.
              </p>
            </div>

            <div className="col-12 d-flex justify-content-center align-items-center pt-2">
              <button type="button" className="custom-btn rounded" onClick={calculateEbookRoyalty}>
                Calculate
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 pb-2 px-4 bg-light">
            <div className="col-12 form-group">
              <div className="row">
                <label className="col-sm-8 col-form-label">Amazon Kindle:</label>
                <div className="col-sm-4 font-weight-semibold">{kindleRoyalty}</div>
              </div>
            </div>
            <div className="col-12 form-group">
              <div className="row">
                <label className="col-sm-8 col-form-label">Google Playstore:</label>
                <div className="col-sm-4 text-larger font-weight-semibold">{playstoreRoyalty}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center pt-4 text-muted" style={{ fontSize: "12px" }}>
        Author earnings shown above are exclusive of taxes and are subject to change as per the respective marketplace.
      </div>
    </div>
  );
};

export default EbookEarningsCalculator;
