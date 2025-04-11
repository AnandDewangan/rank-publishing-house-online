import React from 'react'
import AuthorRoyaltyHeader from './AuthorRoyaltyHeader'
import SuggestedPriceCalculator from './SuggestedPriceCalculator'
import EbookEarningsCalculator from './EbookEarningsCalculator'
import FAQSection from './FAQSection'
import BookPricingCalculator from './BookPricingCalculator'
import { Helmet } from "react-helmet";

export default function RoyaltyCalculate() {
  return (
    <>
    <Helmet>
  <title>100% Royalty on Book Sales | RANK Publishing House</title>
  <meta 
    name="description" 
    content="Get the highest royalty in the publishing industry. RANK Publishing House offers authors 100% royalty, cheap printing cost, and transparent profit sharing. Publish and earn more!" 
  />
  <meta 
    name="keywords" 
    content="book royalty calculator, 100% book royalty, best royalty for authors, publish book with profit, author earnings, self publishing India" 
  />
  <meta property="og:title" content="Author Royalty | Earn 100% Profit" />
  <meta property="og:description" content="Maximize your book earnings with RANK Publishing House. We offer unmatched 100% royalty and best publishing support." />
  <meta property="og:image" content="/favicon.png" />
  <meta property="og:url" content="https://www.rankpublishinghouse.online/author-royalty" />
  <meta property="og:type" content="website" />
  <link rel="canonical" href="https://www.rankpublishinghouse.online/author-royalty" />
</Helmet>
    <AuthorRoyaltyHeader />
    <div className="row m-auto">
      <BookPricingCalculator />
    </div>
    <h4 className="text-danger text-center my-5 fs-2">Calculate Ebook Earnings</h4>
    <div className="row m-auto">
        <SuggestedPriceCalculator />
        <EbookEarningsCalculator />
    </div>
    <FAQSection />
    </>
  )
}
