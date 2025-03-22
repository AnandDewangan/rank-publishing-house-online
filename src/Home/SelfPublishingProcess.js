import React, { useEffect, useState } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const steps = [
  {
    id: "item-1",
    title: "Registration and Consultation",
    description:
      "Begin your publishing journey by completing a simple registration form. Our expert book publishing consultant will connect with you to discuss your manuscript and provide you with the best-suited publishing proposal.",
    img: "/images/publish/registration.png",
  },
  {
    id: "item-2",
    title: "Editing and Proofreading",
    description:
      "Ensure your manuscript meets professional standards with our expert editing and proofreading services. We refine your content, correct errors, and enhance readability to prepare it for publication.",
    img: "/images/publish/creativity.png",
  },
  {
    id: "item-3",
    title: "ISBN Allocation and Copyright Registration",
    description:
      "To safeguard your intellectual property, Rank Publishing House facilitates ISBN allocation and copyright registration, ensuring your book is legally protected and globally recognized.",
    img: "/images/publish/typewriter.png",
  },
  {
    id: "item-4",
    title: "Design and Formatting",
    description:
      "Once the proposal is finalized, submit your manuscript along with design preferences for the book cover. At Rank Publishing House, our team ensures professional formatting and a visually compelling design to enhance your book’s appeal.",
    img: "/images/publish/article.png",
  },
  {
    id: "item-5",
    title: "Review and Approval",
    description:
      "At Rank Publishing House, you will be assigned a dedicated Publishing Manager to oversee your book’s production. The finalized interior layout and cover design will be shared with you for thorough review and approval, ensuring your vision is perfectly captured before moving forward.",
    img: "/images/publish/rating.png",
  },
  {
    id: "item-6",
    title: "Pre Order, Launch and Distribution",
    description:
      "Once you provide your final approval, Rank Publishing House will proceed with printing and global distribution. Your book will be made available as a paperback and eBook across leading platforms, ensuring worldwide reach and accessibility.",
    img: "/images/publish/reading-book.png",
  },
  {
    id: "item-7",
    title: "Marketing and Promotions",
    description:
      "Rank Publishing House offers comprehensive online book promotions to maximize your book’s visibility. Our team provides strategic marketing support along with engaging visual creatives to enhance audience reach and drive sales.",
    img: "/images/publish/marketing.png",
  },
  {
    id: "item-8",
    title: "Author Branding and PR",
    description:
      "We help authors establish a strong personal brand through PR campaigns, media outreach, and interviews, ensuring greater recognition and engagement with readers.",
    img: "/images/publish/branding.png",
  },
  {
    id: "item-9",
    title: "Royalty and Support",
    description:
      "At Rank Publishing House, authors receive exclusive access to a dedicated author dashboard for real-time royalty tracking and support. Royalty payments are processed on a monthly cycle, ensuring transparency and timely earnings.",
    img: "/images/publish/support.png",
  },
];

export default function Preview() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = "";
      steps.forEach((step) => {
        const element = document.getElementById(step.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = step.id;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section>
      <Container>
        <Row>
          <Col lg={12} className="text-center">
            <h2 className="text-danger">The Self Publishing Process</h2>
            <h6>How To Self Publish Your Book</h6>
          </Col>

          {/* Navigation Bar */}
          <Col lg={4} className="col-12">
            <Nav className="flex-column nav-pills">
              {steps.map((step) => (
                <Nav.Link
                  key={step.id}
                  href={`#${step.id}`}
                  className={`smoothscroll ${
                    activeSection === step.id ? "active bg-danger text-white" : ""
                  }`}
                >
                  {step.title}
                </Nav.Link>
              ))}
            </Nav>
          </Col>

          {/* ScrollSpy Content */}
          <Col lg={8} className="col-12">
            <div className="scrollspy-example-2" tabIndex="0">
              {steps.map((step) => (
                <div key={step.id} className="scrollspy-example-item mb-5" id={step.id}>
                  <h5 class="text-danger">{step.title}</h5>
                  <p>{step.description}</p>
                  <div className="text-center">
                    <img src={step.img} className="img-fluid mb-3" alt={step.title} width={250} />
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
