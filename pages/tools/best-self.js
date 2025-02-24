import React, { useState } from 'react';
import Image from 'next/image';
import { Container } from '../../components';
import { JackInTheBox, Reveal } from 'react-awesome-reveal';
import { fadeInUp } from '@/keyframes';

const BestSelfPage = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);

    const videos = [
        {
          title: "Good Distraction",
          description: "Seeking distraction is hard-wired into our brains. Learning to intentionally choose healthy distractions will help you feel better about yourself and improve your overall well-being.",
          image: "/illustration1.svg",
          guide: "John Valenzuela",
          guideImage: "/cover4.png",
          details: `John Valenzuela is a Licensed Clinical Psychologist specializing in mindfulness and cognitive behavioral therapy. 
          He earned his Ph.D. from Pacifica Graduate Institute and has extensive experience working with individuals managing anxiety, stress, 
          and mood disorders. His work focuses on how structured distractions can help in self-regulation and emotional balance.`,
        },
        {
          title: "Follow Your Curiosity",
          description: "Curiosity fuels creativity and resilience. By exploring new ideas and perspectives, you can expand your sense of possibility and discover untapped potential in yourself.",
          image: "/illustration2.svg",
          guide: "Anna Smith",
          guideImage: "/cover.png",
          details: `Anna Smith is a Mindfulness Coach and Neuroscience Researcher. She has spent over a decade studying the role of curiosity in personal development. 
          Through her work, she helps individuals shift from fear-based decision-making to curiosity-driven growth, encouraging them to embrace uncertainty as a tool for transformation.`,
        },
        {
          title: "Draw Something",
          description: "Art is a powerful form of self-expression. When words fail, drawing can help you process emotions, reduce stress, and gain a deeper understanding of your inner world.",
          image: "/illustration3.svg",
          guide: "Michael Brown",
          guideImage: "/cover5.png",
          details: `Michael Brown is an Art Therapist and Creativity Educator. With a background in Expressive Arts Therapy, he has worked with children and adults to 
          unlock their creative potential. His approach emphasizes how drawing, doodling, and visual storytelling can enhance emotional well-being and mindfulness.`,
        }
    ];
    
     
  return (
    <div className='h-full main_bg text-white overflow-hidden' >
    <Container className="min-h-screen bg-black text-white p-5">
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <button className="text-white text-left text-xl mb-4" style={{ fontFamily: 'Playfair' }} onClick={() => window.history.back()}>← Back</button>
        <h1 className="text-3xl font-bold mb-4 " style={{ fontFamily: 'Playfair' }}>Best Self</h1>
        <p className="text-gray-400 italic">Video strategies to help you boost feelings of self-esteem and self-love</p>

        {/* Video List */}
        <div className="mt-6 space-y-4">
          {videos.map((video, index) => (
            <div 
              key={index} 
              className="bg-gray-900 p-5 rounded-xl flex items-center justify-between cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="flex items-center">
                <Image src={video.image} width={100} height={100} alt={video.title} />
                <h2 className="ml-3 text-lg font-semibold">{video.title}</h2>
              </div>
              <button className="bg-gray-600 p-3 rounded-full">▶</button>
            </div>
          ))}
        </div>
      </div>
       {/* Floating Subpage Modal */}
       {selectedVideo && (
        
        <div className="fixed left-0 bottom-0 w-full h-full  p-5 bg-black text-white rounded-t-3xl  shadow-xl z-50">
            <Container className=" bg-black text-white p-5">
          <JackInTheBox>
            <div className="relative">
              {/* Close Button */}
              <button className="absolute top-4 right-4 text-gray-400 text-2xl" onClick={() => setSelectedVideo(null)}>✖</button>

              {/* Video Illustration */}
              <div className="flex justify-center">
                <Image src={selectedVideo.image} width={250} height={250} alt={selectedVideo.title} className="rounded-lg"/>
              </div>

              {/* Video Title */}
              <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                <h2 className="text-xl font-bold mt-4">{selectedVideo.title}</h2>
                <p className="text-gray-400 text-sm">{selectedVideo.description}</p>
              </Reveal>

              {/* Guide Section */}
              <Reveal keyframes={fadeInUp} duration={800} delay={100}>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold">Meet the Guide</h3>
                  <div className="flex items-center mt-2">
                    <Image src={selectedVideo.guideImage} width={40} height={40} alt={selectedVideo.guide} className="rounded-full"/>
                    <span className="ml-2 text-sm">{selectedVideo.guide}</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">{selectedVideo.details}</p>
                </div>
              </Reveal>

              {/* Action Buttons */}
              <Reveal keyframes={fadeInUp} duration={800} delay={150}>
                <div className="mt-6">
                  <button className="w-full bg-white text-black py-3 rounded-full font-medium">Watch Video</button>
                  <button className="w-full text-gray-400 py-2 mt-2">Read Instructions</button>
                </div>
              </Reveal>
            </div>
          </JackInTheBox>
          </Container>
        </div>
      
      )}
    </Container>
    </div>
  );
};

export default BestSelfPage;
