import React from 'react'

export default function About() {
  return (
    <section className="book-section section-padding" id="section_2">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-12">
            <img
              src="images/tablet-screen-contents.jpg"
              className="img-fluid"
              alt="Book Preview"
            />
          </div>

          <div className="col-lg-6 col-12">
            <div className="book-section-info">
              <h6>Modern &amp; Creative</h6>
              <h2 className="mb-4">About The Book</h2>

              <p>
                Credit goes to{" "}
                <a rel="nofollow" href="https://freepik.com" target="_blank">
                  FreePik
                </a>{" "}
                for images used in this ebook landing page template. You may
                browse FreePik to download more free images for your website.
              </p>

              <p>
                TemplateMo is one of the best websites to download free CSS
                templates for any purpose. This is an ebook landing page
                template using Bootstrap 5 CSS layout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
