import React, { useState } from "react";

const PaperbackEarningsCalculator = () => {
  const [mrp, setMrp] = useState("");
  const [otherRoyalty, setOtherRoyalty] = useState("");
  const [obRoyalty, setObRoyalty] = useState("");

  const calculateRoyalty = () => {
    if (!mrp || mrp <= 0) {
      alert("Please enter a valid MRP.");
      return;
    }

    // Dummy Calculation Logic (Replace with actual logic)
    setOtherRoyalty(`₹${(mrp * 0.5).toFixed(2)}`);
    setObRoyalty(`₹${(mrp * 0.7).toFixed(2)}`);
  };

  return (
    <div className="form-widget col-md-6 col-12 p-4">
      <div className="row shadow bg-light border m-0 p-0 rounded">
        <div className="col-lg-12 p-0">
          <div className="text-center p-3 rounded" style={{ background: "#fdefe0" }}>
            <h3 className="m-2 text-danger">2. Paperback Earnings</h3>
            <small>
              Use the tool below to estimate the paperback royalty of your book with a Black & White interior.
            </small>
          </div>

          <div className="row p-4">
            <div className="col-12 form-group">
              <div className="row">
                <label className="col-sm-5 col-form-label">Quote MRP:</label>
                <div className="col-sm-7">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-white">₹</span>
                    </div>
                    <input
                      type="number"
                      className="form-control required"
                      placeholder="Set Selling Price"
                      value={mrp}
                      onChange={(e) => setMrp(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 form-group">
              <p className="text-justify" style={{ fontSize: "75%" }}>
                <strong>Note:</strong> Cost is calculated for a black and white book on white pages. Price may increase for cream pages.
                Standard 5×8in size books are best suited for non-academic and fiction genres. Contact us for color printing or size variants.
              </p>
            </div>

            <div className="col-12 d-flex justify-content-center align-items-center pt-2">
              <button type="button" className="custom-btn rounded" onClick={calculateRoyalty}>
                Calculate
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 pb-2 px-4 bg-light">
            <div className="col-12 form-group">
              <div className="row">
                <label className="col-sm-8 col-form-label">Other Distribution Channels:</label>
                <div className="col-sm-4 font-weight-semibold">{otherRoyalty}</div>
              </div>
            </div>
            <div className="col-12 form-group">
              <div className="row">
                <label className="col-sm-8 col-form-label">Rank Store:</label>
                <div className="col-sm-4 text-larger font-weight-semibold">{obRoyalty}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center pt-4 text-muted" style={{ fontSize: "12px" }}>
        Author Earnings shown above are exclusive of taxes. It is subject to change based on the current production cost/promotional discount.
      </div>
    </div>
  );
};

export default PaperbackEarningsCalculator;
