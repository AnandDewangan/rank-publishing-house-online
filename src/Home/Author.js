import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Author() {
  return (
    <section className="author-section section-padding" id="section_3">
      <Container>
        <Row>
          <Col lg={6} xs={12}>
            <Image
              src="images/portrait-mature-smiling-authoress-sitting-desk.jpg"
              className="author-image img-fluid"
              alt="Author"
            />
          </Col>

          <Col lg={6} xs={12} className="mt-5 mt-lg-0">
            <h6>Meet Author</h6>
            <h2 className="mb-4">Prof. Sophia</h2>
            <p>
              This is an ebook landing page template with Bootstrap 5 CSS
              framework. It is easy to customize with the use of Bootstrap CSS
              classes.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consive adipisicing elit, sed do
              eiusmod. Tempor incididunt ut labore.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
