import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AuthorHeader() {
  return (
    <section className="section p-5 mt-5">
      <div className="container text-center">
        <h2 className="fs-2 mt-3 fw-bold">
          Publish Your Dream Book with{" "}
          <span className="text-danger">Rank Publishing House</span>
        </h2>
        <h6 className="text-muted">
          Your journey as an author starts here! 📖 Join hands with us and turn
          your manuscript into a masterpiece.
        </h6>
      </div>

      <p className="px-lg-6 text-secondary">
        <i className="bi bi-book-half me-2"></i>
        At <strong>Rank Publishing House</strong>, we believe that every story
        deserves to be heard. Whether you are a first-time author or an
        experienced writer, we make the publishing process **smooth, fast, and
        hassle-free**. Take the first step towards becoming a **published
        author** today!
      </p>
    </section>
  );
}
