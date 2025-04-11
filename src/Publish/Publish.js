import React from "react";
import HeroSection from "./HeroSection";
import SelfPublishingProcess from "./SelfPublishingProcess";
import FeaturedBook from "../pages/FeaturedBook";
import PricingTable from "../pages/PricingTable";
import { Helmet } from "react-helmet";

export default function Publish() {
  return (
    <>
      <Helmet>
        <title>
          How to Publish a Book | Publish with Rank Publishing House
        </title>
        <meta
          name="description"
          content="Learn how to publish a book with Rank Publishing House. Get full support, quick publishing, affordable pricing, and 100% author royalty."
        />
        <meta
          name="keywords"
          content="how to publish a book, book publishing in India, self publishing, cheap book publishing, publish your own book, Rank Publishing House"
        />
        <meta
          property="og:title"
          content="How to Publish a Book - Rank Publishing House"
        />
        <meta
          property="og:description"
          content="Rank Publishing House makes publishing easy, fast, and affordable. Get full author support and sell your book worldwide."
        />
      </Helmet>

      <HeroSection />
      <SelfPublishingProcess />
      <PricingTable />
      <FeaturedBook />
    </>
  );
}
