import React, { useEffect, useState } from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;
export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/feedbacks`);
      setTestimonials(res.data);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    }
  };

  return (
    <section id="testimonial" className="py-5 bg-light">
      <Container>
        <div className="text-center mb-5">
          <h2 className="text-danger fs-2">
            More Testimonials from our Authors
          </h2>
          <h6 className="text-muted">
            Real stories from satisfied happy writers sharing their experiences
          </h6>
        </div>
        <Carousel fade indicators={false} controls>
          {testimonials.map((testimonial, index) => (
            <Carousel.Item key={index}>
              <blockquote className="text-center">
                <Row className="justify-content-center">
                  <Col md={8}>
                    <p className="fs-5 fst-italic">{testimonial.message}</p>
                    <strong className="d-block mt-3 text-primary">
                      {testimonial.author}
                    </strong>
                  </Col>
                </Row>
              </blockquote>
            </Carousel.Item>
          ))}
        </Carousel>
        <Row className="mt-5">
          <Col md={4}>
            <h6 className="text-danger">Worldwide Distribution Network</h6>
          </Col>
          <Col md={8}>
            <Row className="d-flex align-items-center justify-content-around flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <Col key={num} xs={6} sm={2} className="brand-logo">
                  <img
                    src={`/images/brand-logo/img-${num}.png`}
                    className="img-fluid"
                    alt={`Brand ${num}`}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
