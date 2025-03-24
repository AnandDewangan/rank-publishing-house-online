import React from "react";
import HeroSection from "./HeroSection";
import SelfPublishingProcess from "./SelfPublishingProcess";
import FeaturedBook from "../pages/FeaturedBook";
import PricingTable from "../pages/PricingTable";

export default function Publish() {
  return (
    <>
      <HeroSection />
      <SelfPublishingProcess />
      <PricingTable />
      <FeaturedBook />
    </>
  );
}
