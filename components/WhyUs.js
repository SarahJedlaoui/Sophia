import React from 'react';
import { Reveal } from 'react-awesome-reveal';
import { fadeInDownShorter2, fadeInUp } from '@/keyframes';
import Image from 'next/image';
const WhyChooseSophia = () => {
  const features = [
    {
      icon: '/icons/1.svg',
      title: 'Content Analysis',
      description: 'Transform podcasts, videos, Instagram Reels, and books into actionable coaching sessions.',
    },
    {
      icon: '/icons/2.svg',
      title: 'Interactive Tools',
      description: 'Engage with personalized question types like open-text, Likert-scale, and multiple-choice.',
    },
    {
      icon: '/icons/3.svg',
      title: 'Tailored Coaching Insights',
      description: 'Receive customized practice ideas and actionable steps based on your content.',
    },
    {
      icon: '/icons/4.svg',
      title: 'Session Refinement',
      description: 'Refine and save your practices for continuous growth.',
    },
  ];

  return (
    <div className="mb-44 scroll-mt-10">
      {/* Title Section */}
      <div className="text-center mb-8">
        <Reveal keyframes={fadeInDownShorter2} duration={800} delay={100}>
          <h2 className="font-bold text-3xl mb-4">Why Choose Sophia.ai?</h2>
        </Reveal>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[1200px] mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="rounded-lg bg-black p-6 shadow-lg border border-gray-700 flex flex-col justify-between h-full">
            <Reveal keyframes={fadeInUp} duration={800} delay={index * 100}>
              <div>
                <img src={feature.icon} alt={feature.title} className="w-10 h-10 mb-4" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm opacity-70">{feature.description}</p>
              </div>
            </Reveal>
          </div>
        ))}
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 max-w-[1200px] mx-auto">
        {/* Small Black Card */}
        <div className="col-span-1 lg:col-span-1 rounded-lg bg-black p-6 shadow-lg border border-gray-700 flex flex-col justify-between h-full">
          <Reveal keyframes={fadeInUp} duration={800} delay={500}>
            <div>
              <img src={'/icons/5.svg'} alt="Fast and Accurate Analysis" className="w-10 h-10 mb-4" />
              <h3 className="font-bold text-lg mb-2">Fast and Accurate Analysis</h3>
              <p className="opacity-70">
                Get detailed insights in just minutes with Sophia’s cutting-edge AI.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Large Purple Card */}
        <div className="col-span-1 lg:col-span-3 rounded-lg bg-[#E9DEFF] p-8 shadow-lg flex flex-col justify-between h-full">
          <Reveal keyframes={fadeInUp} duration={800} delay={600}>
            <div className="flex flex-col h-full">
              <div>
                <h3 className="font-bold text-lg mb-2 text-black">Meet Your Personal Growth Assistant</h3>
                <p className="opacity-70 mb-4 text-black">
                  At Sophia.ai, we believe that learning should be actionable and fun. Our platform combines AI technology
                  with coaching principles to help you turn content into growth opportunities.
                </p>
              </div>

              {/* Button aligned at bottom-left */}
              <div className="mt-auto text-left">
                <button className="btn_primary_outline px-4 py-2 rounded-full text-black border-2 border-black">
                  Try it now
                </button>
              </div>
            </div>
          </Reveal>
        </div>

      </div>
    </div>
  );
};

export default WhyChooseSophia;
