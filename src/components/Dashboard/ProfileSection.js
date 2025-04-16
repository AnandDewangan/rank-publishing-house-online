import React, { useState, useEffect } from "react";
import { FaPhoneAlt, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Modal } from "react-bootstrap";

export default function ProfileSection() {
  const [profile, setProfile] = useState({
    imageUrl: "",
    name: "",
    profession: "",
    coFounder: "",
    address: "",
    phone: "",
    email: "",
    linkedin: "",
  });
  const [showModal, setShowModal] = useState(false);
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  // ✅ Fetch Profile Data from API
  useEffect(() => {
    fetch(`${baseURL}/api/profile`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setProfile({
            imageUrl: data.profile_image || "assets/images/avatars/01.png",
            name: data.name || "User Name",
            profession: data.profession || "Full Stack Developer",
            coFounder: data.coFounder || "Anand Catering & Tiffin Service",
            address: data.address || "Sarkanda, Bilaspur (C.G.), 495001",
            phone: data.phone || "8963906336",
            email: data.email || "example@gmail.com",
            linkedin: data.linkedin || "https://www.linkedin.com",
          });
        }
      })
      .catch((error) => console.error("Error fetching profile data:", error));
  }, []);

  return (
    <>
      <div className="card w-100 overflow-hidden rounded-4">
        <div className="card-body position-relative p-4">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="d-flex align-items-center gap-3 mb-3">
                {profile.imageUrl ? (
                  <img
                    src={profile.imageUrl}
                    className="rounded-circle bg-grd-info p-1"
                    width="80"
                    height="80"
                    alt="user"
                    style={{ cursor: "pointer" }} // Cursor pointer for click effect
                    onClick={() => setShowModal(true)} // Open modal on click
                  />
                ) : null}
                <h3>{profile.name}</h3>
              </div>
              <div className="row">
                <div className="col-md-10 d-flex flex-column align-items-start gap-3">
                  <a
                    href={`tel:${profile.phone}`}
                    className="text-decoration-none text-dark d-flex align-items-center mb-2"
                  >
                    <FaPhoneAlt className="text-success me-2" size={24} />
                    &nbsp;&nbsp;&nbsp;{" "}
                    <h6>
                      <b>Profession</b> - {profile.profession}
                    </h6>
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none text-dark d-flex align-items-center mb-2"
                  >
                    <FaLinkedin className="text-info me-2" size={28} />
                    <h6>
                      &nbsp;&nbsp; <b>Co-Founder</b> - {profile.coFounder}
                    </h6>
                  </a>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-decoration-none text-dark d-flex align-items-center"
                  >
                    <FaEnvelope className="text-warning me-2" size={24} />
                    <h6>
                      &nbsp;&nbsp;&nbsp; <b>Address</b> - {profile.address}
                    </h6>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="welcome-back-img pt-4">
                <img
                  src="assets/images/gallery/welcome-back-3.png"
                  height="180"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Image Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body className="d-flex flex-column align-items-center">
          <button
            className="btn btn-danger align-self-end"
            onClick={() => setShowModal(false)}
          >X
          </button>
          <img
            src={profile.imageUrl}
            alt="user"
            className="img-fluid rounded"
            style={{ maxWidth: "90%", maxHeight: "80vh" }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
