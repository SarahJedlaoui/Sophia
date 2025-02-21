import React, { useState, useEffect } from 'react';
import { Button, Container } from '.';
import { JackInTheBox, Reveal } from 'react-awesome-reveal';
import { fadeInDownShorter, fadeInLeft, fadeInUp } from '@/keyframes';
import Image from 'next/image';


const words = ['Podcast', 'Video', 'Instagram Reels', 'Books'];

const Hero = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    const speed = isDeleting ? 50 : 100; // Speed up deletion

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (text.length < word.length) {
          setText(word.slice(0, text.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1000); // Pause before deleting
        }
      } else {
        if (text.length > 0) {
          setText(word.slice(0, text.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, currentWordIndex]);
  return (
    <Container className={'flex flex-col sm:flex-row mt-20 mb-32'}>
      <div className='w-full sm:w-[50%] pr-0 sm:pr-10 lg:pr-20 mt-[-20px] sm:mt-5 lg:mt-10'>
        <Reveal keyframes={fadeInLeft} duration={800} delay={200}>
        <h1 className='text-3xl lg:text-6xl font-bold mb-5 min-h-[150px] md:min-h-[150px] lg:min-h-[300px]'>
        Transform your <span className="text-[#937BD0]">{text}</span> into personalized coaching sessions.
    </h1>
        </Reveal>
        <Reveal keyframes={fadeInDownShorter} duration={1000} delay={800}>
          <p className='mb-8 opacity-50'>
          Turn Any Content into Coaching Sessions,Analyze podcasts, videos, Instagram Reels, and books with Sophia.ai  to gain actionable insights and personalized coaching tools
          </p>
        </Reveal>

        <div className='flex mb-10'>
          <Reveal keyframes={fadeInUp} duration={1000} delay={200}>
            <Button
              isLink
              href={'/home'}
              className={'mr-3'}
              variant={'primary'}
            >
              Try it Now
            </Button>
          </Reveal>
        
        </div>
        
      </div>
      <div className='flex-1 mt-14 sm:mt-0'>
        <JackInTheBox delay={200} triggerOnce>
          <div className='relative w-full h-[400px] lg:h-[500px]'>
            <img
              layout='fill'
              objectFit='contain'
              objectPosition={'center'}
              src='/hero/hero.png'
              alt='hero'
            />
          </div>
        </JackInTheBox>
      </div>
    </Container>
  );
};

export default Hero;
