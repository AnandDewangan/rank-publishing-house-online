import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const statsData = [
  { id: 1, icon: "bi-book-fill", label: "Books Published", value: 800, color: "text-danger" },
  { id: 2, icon: "bi-people-fill", label: "Satisfied Authors", value: 650, color: "text-primary" },
  { id: 3, icon: "bi-globe-americas", label: "Countries Distribution", value: 150, color: "text-success" },
  { id: 4, icon: "bi-calendar-check-fill", label: "Years of Experience", value: 5, color: "text-warning" },
];

export default function WhyUs() {
  const [counters, setCounters] = useState(statsData.map((stat) => ({ ...stat, count: 0 })));

  useEffect(() => {
    const interval = setInterval(() => {
      setCounters((prevCounters) =>
        prevCounters.map((counter) =>
          counter.count < counter.value ? { ...counter, count: counter.count + 1 } : counter
        )
      );
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="section-about py-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <div className="mb-4">
              <h2 className="fs-2 mt-3 text-danger">Why Rank Publishing House?</h2>
              <h4 className="text-muted text-justify fs-6">
                Rank Publishing House provides you the platform, independence, and flexibility to create and share your
                vision with the world. We offer book publishing, cover designing, sales, and distribution services at
                the most economical prices.
              </h4>
              <Button variant="danger" href="/about-us">
                Learn More
              </Button>
            </div>
          </Col>
          <Col md={6} className="mt-4">
            <Row>
              {counters.map((stat) => (
                <Col sm={6} key={stat.id} className="text-center mb-4">
                  <i className={`bi ${stat.icon} ${stat.color}`} style={{ fontSize: "40px" }}></i>
                  <h2 className={`counter-number fw-bold ${stat.color}`}>{stat.count}+</h2>
                  <h5 className={`${stat.color}`}>{stat.label}</h5>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
