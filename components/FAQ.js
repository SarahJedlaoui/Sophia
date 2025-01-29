import React from 'react';
import { Container } from '.';
import { Reveal } from 'react-awesome-reveal';
import { fadeInDownShorter2 } from '@/keyframes';

const FAQ = () => {
  // Define the content based on the provided image
  const faqContent = [
    {
      id: 1,
      number: '01',
      title: 'Upload Content',
      description:
        'Easily paste a YouTube link, upload a podcast, select an Instagram Reel, or even add a book title to get started. Sophia works with the content you love.',
    },
    {
      id: 2,
      number: '02',
      title: 'Sophia Analyzes It',
      description:
        'With advanced AI, Sophia dives into your content to extract key ideas, uncover actionable insights, and turn them into personalized coaching tips.',
    },
    {
      id: 3,
      number: '03',
      title: 'Practice and Grow',
      description:
        'Sophia provides tailored exercises, reflective questions, and actionable tools. Build habits, refine your skills, and track your growth over time.',
    },
  ];

  return (
    <Container className={'mb-44 scroll-mt-10'} id="faq">
      <div className="text-left mb-10">
        {/* Animation for "How Sophia.ai Works" */}
        <Reveal keyframes={fadeInDownShorter2} duration={800} delay={100}>
          <p className="opacity-50 uppercase tracking-wide">how it works?</p>
        </Reveal>
        <Reveal keyframes={fadeInDownShorter2} duration={800} delay={200}>
          <h2 className="font-semibold text-left leading-snug w-full text-3xl mb-2">
            How Sophia.ai Works
          </h2>
        </Reveal>
      </div>
      {/* Full-width FAQ styled like the provided image */}
      <div className="space-y-8">
        {faqContent.map((item) => (
          <Reveal
            key={item.id}
            keyframes={fadeInDownShorter2}
            duration={800}
            delay={100}
          >
            <div className="flex items-start border-b border-gray-700 pb-4">
              {/* Number Section */}
              <div className="text-[#E9DEFF] text-5xl font-bold pr-6">
                {item.number}
              </div>
              {/* Title and Description */}
              <div className="flex-1 grid grid-cols-3 gap-4">
                <h3 className="text-white text-xl font-semibold text-center col-span-1">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-left col-span-2">
                  {item.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Container>
  );
};

export default FAQ;
