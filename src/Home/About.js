import React from 'react'
import LeadForm from './LeadForm'
import WhoWeAre from './WhoWeAre'
import CallNow from './CallNow'

export default function About() {
  return (
    <section className="book-section section-padding" id="section_2">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-12">
            <LeadForm />
            <CallNow />
          </div> 
          <div className="col-lg-8 col-12">
            <WhoWeAre />
          </div>
        </div>
      </div>
    </section>
  )
}
