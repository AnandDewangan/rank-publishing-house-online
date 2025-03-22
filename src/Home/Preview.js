import React, { useEffect } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Preview() {
  useEffect(() => {
    // Initialize Bootstrap ScrollSpy
    document.body.setAttribute("data-bs-spy", "scroll");
    document.body.setAttribute("data-bs-target", "#navbar-example3");
    document.body.setAttribute("data-bs-offset", "0");
  }, []);

  return (
    <section>
      <Container>
        <Row>
          <Col lg={12} className="text-center">
            <h6>What's inside?</h6>
            <h2 className="mb-5">Preview at glance</h2>
          </Col>

          {/* Navigation Bar */}
          <Col lg={4} className="col-12">
            <Nav id="navbar-example3" className="flex-column nav-pills">
              <Nav.Link className="smoothscroll" href="#item-1">
                Introduction
              </Nav.Link>
              <Nav.Link className="smoothscroll" href="#item-2">
                Chapter 1: <strong>Win back your time</strong>
              </Nav.Link>
              <Nav.Link className="smoothscroll" href="#item-3">
                Chapter 2: <strong>Work less, do more</strong>
              </Nav.Link>
              <Nav.Link className="smoothscroll" href="#item-4">
                Chapter 3: <strong>Delegate</strong>
              </Nav.Link>
              <Nav.Link className="smoothscroll" href="#item-5">
                Chapter 4: <strong>Habits</strong>
              </Nav.Link>
            </Nav>
          </Col>

          {/* ScrollSpy Content */}
          <Col lg={8} className="col-12">
            <div
              data-bs-spy="scroll"
              data-bs-target="#navbar-example3"
              data-bs-smooth-scroll="true"
              className="scrollspy-example-2"
              tabIndex="0"
            >
              {/* Section 1: Introduction */}
              <div className="scrollspy-example-item" id="item-1">
                <h5>Introducing ebook</h5>
                <p>This ebook landing page is good to use for any purpose.</p>
                <p>
                  <strong>What is Content Marketing?</strong> If you are
                  wondering what content marketing is all about, this is the
                  place to start.
                </p>
                <blockquote className="blockquote">
                  Lorem Ipsum dolor sit amet, consectetur adipsicing kengan omeg
                  kohm tokito
                </blockquote>
                <p>
                  When you need free HTML CSS templates, please visit Templatemo
                  website.
                </p>
              </div>

              {/* Section 2: Win back your time */}
              <div className="scrollspy-example-item" id="item-2">
                <h5>Win back your time</h5>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
                <Row>
                  <Col lg={6} md={6} xs={12} className="mb-3">
                    <img
                      src="images/portrait-mature-smiling-authoress-sitting-desk.jpg"
                      className="img-fluid"
                      alt=""
                    />
                  </Col>
                  <Col lg={6} md={6} xs={12} className="mb-3">
                    <img
                      src="images/businessman-sitting-by-table-cafe.jpg"
                      className="img-fluid"
                      alt=""
                    />
                  </Col>
                </Row>
              </div>

              {/* Section 3: Work less, do more */}
              <div className="scrollspy-example-item" id="item-3">
                <h5>Work less, do more</h5>
                <p>
                  Credit goes to{" "}
                  <a rel="nofollow" href="https://freepik.com" target="_blank">
                    FreePik
                  </a>{" "}
                  for images used in this template.
                </p>
                <Row className="align-items-center">
                  <Col lg={6} xs={12}>
                    <img
                      src="images/tablet-screen-contents.jpg"
                      className="img-fluid"
                      alt=""
                    />
                  </Col>
                  <Col lg={6} xs={12}>
                    <p>Modern ebook ever</p>
                    <p>
                      <strong>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit.
                      </strong>
                    </p>
                  </Col>
                </Row>
              </div>

              {/* Section 4: Delegate */}
              <div className="scrollspy-example-item" id="item-4">
                <h5>Delegate</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                <img
                  src="images/portrait-mature-smiling-authoress-sitting-desk.jpg"
                  className="img-fluid mb-3"
                  alt=""
                />
              </div>

              {/* Section 5: Habits */}
              <div className="scrollspy-example-item" id="item-5">
                <h5>Habits</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                <blockquote className="blockquote">
                  Lorem Ipsum dolor sit amet, consectetur adipsicing kengan omeg
                  kohm tokito
                </blockquote>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
