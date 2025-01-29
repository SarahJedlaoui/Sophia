import React, { useEffect, useState } from 'react';
import { Container } from '.'; 
import { Reveal } from 'react-awesome-reveal';
import { fadeInDownShorter2 } from '@/keyframes';
import styles from './HowItWorks.module.css'; // CSS Module

const HowItWorks = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Container className="relative flex flex-col items-center overflow-visible">
      {/* Centered Title Section */}
      <div className="text-center mb-10">
        <Reveal keyframes={fadeInDownShorter2} duration={800} delay={100}>
          <p className="opacity-50 uppercase tracking-wide">here&apos;s how it works</p>
        </Reveal>
        <Reveal keyframes={fadeInDownShorter2} duration={800} delay={200}>
          <h2 className="font-semibold text-center leading-snug text-3xl mb-2">
            Here&apos;s How It Works
          </h2>
        </Reveal>
      </div>

      {/* Card Section */}
      <div className="relative flex justify-center items-center w-full overflow-visible">
        <Reveal keyframes={fadeInDownShorter2} duration={800} delay={300}>
          <div className="relative w-90% h-90% rounded-lg overflow-visible shadow-lg bg-black flex justify-center items-center">
            <img
              src="/card.svg" // Replace with your correct image path
              alt="Card"
              className="object-cover w-full h-full"
            />

            {/* Icons Positioned on the Edge of the Card */}
            <div
              className={`${styles.animateShake} absolute`}
              style={{
                top: '-10%',
                left: '-2%',
                transform: `translate(-30%, -30%) translate(${cursorPosition.x * 0.02}px, ${cursorPosition.y * 0.02}px)`,
              }}
            >
              <img src="/yes-no.svg" alt="Yes/No" className="w-20 h-20" />
            </div>
            <div
              className={`${styles.animateShake} absolute`}
              style={{
                top: '-10%',
                right: '-2%',
                transform: `translate(30%, -30%) translate(${cursorPosition.x * 0.02}px, ${cursorPosition.y * 0.02}px)`,
              }}
            >
              <img src="/practice.svg" alt="Practice" className="w-20 h-20" />
            </div>
            <div
              className={`${styles.animateShake} absolute`}
              style={{
                bottom: '-3%',
                left: '-2%',
                transform: `translate(-30%, 30%) translate(${cursorPosition.x * 0.02}px, ${cursorPosition.y * 0.02}px)`,
              }}
            >
              <img src="/rating.svg" alt="Rating" className="w-20 h-20" />
            </div>
            <div
              className={`${styles.animateShake} absolute`}
              style={{
                bottom: '-3%',
                right: '-2%',
                transform: `translate(30%, 30%) translate(${cursorPosition.x * 0.02}px, ${cursorPosition.y * 0.02}px)`,
              }}
            >
              <img src="/stars.svg" alt="Stars" className="w-20 h-20" />
            </div>
          </div>
        </Reveal>
      </div>
    </Container>
  );
};

export default HowItWorks;
