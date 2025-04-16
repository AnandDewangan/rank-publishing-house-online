import React from "react";
import AuthorChart from "./AuthorChart";
import AuthorMonthlyChart from "./AuthorMonthlyChart";
import AuthorSalesChart from "./AuthorSalesChart";

export default function Home() {
  return (
    <main className="main-wrapper">
      <div className="main-content">
        <div className="row">
          <div className="col-xxl-12">
            <AuthorChart />
          </div>
          <div className="col-lg-4 d-flex align-items-stretch">
            <AuthorSalesChart />
          </div>
          <div className="col-lg-8">
            <AuthorMonthlyChart />
          </div>
        </div>
      </div>
    </main>
  );
}
