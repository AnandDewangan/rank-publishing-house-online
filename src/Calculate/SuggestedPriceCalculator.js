import React, { useState } from "react";

const SuggestedPriceCalculator = () => {
  const [bookSize, setBookSize] = useState("");
  const [pages, setPages] = useState("");
  const [spmrp, setSpmrp] = useState("");
  const [semrp, setSemrp] = useState("");

  const calculateSuggestedPrice = () => {
    const pageCount = parseFloat(pages);
    const size = parseInt(bookSize);

    if (!size || isNaN(pageCount) || pageCount < 35 || pageCount > 1200) {
      alert("Please select a valid book size and enter pages between 35 - 1200.");
      return;
    }

    let productionCost = 0;

    if (size === 1) {
      productionCost = 35 + 0.48 * pageCount;
    } else if (size === 2) {
      productionCost = 40 + 0.55 * pageCount;
    } else if (size === 3) {
      productionCost = 50 + 1.1 * pageCount;
    }

    const SSP = productionCost * 2.3;
    const ESSP = SSP * 0.5;

    setSpmrp(`₹${Math.round(SSP)}`);
    setSemrp(`₹${Math.round(ESSP)}`);
  };

  return (
    <div className="form-widget col-md-6 col-12 p-4">
      <div className="row shadow bg-light border m-0 p-0 rounded">
        <div className="col-lg-12 p-0">
          <div className="text-center p-3 rounded" style={{ background: "#fdefe0" }}>
            <h3 className="m-2 text-danger">3. Suggested Price</h3>
            <small>Use this tool to get the most suitable price suggested by OrangeBooks.</small>
          </div>

          <div className="row p-4">
            <div className="col-12 form-group">
              <div className="row">
                <label className="col-sm-5 col-form-label">Book Size:</label>
                <div className="col-sm-7">
                  <select
                    className="form-control required"
                    value={bookSize}
                    onChange={(e) => setBookSize(e.target.value)}
                  >
                    <option value="">Select Book Size</option>
                    <option value="1">5x8 in</option>
                    <option value="2">6x9 in</option>
                    <option value="3">8x11 in</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="col-12 form-group pb-1">
              <div className="row">
                <label className="col-sm-5 col-form-label">Number of Pages:</label>
                <div className="col-sm-7">
                  <input
                    type="number"
                    className="form-control required"
                    placeholder="Enter Total Pages"
                    value={pages}
                    onChange={(e) => setPages(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="col-12 d-flex justify-content-center align-items-center pt-2 pb-2">
              <button type="button" className="custom-btn rounded" onClick={calculateSuggestedPrice}>
                Calculate
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 pb-2 px-4 bg-light">
            {/* <div className="col-12 form-group">
              <div className="row">
                <label className="col-sm-8 col-form-label">Minimum Paperback MRP:</label>
                <div className="col-sm-4 font-weight-semibold">{spmrp}</div>
              </div>
            </div> */}
            <div className="col-12 form-group">
              <div className="row">
                <label className="col-sm-8 col-form-label">Suggested Ebook MRP:</label>
                <div className="col-sm-4 text-larger font-weight-semibold">{semrp}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center pt-4 text-muted" style={{ fontSize: "12px" }}>
        Suggested price is exclusive of taxes and handling charges. It is subject to change based on current market conditions.
      </div>
    </div>
  );
};

export default SuggestedPriceCalculator;
