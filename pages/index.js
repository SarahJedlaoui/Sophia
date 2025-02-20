import {
  FAQ,
  FeaturedArtworks,
  Footer,
  Hero,
  Navbar2,
  HowItWorks,
  WhyChooseSophia,
  EmpowerSection,
  FAQSection,
  VideoSection
} from '@/components';
import React from 'react';
const Home = () => {
  return (
    <div className='h-full main_bg text-white overflow-hidden' id='top'>
      <Navbar2 />
      <Hero />
      <VideoSection/>
      <FAQ />
      <HowItWorks />
      <FeaturedArtworks />
      <WhyChooseSophia />
      <EmpowerSection/>
      <FAQSection/>
      <Footer />
    </div>
  );
};

export default Home;
