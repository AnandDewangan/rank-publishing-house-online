import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Footer() {
  return (
    <>
      {/* Contact & Ebook Section */}
      <section className="contact-section section-padding bg-dark text-light" id="section_5">
        <Container>
          <Row className="align-items-center">
            {/* Ebook Download Form */}
            <Col lg={5} xs={12} className="mx-auto">
              <div className="badge bg-danger px-3 py-2">Publish Now</div>
              <Form action="https://www.orangebooks.in/form-submit" method="post" className="custom-form ebook-download-form bg-white shadow p-4">
                <h4 className="text-center text-dark mb-3">Get a Free Consultation</h4>
                <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="Your Full Name" required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control type="email" placeholder="Your Email" required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control type="tel" pattern="[6-9]{1}[0-9]{9}" placeholder="Your Phone Number" required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Select required>
                    <option>Your Publishing Budget</option>
                    <option value="8000-10000">Rs. 8000 - Rs. 10000</option>
                    <option value="14000-15000">Rs. 14,000 - Rs. 15,000</option>
                    <option value="20000-25000">Rs. 20,000 - Rs. 25,000</option>
                    <option value="30000-40000">Rs. 30,000 - Rs. 40,000</option>
                    <option value="50000+">Above Rs. 50,000</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Select required>
                    <option>Your Manuscript Status</option>
                    <option value="start-now">Want to start the process today.</option>
                    <option value="start-week">Want to start within a week.</option>
                    <option value="month-ready">It will take a month to get ready.</option>
                  </Form.Select>
                </Form.Group>

                <Button type="submit" className="btn btn-danger w-100">
                  Sign Up For <b>Free Consultation</b>
                </Button>
              </Form>
            </Col>

            {/* Contact Details */}
            <Col lg={6} xs={12}>
              <h3 className="text-danger">Still not sure how to get your book published?</h3>
              <p className="fs-6">
                Want to discuss the packages and publication procedure? <br />
                Talk to our Publishing Consultant or simply register with us to get started!
              </p>

              <p className="mb-3 social-link whatsapp">
                <i className="bi bi-geo-alt me-2"></i> <a className="contact-link text-light" target="_blank">Bilaspur, Chhattisgarh (495001)</a>
              </p>

              <p className="mb-2 social-link facebook">
              <i className="bi bi-telephone-fill me-2"></i><a href="tel:+919171242297" className="contact-link text-light">+91 91712-42297</a>
              </p>

              <p className=" social-link instagram">
              <i className="bi bi-envelope-fill me-2"></i><a href="mailto:books@rankpublishinghouse.online" className="contact-link text-light">books@rankpublishinghouse.online</a>
              </p>

              {/* Social Links */}
              <h6 className="site-footer-title mt-5 mb-3 text-danger">Social</h6>
              <div className="d-flex gap-3">
                <a href="#" className="bi bi-instagram fs-3 text-light social-link instagram"></a>
                <a href="#" className="bi bi-twitter fs-3 text-light social-link twitter"></a>
                <a href="#" className="bi bi-facebook fs-3 text-light social-link facebook"></a>
                <a href="#" className="bi bi-whatsapp fs-3 text-light social-link whatsapp"></a>
              </div>

              {/* Copyright Info */}
              <p className="copyright-text mt-4">
                Copyright © 2025 Rank Publishing House <br />
              </p>
            </Col>
          </Row>
        </Container>
      </section> 
    </>
  );
}
