import React from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Footer() {
  return (
    <section className="contact-section section-padding" id="section_5">
      <Container>
        <Row>
          {/* Ebook Download Form */}
          <Col lg={5} xs={12} className="mx-auto">
            <Form className="custom-form ebook-download-form bg-white shadow">
              <div className="text-center mb-5">
                <h2 className="mb-1">Get your free ebook</h2>
              </div>

              <div className="ebook-download-form-body">
                <InputGroup className="mb-4">
                  <Form.Control
                    type="text"
                    id="ebook-form-name"
                    placeholder="Your Name"
                    required
                  />
                  <InputGroup.Text>
                    <i className="custom-form-icon bi-person"></i>
                  </InputGroup.Text>
                </InputGroup>

                <InputGroup className="mb-4">
                  <Form.Control
                    type="email"
                    id="ebook-email"
                    pattern="[^ @]*@[^ @]*"
                    placeholder="your@company.com"
                    required
                  />
                  <InputGroup.Text>
                    <i className="custom-form-icon bi-envelope"></i>
                  </InputGroup.Text>
                </InputGroup>

                <Col lg={8} md={10} xs={8} className="mx-auto">
                  <Button type="submit" className="form-control">
                    Download ebook
                  </Button>
                </Col>
              </div>
            </Form>
          </Col>

          {/* Contact Details */}
          <Col lg={6} xs={12}>
            <h6 className="mt-5">Say hi and talk to us</h6>
            <h2 className="mb-4">Contact</h2>

            <p className="mb-3">
              <i className="bi-geo-alt me-2"></i> London, United Kingdom
            </p>

            <p className="mb-2">
              <a href="tel:010-020-0340" className="contact-link">
                010-020-0340
              </a>
            </p>

            <p>
              <a href="mailto:info@company.com" className="contact-link">
                info@company.com
              </a>
            </p>

            {/* Social Links */}
            <h6 className="site-footer-title mt-5 mb-3">Social</h6>
            <ul className="social-icon mb-4">
              <li className="social-icon-item">
                <a href="#" className="social-icon-link bi-instagram"></a>
              </li>
              <li className="social-icon-item">
                <a href="#" className="social-icon-link bi-twitter"></a>
              </li>
              <li className="social-icon-item">
                <a href="#" className="social-icon-link bi-facebook"></a>
              </li>
              <li className="social-icon-item">
                <a href="#" className="social-icon-link bi-whatsapp"></a>
              </li>
            </ul>

            {/* Copyright Info */}
            <p className="copyright-text">
              Copyright © 2048 ebook company <br />
              <a rel="nofollow" href="https://templatemo.com" target="_blank">
                designed by templatemo
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
