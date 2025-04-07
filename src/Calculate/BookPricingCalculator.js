import React, { useState } from "react";

const BookPricingCalculator = () => {
  const [size, setSize] = useState("");
  const [pages, setPages] = useState("");
  const [bookFormat, setBookFormat] = useState("Paperback");

  const [productionCost, setProductionCost] = useState(0);
  const [minimumSellingPrice, setMinimumSellingPrice] = useState(0);

  const [mrp, setMrp] = useState("");
  const [rankStoreRoyalty, setRankStoreRoyalty] = useState(0);
  const [otherRoyalty, setOtherRoyalty] = useState(0);

  const getProductionCost = (size, pages, format) => {
    const pageCount = parseInt(pages);
    let cost = 0;

    if (format === "Paperback") {
      if (size === "5") cost = 0.64 * pageCount + 9.5;
      else if (size === "6") cost = 0.78 * pageCount + 9.5;
      else if (size === "8") cost = 0.86 * pageCount + 9.5;
    } else if (format === "Colorbook") {
      if (size === "5") cost = 3.75 * pageCount;
      else if (size === "6") cost = 4.25 * pageCount;
      else if (size === "8") cost = 4.75 * pageCount;
    } else if (format === "Hardbound") {
      let paperbackCost = 0;
      if (size === "5") paperbackCost = 0.64 * pageCount + 9.5;
      else if (size === "6") paperbackCost = 0.78 * pageCount + 9.5;
      else if (size === "8") paperbackCost = 0.86 * pageCount + 9.5;

      if (size === "5") cost = paperbackCost + 85;
      else if (size === "6") cost = paperbackCost + 95;
      else if (size === "8") cost = paperbackCost + 110;
    }

    return Math.round(cost);
  };

  const calculateProduction = () => {
    if (!pages || pages <= 0) {
      alert("Please enter a valid number of pages.");
      return;
    }

    const cost = getProductionCost(size, pages, bookFormat);
    const msp = bookFormat === "Paperback" ? cost * 2.3 : cost * 2.1;

    setProductionCost(Math.round(cost));
    setMinimumSellingPrice(Math.round(msp));
    setMrp(""); // reset MRP on recalc
    setRankStoreRoyalty(0);
    setOtherRoyalty(0);
  };

  const calculateRoyalty = () => {
    const MRP = Number(mrp);
    const pcost = Number(productionCost);
    const msp = Number(minimumSellingPrice);

    if (!MRP || MRP <= 0) {
      alert("Please enter a valid MRP.");
      return;
    }

    if (MRP < msp) {
      alert("Quote MRP should be greater than or equal to the suggested MSP.");
      return;
    }

    const rankRoyalty = MRP - (MRP * 0.1 + pcost);  // Rank Store: 10%
    const otherRoyaltyCalc = MRP - (MRP * 0.4 + pcost); // Other: 40%

    setRankStoreRoyalty(Math.round(rankRoyalty));
    setOtherRoyalty(Math.round(otherRoyaltyCalc));
  };

  return (
    <div className="container p-4">
      {/* === 1. Production Cost Calculator === */}
      <div className="shadow p-4 bg-light rounded mb-4">
        <h3 className="text-danger">1. Production Cost</h3>
        <small>
          Estimate the production cost of your book based on size, pages, and format.
        </small>

        <div className="form-group mt-3">
          <label>Book Size:</label>
          <select className="form-control" value={size} onChange={(e) => setSize(e.target.value)} required>
            <option value="">Select Size</option>
            <option value="5">5x8 in</option>
            <option value="6">6x9 in</option>
            <option value="8">8x11 in</option>
          </select>
        </div>

        <div className="form-group mt-2">
          <label>Number of Pages:</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Total Pages"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            required
          />
        </div>

        <div className="form-group mt-2">
          <label>Book Format:</label>
          <select className="form-control" value={bookFormat} onChange={(e) => setBookFormat(e.target.value)}>
            <option value="Paperback">Paperback</option>
            <option value="Colorbook">Colorbook</option>
            <option value="Hardbound">Hardbound</option>
          </select>
        </div>

        <div className="text-center mt-3">
          <button className="custom-btn rounded" onClick={calculateProduction}>Calculate Production Cost</button>
        </div>

        {productionCost > 0 && (
          <div className="mt-4">
            <p><strong>Production Cost:</strong> ₹{productionCost}</p>
            <p><strong>Minimum Selling Price (MSP):</strong> ₹{minimumSellingPrice}</p>
          </div>
        )}
      </div>

      {/* === 2. Earnings Calculator === */}
      {productionCost > 0 && (
        <div className="shadow p-4 bg-light rounded">
          <h3 className="text-danger">2. Paperback Earnings</h3>
          <small>
            Estimate your earnings from Rank Store and other distribution channels.
          </small>

          <div className="form-group mt-3">
            <label>Quote MRP:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text bg-white">₹</span>
              </div>
              <input
                type="number"
                className="form-control"
                placeholder="Set Selling Price"
                value={mrp}
                onChange={(e) => setMrp(e.target.value)}
              />
            </div>
          </div>

          <div className="text-center mt-3">
            <button className="custom-btn rounded" onClick={calculateRoyalty}>Calculate Royalty</button>
          </div>

          {(rankStoreRoyalty || otherRoyalty) > 0 && (
            <div className="mt-4">
              <p><strong>Other Distribution Channels:</strong> ₹{otherRoyalty}</p>
              <p><strong>Rank Store:</strong> ₹{rankStoreRoyalty}</p>
            </div>
          )}
        </div>
      )}

      <div className="text-center pt-4 text-muted" style={{ fontSize: "12px" }}>
        All values are approximate and exclude taxes or discounts. For final pricing, consult your publishing advisor.
      </div>
    </div>
  );
};

export default BookPricingCalculator;
