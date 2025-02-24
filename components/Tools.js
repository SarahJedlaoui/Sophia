import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useRouter } from 'next/router'; 
import {  Container } from '.';

const tools = [
    { name: "Best Self", count: "3 tools", color: "#A393EB", bg: "/patterns/pattern1.svg", slug: "best-self" },
    { name: "Sound Patterns", count: "4 experiences", color: "#F4A261", bg: "/patterns/pattern2.svg", slug: "sound-patterns" },
    { name: "Breathing", count: "5 practices", color: "#F0D8BC", bg: "/patterns/pattern3.svg", slug: "breathing" },
    { name: "Quotes", count: "128 affirmations", color: "#D2B5D3", bg: "/patterns/pattern4.svg", slug: "quotes" },
    { name: "Movement", count: "6 videos", color: "#CFE9", bg: "/patterns/pattern5.svg", slug: "movement" },
    { name: "Emotions 101", count: "10 videos", color: "#E9C46A", bg: "/patterns/pattern6.svg", slug: "emotions-101" },
    { name: "Mindfulness", count: "9 videos", color: "#2F4F4F", bg: "/patterns/pattern7.svg", slug: "mindfulness" },
    { name: "Reframing", count: "8 strategies", color: "#1C3D5A", bg: "/patterns/pattern8.svg", slug: "reframing" }
  ];
const ToolsPage = () => {
    const router = useRouter();
  return (
    <Container className="min-h-screen bg-black text-white p-5">
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tools</h1>
        <button className="text-gray-400 text-xl">🔍</button>
      </div>

      {/* Suggestion Section */}
      <div className="mt-6 text-center">
        <div className="flex justify-center">
          <Image src="/illustration1.svg" width={200} height={200} alt="Stretch" />
        </div>
        <span className="text-sm text-gray-400 px-3 py-1 bg-gray-700 rounded-full">SUGGESTION FOR <b>TIRED</b></span>
        <h2 className="text-2xl font-bold mt-2">Stretch Yourself</h2>
        <p className="text-sm text-gray-300">Gentle stretching movements help to achieve deep states of rest and relief.</p>
        <button className="mt-3 bg-white text-black px-5 py-2 rounded-full font-medium">Begin</button>
      </div>

      {/* Swipeable Carousel */}
      <div className="w-full mt-6">
      <Swiper
          spaceBetween={0}
          navigation
          pagination={{ clickable: false }} // Remove blue dots
          breakpoints={{
            320: { slidesPerView: 3.1 },
            768: { slidesPerView: 4.2 },
            1024: { slidesPerView: 5.2 },
          }}
        >
          {[...Array(6)].map((_, index) => (
            <SwiperSlide key={index}>
              <div className="h-20 w-20 bg-gray-800 rounded-xl flex items-center justify-center text-gray-500 text-3xl">
                +
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

       {/* Tools Section with Animated Cards */}
       <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {tools.map((tool, index) => (
            <div 
              key={index} 
              className="relative p-6 rounded-xl text-white flex flex-col justify-center items-center" 
              style={{ backgroundColor: tool.color, position: 'relative', overflow: 'hidden' }}
              onClick={() => router.push(`/tools/${tool.slug}`)} // Navigate on click
            >
              {/* Background Animated Pattern */}
              <div 
                className="absolute inset-0 opacity-20 animate-move-lines" 
                style={{ backgroundImage: `url(${tool.bg})`, backgroundSize: 'cover' }}
              />
              
              {/* Content */}
              <h3 className="text-lg font-semibold z-10">{tool.name}</h3>
              <p className="text-xs z-10">{tool.count}</p>
            </div>
          ))}
        </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-black py-3 flex justify-around text-gray-500 border-t border-gray-700">
        <button className="text-white">➕ Check In</button>
        <button className="text-yellow-400">✨ Tools</button>
        <button className="text-white">👥 Friends</button>
        <button className="text-white">📊 Analyze</button>
      </div>
    </div>
    </Container>
  );
};

export default ToolsPage;
