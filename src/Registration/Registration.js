import React from "react";
import AuthorHeader from "./AuthorHeader";
import AuthorRegistration from "./AuthorRegistration";
import FeaturesSection from "./FeaturesSection";
import { Helmet } from "react-helmet";

export default function Registration() {
  return (
    <>
      <Helmet>
        <title>Register as an Author | RANK Publishing House</title>
        <meta
          name="description"
          content="Become a published author with RANK Publishing House. Easy registration, fast publishing, and full support at every step."
        />
        <meta
          name="keywords"
          content="publish book in India, author registration, book publishing platform, how to publish a book, cheap book publishing, self publishing India"
        />
        <meta property="og:title" content="Register as an Author" />
        <meta
          property="og:description"
          content="Join RANK Publishing House and turn your story into a book. Easy registration for authors."
        />
        <meta property="og:url" content="https://www.rankpublishinghouse.online/registration" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/favicon.png" />
        <link rel="canonical" href="https://www.rankpublishinghouse.online/registration" />
      </Helmet>

      <AuthorHeader />
      <AuthorRegistration />
      <FeaturesSection />
    </>
  );
}
