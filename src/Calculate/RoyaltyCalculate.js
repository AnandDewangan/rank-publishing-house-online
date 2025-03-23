import React from 'react'
import AuthorRoyaltyHeader from './AuthorRoyaltyHeader'
import ProductionCostCalculator from './ProductionCostCalculator'
import PaperbackEarningsCalculator from './PaperbackEarningsCalculator'
import SuggestedPriceCalculator from './SuggestedPriceCalculator'
import EbookEarningsCalculator from './EbookEarningsCalculator'
import FAQSection from './FAQSection'

export default function RoyaltyCalculate() {
  return (
    <>
    <AuthorRoyaltyHeader />
    <div className="row m-auto">
        <ProductionCostCalculator />
        <PaperbackEarningsCalculator />
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
