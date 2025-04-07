import React from 'react'
import AuthorRoyaltyHeader from './AuthorRoyaltyHeader'
import SuggestedPriceCalculator from './SuggestedPriceCalculator'
import EbookEarningsCalculator from './EbookEarningsCalculator'
import FAQSection from './FAQSection'
import BookPricingCalculator from './BookPricingCalculator'

export default function RoyaltyCalculate() {
  return (
    <>
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
