import React from "react";

export default function MapSection() {
  return (
    <div className="card w-100 rounded-4">
      <div className="card-body">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3696.9253447749506!2d82.16809607562385!3d22.090667879837856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a280b77153ee2bf%3A0xce5afe2a97af3202!2sAnand%20Tiffin%20Center%20%26%20Catering%20Services!5e0!3m2!1sen!2sin!4v1741366226068!5m2!1sen!2sin"
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
