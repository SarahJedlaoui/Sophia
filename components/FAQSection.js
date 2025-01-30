import React from 'react';
import { Reveal } from 'react-awesome-reveal';
import { fadeInLeft, fadeInUp } from '@/keyframes';
import { Button, Container } from '.';

const FAQSection = () => {
  const faqs = [
    {
      question: 'What kind of content can Sophia analyze?',
      answer: 'Podcasts, YouTube videos, Instagram Reels, and books.',
    },
    {
      question: 'How long does analysis take?',
      answer: 'Just a couple of minutes per video or reel.',
    },
    {
      question: 'Is Sophia free to use?',
      answer: 'Yes, you can analyze your first video for free.',
    },
    {
      question: 'Can I create my own page on Sophia?',
      answer:
        'Yes, we have that option for creators, influencers, coaches, doctors, and more.',
    },
  ];

  return (
     <Container className="bg-[#D9E5FF] px-5 mb-20 py-16 px-5 md:px-10 lg:px-20 rounded-3xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: Title */}
        <Reveal keyframes={fadeInLeft} duration={800} delay={200}>
          <div className="text-left">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-black">
              Have Questions? <br />
              <span className="text-[#8E72D7]">We’ve Got Answers.</span>
            </h2>
          </div>
        </Reveal>

        {/* Right Side: FAQ List */}
        <div className="flex flex-col space-y-6">
          {faqs.map((faq, index) => (
            <Reveal keyframes={fadeInUp} duration={800} delay={index * 100} key={index}>
              <div className="flex justify-between items-start border-b border-gray-300 pb-4">
                <div>
                  <h3 className="text-lg font-semibold text-black">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">{faq.answer}</p>
                </div>
                <div>
                  <a
                    href="#"
                    className="text-black text-lg font-bold hover:text-[#8E72D7]"
                    aria-label="Learn More"
                  >
                    ↗
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default FAQSection;
