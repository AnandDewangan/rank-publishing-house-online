import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const features = [
  {
    icon: "bi-fast-forward",
    title: "Fast Publishing",
    color: "text-success",
    description: "Publish your book in just two weeks. Superfast publishing process.",
  },
  {
    icon: "bi-book",
    title: "Paperback & eBook",
    color: "text-danger",
    description: "Publish in both paperback & eBook formats worldwide.",
  },
  {
    icon: "bi-bar-chart",
    title: "Live Dashboard",
    color: "text-primary",
    description: "Track your sales report with our live dashboard.",
  },
  {
    icon: "bi-currency-rupee",
    title: "100% Royalty",
    color: "text-warning",
    description: "100% royalty on each sale. Earn maximum profit with us.",
  },
];

export default function Features() {
  return (
    <section id="features" className="pt-5 bg-light">
      <Container>
        <div className="text-center mb-5">
          <h2 className="fs-2 text-danger">Book Publisher In India</h2>
          <h6 className="text-muted">
            Rank Publishing House helps writers publish and sell books worldwide in both paperback & eBook versions.
          </h6>
        </div>
        <Row>
          {features.map((feature, index) => (
            <Col key={index} md={6} lg={3} className="text-center mb-4">
              <div className={`feature-icon ${feature.color} mb-3`}>
                <i className={`bi ${feature.icon} fs-1`}></i>
              </div>
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
