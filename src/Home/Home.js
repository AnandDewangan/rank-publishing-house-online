import React from 'react';
import Hero from './Hero';
import About from './About';
import FreeConsultationForm from './FreeConsultationForm';
import SelfPublishingProcess from './SelfPublishingProcess';
import Features from './Features';
import Testimonials from './Testimonials';
import WhyUs from './WhyUs';
import FeaturedBook from './FeaturedBook';

export default function Home() {
  return (
    <>
    <Hero /> 
    <WhyUs />
    <Features />
    <About /> 
    <SelfPublishingProcess />
    <Testimonials />
    <FeaturedBook />
    <FreeConsultationForm />
    </>
  )
}
