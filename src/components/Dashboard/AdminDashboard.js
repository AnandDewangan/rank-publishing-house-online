import React from "react";
import BooksChart from "./BooksChart";
import BookSalesChart from "./BookSalesChart";
import SalesChart from "./SalesChart";

export default function Home() {
  return (
    <main className="main-wrapper">
      <div className="main-content">
        <div className="row">
          <div className="col-xxl-12">
            <BooksChart />
          </div>
          <div className="col-lg-4 d-flex align-items-stretch">
            <BookSalesChart />
          </div>
          <div className="col-lg-8">
            <SalesChart />
          </div>
        </div>
      </div>
    </main>
  );
}
