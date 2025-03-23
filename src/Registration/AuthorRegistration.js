import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AuthorRegistration() {
  return (
    <section className="section">
      <Container className="pb-lg-5 pb-md-3">
        <div className="col-12 form-widget p-4 vertical-middle">
          <Row className="shadow bg-light border m-0 pt-3 pt-lg-0 rounded">
            {/* Form */}
            <Form
              action="https://www.orangebooks.in/form-submit"
              method="post"
              className="col-12 px-lg-5 pt-lg-5 pb-lg-4"
              encType="multipart/form-data"
            >
              <input type="hidden" name="redirect_url" value="https://www.orangebooks.in/thankyou?utm_source=web&utm_medium=author_registration&utm_campaign=v2_web" />
              <input type="hidden" name="key" value="26a447f97b1a7565911bc3f7eaac3998" />

              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label><i className="bi bi-person-fill me-2"></i> Name*</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter your name" required />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label><i className="bi bi-envelope-fill me-2"></i> Email*</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter your email" required />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="pt-lg-2">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label><i className="bi bi-telephone-fill me-2"></i> Contact Number*</Form.Label>
                    <Form.Control type="tel" name="phonenumber" pattern="[6-9]{1}[0-9]{9}" placeholder="Enter your contact" required />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label><i className="bi bi-images me-2"></i> Does your book contain Images, Tables, Bullets, etc.?*</Form.Label>
                    <Form.Select name="form-cf-15" required>
                      <option disabled>Select One</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="pt-lg-2">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label><i className="bi bi-file-earmark-text-fill me-2"></i> Manuscript Status*</Form.Label>
                    <Form.Select name="form-cf-16" required>
                      <option disabled>Select One</option>
                      <option value="Ready">It is ready to publish</option>
                      <option value="Need one week">It will take a week to get ready</option>
                      <option value="Need one month">It will take a month to get ready</option>
                      <option value="Not ready">I'll publish later</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label><i className="bi bi-tag-fill me-2"></i> Select Package*</Form.Label>
                    <Form.Select name="form-cf-14" required>
                      <option disabled>Select One</option>
                      <option value="Silver (Starts @ Rs.5,999)">Classic (Starts @ Rs.5,999)</option>
                      <option value="Gold (Starts @ Rs.7,999)">Gold (Starts @ Rs.7,999)</option>
                      <option value="Platinum (Starts @ Rs.11,999)">Platinum (Starts @ Rs.11,999)</option>
                      <option value="Not-sure">Not sure yet</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="pt-lg-2">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label><i className="bi bi-file-earmark-ruled-fill me-2"></i> Approx. No. Of Pages*</Form.Label>
                    <Form.Control type="number" name="form-cf-17" placeholder="Enter pages in book" required />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label><i className="bi bi-upload me-2"></i> Upload 5-10 Pages Sample*</Form.Label>
                    <Form.Control type="file" name="file-input" accept=".jpg, .png, .jpeg, .doc, .docx, .pdf, .txt, .zip" required />
                    <small className="text-muted">[Upload Jpg/Png/Doc/Txt/Pdf | Max Size 5MB]</small>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="form-check pt-3">
                <Form.Check
                  type="checkbox"
                  label="Agree to terms and conditions."
                  name="form-cf-18"
                  required
                />
              </Form.Group>

              <Button type="submit" className="btn btn-danger btn-lg w-100 mt-3">
                <i className="bi bi-check-circle me-2"></i> Register With Us
              </Button>
            </Form>
          </Row>
        </div>
      </Container>
    </section>
  );
}
