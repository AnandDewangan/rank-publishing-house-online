import React from "react";
import Hero from "../pages/Hero.js";
import WhyUs from "../pages/WhyUs.js";
import FeaturedBook from "../pages/FeaturedBook.js";
import Testimonials from "../pages/Testimonials.js";
import LeadForm from "../About/LeadForm.js";
import CallNow from "../About/CallNow.js";
import WhoWeAre from "../About/WhoWeAre.js";
import PricingTable from "../pages/PricingTable.js";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyUs />
      <div className="row m-auto">
        <div className="col-lg-4 col-12">
          <LeadForm />
          <CallNow />
        </div>
        <div className="col-lg-8 col-12">
          <WhoWeAre />
        </div>
      </div>
      <PricingTable />
      <Testimonials />
      <FeaturedBook />
    </>
  );
}
