import React, { useState } from "react";

const ProductionCostCalculator = () => {
  const [pcost, setPcost] = useState(0);
  const [msp, setMsp] = useState(0);
  const [size, setSize] = useState("");
  const [pages, setPages] = useState("");
  const [bookFormat, setBookFormat] = useState("Paperback");

  const getProductionCost = (size, pages, bookFormat) => {
    let cost = 0;
    const pageCount = parseInt(pages);

    if (bookFormat === "Paperback") {
      if (size === "5") cost = 0.64 * pageCount + 9.5;
      else if (size === "6") cost = 0.78 * pageCount + 9.5;
      else if (size === "8") cost = 0.86 * pageCount + 9.5;
    } else if (bookFormat === "Colorbook") {
      if (size === "5") cost = 3.75 * pageCount;
      else if (size === "6") cost = 4.25 * pageCount;
      else if (size === "8") cost = 4.75 * pageCount;
    } else if (bookFormat === "Hardbound") {
      // Calculate paperback cost first
      let paperbackCost = 0;
      if (size === "5") paperbackCost = 0.64 * pageCount + 9.5;
      else if (size === "6") paperbackCost = 0.78 * pageCount + 9.5;
      else if (size === "8") paperbackCost = 0.86 * pageCount + 9.5;

      // Add hardbound overhead
      if (size === "5") cost = paperbackCost + 85;
      else if (size === "6") cost = paperbackCost + 95;
      else if (size === "8") cost = paperbackCost + 110;
    }

    return Math.round(cost);
  };

  const calculateProductionCost = () => {
    if (!pages || pages <= 0) {
      alert("Please enter a valid number of pages.");
      return;
    }

    const productionCost = getProductionCost(size, pages, bookFormat);
    const suggestedMRP = bookFormat === "Paperback"
      ? productionCost * 2.3
      : productionCost * 2.1;

    setPcost(productionCost);
    setMsp(Math.round(suggestedMRP));
  };

  return (
    <div className="form-widget col-md-6 col-12 p-4">
      <div className="row shadow bg-light border m-0 p-0 rounded">
        <div className="col-lg-12 p-0">
          <div className="text-center p-3 rounded" style={{ background: "#fdefe0" }}>
            <h3 className="m-2 text-danger">1. Production Cost</h3>
            <small>
              Use the tool below to estimate the production cost of your book with a Black & White interior.
            </small>
          </div>

          <form className="row p-4" id="production-cost">
            <div className="col-12 form-group">
              <div className="row">
                <label className="col-sm-5 col-form-label">Book Size:</label>
                <div className="col-sm-7">
                  <select className="form-control" value={size} onChange={(e) => setSize(e.target.value)} required>
                    <option value="">Select Size</option>
                    <option value="5">5x8 in</option>
                    <option value="6">6x9 in</option>
                    <option value="8">8x11 in</option>
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
                    className="form-control required"
                    placeholder="Enter Total Pages"
                    value={pages}
                    onChange={(e) => setPages(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="col-12 form-group">
              <div className="row">
                <label className="col-sm-5 col-form-label">Book Format:</label>
                <div className="col-sm-7">
                  <select className="form-control required" value={bookFormat} onChange={(e) => setBookFormat(e.target.value)} required>
                    <option value="Paperback">Paperback</option>
                    <option value="Colorbook">Colorbook</option>
                    <option value="Hardbound">Hardbound</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="col-12 d-flex justify-content-center align-items-center pt-2 pb-2">
              <button type="button" className="custom-btn rounded" onClick={calculateProductionCost}>
                Calculate
              </button>
            </div>
          </form>

          <div className="mt-4 pt-3 pb-2 px-4 bg-light">
            <div className="col-12 form-group">
              <div className="row">
                <label className="col-sm-8 col-form-label">Production Cost:</label>
                <div className="col-sm-4 font-weight-semibold">₹{pcost}</div>
              </div>
            </div>
            <div className="col-12 form-group">
              <div className="row">
                <label className="col-sm-8 col-form-label">Minimum Selling Price (MSP):</label>
                <div className="col-sm-4 text-larger font-weight-semibold">₹{msp}</div>
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
