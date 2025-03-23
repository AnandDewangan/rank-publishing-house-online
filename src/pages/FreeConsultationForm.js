import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./FreeConsultationForm.css";

const FreeConsultationForm = () => {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const lastShown = localStorage.getItem("popupShownTime");
    const currentTime = new Date().getTime();
    const oneDay = 2 * 60 * 60 * 1000;

    if (!lastShown || currentTime - lastShown > oneDay) {
      const timer = setTimeout(() => {
        setShowForm(true);
        document.body.style.overflow = "hidden";
        localStorage.setItem("popupShownTime", currentTime);
      }, 10000);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "auto";
      };
    }
  }, []);

  if (!showForm) return null;

  return (
    <div className="modal-overlay">
      <Button className="close-btn btn-outline-warning" onClick={() => { 
        setShowForm(false);
        document.body.style.overflow = "auto";
      }}>
        <i className="bi bi-x-lg"></i>
      </Button>

      <Container id="free-consultation-form" className="p-4" style={{ maxWidth: "900px" }}>
        <Row className="p-4 bg-white d-flex align-items-center justify-content-center rounded shadow">
          <Col md={6} className="text-center">
            <img
              src="https://www.orangebooks.in/assets/images/modal/free-consultation.png"
              alt="Free Consultation"
              className="img-fluid"
            />
          </Col>
          <Col md={6} className="p-4">
            <h2 className="mb-2">
              <small>Get Free Publishing</small> <br /> Consultation Now!
            </h2>
            <p className="mb-4">Sign Up with us and get a free book publishing consultation from our experts.</p>
            <p className="mb-4 lead">
              <strong>Also, get a chance to win Upto <span style={{ color: "#ED6926" }}>25% OFF</span> on all Publishing Plans.</strong>
            </p>
            <Form action="https://www.orangebooks.in/form-submit" method="post">
              <Form.Group className="mb-3">
                <InputGroup>
                  <InputGroup.Text><i className="bi bi-person-fill"></i></InputGroup.Text>
                  <FormControl type="text" placeholder="Your Full Name" required />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <InputGroup>
                  <InputGroup.Text><i className="bi bi-envelope-fill"></i></InputGroup.Text>
                  <FormControl type="email" placeholder="Your Email" required />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <InputGroup>
                  <InputGroup.Text><i className="bi bi-telephone-fill"></i></InputGroup.Text>
                  <FormControl type="tel" pattern="[6-9]{1}[0-9]{9}" placeholder="Your Phone Number" required />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Select required>
                  <option value="">Your Publishing Budget</option>
                  <option value="Rs. 8000 - Rs. 10000">Rs. 8000 - Rs. 10,000</option>
                  <option value="Rs. 14,000 - Rs. 15,000">Rs. 14,000 - Rs. 15,000</option>
                  <option value="Rs. 20,000 - Rs. 25,000">Rs. 20,000 - Rs. 25,000</option>
                  <option value="Rs. 30,000 - Rs. 40,000">Rs. 30,000 - Rs. 40,000</option>
                  <option value="Above Rs. 50,000">Above Rs. 50,000</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Select required>
                  <option value="">Your Manuscript Status</option>
                  <option value="Want to start the process today.">Want to start the process today.</option>
                  <option value="Want to start the process within a week.">Want to start the process within a week.</option>
                  <option value="It will take a month to get ready.">It will take a month to get ready.</option>
                </Form.Select>
              </Form.Group>

              <Button type="submit" className="btn bg-color text-white w-100 py-2">
                Sign Up & Get Your Discount Today!
              </Button>
            </Form>
            <div className="text-center mt-3">
              <a href="/" className="text-black-50"><small><u>No, I Don't Want Discount</u></small></a>
            </div>
            <hr />
            <small>
              This site is protected by reCAPTCHA and the Google
              <a href="https://policies.google.com/privacy"> Privacy Policy</a> and
              <a href="https://policies.google.com/terms"> Terms of Service</a> apply.
            </small>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FreeConsultationForm;
