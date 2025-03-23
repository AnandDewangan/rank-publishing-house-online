import React from 'react';
import LeadForm from './LeadForm';
import WhoWeAre from './WhoWeAre';
import CallNow from './CallNow';
import Features from '../pages/Features';
import FeaturedBook from '../pages/FeaturedBook';
import WhyUs from '../pages/WhyUs';

export default function About() {
  return (
    <>
    <section className="section-padding mt-5 pb-0" id="section_2"> 
      <div className="container">
        <div className="row m-auto">
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
    <WhyUs />
    <Features /> 
    <FeaturedBook />
    </>
  )
}
