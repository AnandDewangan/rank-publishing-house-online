import React from "react";

export default function MapSection() {
  return (
    <div className="card w-100 rounded-4">
      <div className="card-body">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3696.8841103054274!2d82.16962157562385!3d22.092242379836787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a280bc3b8e34aed%3A0x7ebc4188a331f11b!2sRank%20Publishing%20House!5e0!3m2!1sen!2sin!4v1744966633741!5m2!1sen!2sin"
          width="100%"
          height="450"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          className="rounded-3"
        ></iframe>
      </div>
    </div>
  );
}
