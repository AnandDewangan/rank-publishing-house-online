import React from "react";
import LeadForm from "./LeadForm";
import WhoWeAre from "./WhoWeAre";
import CallNow from "./CallNow";
import Features from "../pages/Features";
import FeaturedBook from "../pages/FeaturedBook";
import WhyUs from "../pages/WhyUs";
import { Helmet } from "react-helmet";

export default function About() {
  return (
    <>
      <Helmet>
        <title>
          About Rank Publishing House | India’s Leading Book Publisher
        </title>
        <meta
          name="description"
          content="Rank Publishing House is one of India’s top publishing companies, known for bestselling books, thousands of happy customers, and unmatched quality."
        />
        <meta property="og:title" content="About Rank Publishing House" />
        <meta
          property="og:description"
          content="Discover why Rank Publishing House is the go-to publisher for top authors. Trusted by thousands of readers and loved for bestsellers."
        />
        <meta property="og:image" content="/favicon.png" />
        <meta
          name="keywords"
          content="Rank Publishing House, Best Publishing House in India, Book Publishers, Bestsellers, Top Indian Publisher, Author Publisher"
        />
      </Helmet>

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
  );
}
