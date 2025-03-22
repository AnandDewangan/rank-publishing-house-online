import React from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const testimonials = [
  {
    name: "Kamlesh Yadav",
    feedback:
      "Rank Publishing House turned my dream into reality! Their expert team provided seamless guidance from manuscript submission to final publishing. The marketing support was top-notch, and my book reached readers worldwide!",
  },
  {
    name: "Jay Goswami",
    feedback:
      "A truly exceptional publishing experience! The team at Rank Publishing House helped me refine my book, design a stunning cover, and successfully launch it on global platforms. Highly recommend their services!",
  },
  {
    name: "Jaypal Singh",
    feedback:
      "Professional, efficient, and committed! Rank Publishing House ensured my book had the perfect formatting, an eye-catching cover, and a marketing plan that boosted sales significantly. Their expertise made my publishing journey stress-free!",
  },
  {
    name: "Sudhir Shrivastav",
    feedback:
      "Publishing with Rank Publishing House was an absolute delight! Their dedicated team worked tirelessly to make my book shine. The author dashboard for tracking sales and royalties is a game-changer!",
  },
  {
    name: "Aashish Kumar",
    feedback:
      "From manuscript review to distribution, Rank Publishing House exceeded my expectations. Their publishing managers and marketing team provided invaluable support, making my book a success in the market!",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonial" className="py-5 bg-light">
      <Container>
        <div className="text-center mb-5">
          <h2 className="text-danger">More Testimonials from our Authors</h2>
          <h6>
            Real stories from satisfied happy writers sharing their experiences
          </h6>
        </div>
        <Carousel fade indicators={false} controls>
          {testimonials.map((testimonial, index) => (
            <Carousel.Item key={index}>
              <blockquote className="text-center">
                <Row className="justify-content-center">
                  <Col md={8}>
                    <p className="fs-5 fst-italic">{testimonial.feedback}</p>
                    <strong className="d-block mt-3 text-primary">
                      {testimonial.name}
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
            <Row className="d-flex align-items-center justify-content-around flex-wrap">
              {[1, 2, 3, 4, 5].map((num) => (
                <Col key={num} xs={6} sm={2} className="brand-logo">
                  <img
                    src={`/images/brand-logo/img-${num}.png`}
                    className="img-fluid grayscale"
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
