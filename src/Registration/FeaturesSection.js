import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function FeaturesSection() {
  return (
    <section className="section" style={{ backgroundColor: "#fdefe0" }}>
      <Container className="p-lg-0">
        <Row className="justify-content-between align-items-center py-4">
          {/* Left Section - Features */}
          <Col lg={7} md={7} className="mt-0 mt-md-4 pr-lg-6">
            <div className="mb-4">
              <h3>
                <i className="bi bi-cash-coin me-2 text-success"></i> 100% Author Royalty
              </h3>
              <p>
                Earn 100% of the net profits on every book you sell. Our distributor network will enable
                you to build an author brand and create growth-hacking strategies.
              </p>
            </div>

            <div className="mb-4">
              <h3>
                <i className="bi bi-bar-chart-line me-2 text-primary"></i> Monthly Sales & Payout
              </h3>
              <p>
                Check how many books you have sold on a monthly basis instead of waiting for statements and
                get your royalty paid every month for every sold book.
              </p>
            </div>

            <div className="mb-4">
              <h3>
                <i className="bi bi-globe-americas me-2 text-danger"></i> Worldwide Distribution
              </h3>
              <p>
                We make your book available in up to 150+ countries as paperback and eBook. We are in
                partnership with the largest global book distribution networks.
              </p>
            </div>
          </Col>

          {/* Right Section - Call to Action */}
          <Col lg={5} md={5} className="mt-4 mt-md-0 text-center">
            <h2 className="ls-0 text-danger">Yet Not Convinced?</h2>
            <p className="text-muted mb-4">
              Have more queries? Register to get a complete publishing consultancy, from writing to
              publishing worldwide. Or check our FAQ section.
            </p>
            <Button
              variant="outline-danger"
              className="rounded-pill fw-semibold"
              href=""
            >
              <i className="bi bi-question-circle me-2"></i> Know More
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
