import React from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AuthorContactForm = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "400px", padding: "20px", borderRadius: "15px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
        <h3 className="text-center mb-4">Contact Us</h3>
        <Form>
          <Form.Group controlId="authorName">
            <Form.Label>Author Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" required />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" required />
          </Form.Group>

          <Form.Group controlId="phone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="tel" placeholder="Enter your phone number" required />
          </Form.Group>

          <Form.Group controlId="message">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Write your message" required />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-3">
            Submit
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AuthorContactForm;
