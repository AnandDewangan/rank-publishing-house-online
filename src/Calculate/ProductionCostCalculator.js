import React, { useState } from "react";

const ProductionCostCalculator = () => {
  const [pcost, setPcost] = useState("");
  const [msp, setMsp] = useState("");

  const calculateRoyalty = () => {
    // Placeholder logic for calculation (replace with actual logic)
    setPcost("₹500"); 
    setMsp("₹750");
  };

  return (
    <div className="form-widget col-md-6 col-12 p-4">
      <div className="row shadow bg-light border m-0 p-0 rounded">
        <div className="col-lg-12 p-0">
          <div className="text-center p-3 rounded" style={{ background: "#fdefe0" }}>
            <h3 className="m-2">1. Production Cost</h3>
            <small>
              Use the tool below to estimate the production cost of your book with a Black & White interior.
            </small>
          </div>

          <form className="row p-4" id="production-cost">
            <div className="col-12 form-group">
              <div className="row">
                <label className="col-sm-5 col-form-label">Book Size:</label>
                <div className="col-sm-7">
                  <select className="form-control required" name="bookSize" id="bookSize" required>
                    <option value="">Select Book Size</option>
                    <option value="1">5x8 in</option>
                    <option value="2">6x9 in</option>
                    <option value="3">8x11 in</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="col-12 form-group">
              <div className="row">
                <label className="col-sm-5 col-form-label">Number of Pages:</label>
                <div className="col-sm-7">
                  <input
                    type="number"
                    name="pages"
                    id="pages"
                    className="form-control required"
                    placeholder="Enter Total Pages"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="col-12 form-group">
              <div className="row">
                <label className="col-sm-5 col-form-label">Book Format:</label>
                <div className="col-sm-7">
                  <select className="form-control required" name="format" id="format" required>
                    <option value="paperback">Paperback</option>
                    <option value="hardback" disabled>Hardback</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="col-12 text-center">
              <label className="text-danger text-smaller mb-0" id="note"></label>
            </div>

            <div className="col-12 d-flex justify-content-center align-items-center pt-2 pb-2">
              <button type="button" className="btn btn-primary btn-lg rounded" onClick={calculateRoyalty}>
                Calculate
              </button>
            </div>
          </form>

          <div className="mt-4 pt-3 pb-2 px-4 bg-light">
            <div className="col-12 form-group">
              <div className="row">
                <label className="col-sm-8 col-form-label">Production Cost:</label>
                <div className="col-sm-4 font-weight-semibold">{pcost}</div>
              </div>
            </div>
            <div className="col-12 form-group">
              <div className="row">
                <label className="col-sm-8 col-form-label">Minimum Selling Price (MSP):</label>
                <div className="col-sm-4 text-larger font-weight-semibold">{msp}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center pt-4 text-muted" style={{ fontSize: "12px" }}>
        Production cost is exclusive of taxes and handling charges. It is subject to change based on market conditions.
      </div>
    </div>
  );
};

export default ProductionCostCalculator;
