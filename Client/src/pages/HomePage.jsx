import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ServicesHighlight from '../components/home/ServicesHighlight';
import LabFacilities from '../components/home/LabFacilities';
import StatsSection from '../components/home/StatsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import BlogSection from '../components/home/BlogSection';
import CtaSection from '../components/home/CtaSection';
// import NewsSection from '../components/news/NewsSection';
import { Helmet } from 'react-helmet';
import MostViewedPlans from '../components/home/mostViewedPlans';

function HomePage() {
  return (
    <>
      <Helmet>
        <title>MediLab | Professional Medical Laboratory Services</title>
        <meta name="description" content="MediLab offers comprehensive laboratory testing services with accurate results and quick turnaround times. Schedule your appointment today." />
      </Helmet>
      
      <HeroSection />
      <ServicesHighlight />
      <MostViewedPlans />
      <StatsSection />
      <LabFacilities />
      <TestimonialsSection />
      <BlogSection />
      <CtaSection />
    </>
  );
}

export default HomePage;