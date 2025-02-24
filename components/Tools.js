import React, { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useRouter } from 'next/router';
import { Container } from '.';
import WaveSurfer from "wavesurfer.js";
import * as LoadingIcons from "react-loading-icons";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';



const tools = [
    { name: "Best Self", count: "3 tools", color: "#A393EB", bg: "/patterns/pattern1.svg", slug: "best-self" },
    { name: "Emotions 101", count: "4 experiences", color: "#F4A261", bg: "/patterns/pattern2.svg", slug: "best-self" },
    { name: "Happiness", count: "5 practices", color: "#F0D8BC", bg: "/patterns/pattern3.svg", slug: "best-self" },
    { name: "Quotes", count: "128 affirmations", color: "#D2B5D3", bg: "/patterns/pattern4.svg", slug: "best-self" },
    { name: "Movement", count: "6 videos", color: "#CFE9", bg: "/patterns/pattern5.svg", slug: "best-self" },
    { name: "Relationships 101", count: "10 videos", color: "#E9C46A", bg: "/patterns/pattern6.svg", slug: "best-self" },
    { name: "Mindfulness", count: "9 videos", color: "#2F4F4F", bg: "/patterns/pattern7.svg", slug: "best-self" },
    { name: "Reframing", count: "8 strategies", color: "#1C3D5A", bg: "/patterns/pattern8.svg", slug: "best-self" }
];
const imageList = [
    { src: "/cover.png" },
    { src: "/cover4.png" },
    { src: "/card1.png" },
    { src: "/card2.png" },
    { src: "/cover2.png" },
    { src: "/card3.png" },
    { src: "/card4.png" },

    { src: "/cover5.png" },
    { src: "/content3.png" },
];



const SpeechToVoicePlayer = ({ text }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [waveform, setWaveform] = useState(Array(30).fill(1)); // Fake waveform
    const intervalRef = useRef(null);

    const generateSpeech = () => {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            stopWaveAnimation();
            setIsPlaying(false);
            return;
        }

        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);

        utterance.onstart = () => {
            setIsPlaying(true);
            startWaveAnimation();
        };

        utterance.onend = () => {
            setIsPlaying(false);
            stopWaveAnimation();
        };

        synth.speak(utterance);
    };

    const startWaveAnimation = () => {
        intervalRef.current = setInterval(() => {
            setWaveform((prev) =>
                prev.map(() => Math.random() * 2 + 1) // Random wave heights
            );
        }, 150);
    };

    const stopWaveAnimation = () => {
        clearInterval(intervalRef.current);
        setWaveform(Array(30).fill(1)); // Reset wave
    };

    return (
        <div className="flex items-center bg-black px-4 py-2 rounded-full">
            {/* Play/Pause Button */}
            <button
                className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full text-white"
                onClick={generateSpeech}
            >
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </button>

            {/* Fake Waveform */}
            <div className="flex items-center ml-4 h-10 space-x-1">
                {waveform.map((height, index) => (
                    <div
                        key={index}
                        className="w-1 bg-white rounded-full transition-all duration-150"
                        style={{ height: `${height * 10}px` }}
                    ></div>
                ))}
            </div>
        </div>
    );
};


const AudioWavePlayer = ({ audioSrc }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [waveform, setWaveform] = useState(Array(30).fill(1)); // Fake waveform
    const audioRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        // Cleanup when component unmounts
        return () => stopWaveAnimation();
    }, []);

    const startWaveAnimation = () => {
        intervalRef.current = setInterval(() => {
            setWaveform((prev) =>
                prev.map(() => Math.random() * 2 + 1) // Random wave heights
            );
        }, 150);
    };

    const stopWaveAnimation = () => {
        clearInterval(intervalRef.current);
        setWaveform(Array(30).fill(1)); // Reset wave
    };

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (audio.paused) {
            audio.play();
            setIsPlaying(true);
            startWaveAnimation();
        } else {
            audio.pause();
            setIsPlaying(false);
            stopWaveAnimation();
        }
    };

    return (
        <div className="flex items-center bg-black px-4 py-2 rounded-full">
            {/* Play/Pause Button */}
            <button
                className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full text-white"
                onClick={togglePlay}
            >
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </button>

            {/* Fake Waveform */}
            <div className="flex items-center ml-4 h-10 space-x-1">
                {waveform.map((height, index) => (
                    <div
                        key={index}
                        className="w-1 bg-white rounded-full transition-all duration-150"
                        style={{ height: `${height * 10}px` }}
                    ></div>
                ))}
            </div>

            {/* Hidden Audio Element */}
            <audio ref={audioRef} src={audioSrc} onEnded={() => setIsPlaying(false)} />
        </div>
    );
};


const ToolsPage = () => {
    const router = useRouter();
    return (
        <Container className="min-h-screen bg-black text-white p-5">
            <div className="min-h-screen bg-black text-white flex flex-col items-center">
                {/* Header */}
                <div className="w-full flex justify-between items-center">
                    <h1 className="text-3xl font-bold">The Science of Emotions and Relationships </h1>
                   
                </div>

                {/* Suggestion Section */}
                <div className="mt-6 text-center">
                    <div className="grid grid-cols-3 gap-4 p-4">
                        {imageList.map((img, index) => (
                            <div key={index} className="flex justify-center">
                                <Image
                                    src={img.src}
                                    width={150}
                                    height={150}
                                    alt={`Image ${index + 1}`}
                                    className="rounded-lg object-cover"
                                />
                            </div>
                        ))}
                    </div>

                    <AudioWavePlayer audioSrc="/Andeas.wav" />


                    <h2 className="text-2xl font-bold mt-2">Let&apos;s practice</h2>

                </div>

                {/* Swipeable Carousel 
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
*/}
                {/* Tools Section with Animated Cards */}
                <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10 mt-8">
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
                            <h3 className="text-md font-semibold z-10">{tool.name}</h3>
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
