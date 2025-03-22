import React from 'react'
import LeadForm from './LeadForm'
import WhoWeAre from './WhoWeAre'

export default function About() {
  return (
    <section className="book-section section-padding" id="section_2">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-12">
            <LeadForm />
          </div>

          <div className="col-lg-8 col-12">
            <WhoWeAre />
          </div>
        </div>
      </div>
    </section>
  )
}
