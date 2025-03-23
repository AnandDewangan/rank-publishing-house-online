import React from "react";
import HeroSection from "./HeroSection";
import SelfPublishingProcess from "./SelfPublishingProcess";
import LeadForm from "../About/LeadForm";
import CallNow from "../About/CallNow";
import WhoWeAre from "../About/WhoWeAre";
import FeaturedBook from "../pages/FeaturedBook";
import PricingTable from "../pages/PricingTable";

export default function Publish() {
  return (
    <>
      <HeroSection />
      <div className="row m-auto">
        <div className="col-lg-4 col-12">
          <LeadForm />
          <CallNow />
        </div>
        <div className="col-lg-8 col-12">
          <WhoWeAre />
        </div>
      </div>
      <SelfPublishingProcess />
      <PricingTable />
      <FeaturedBook />
    </>
  );
}
