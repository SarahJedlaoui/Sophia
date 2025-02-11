import React, { useState } from "react";
import { Reveal } from 'react-awesome-reveal';
import { fadeInUp, fadeInLeft } from '@/keyframes';
import { ChevronLeft } from 'lucide-react';
import { Button, Container } from '.';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from 'next/image';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CreatorProfileSection = () => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [chatResponse, setChatResponse] = useState(null);
    const handleSendMessage = async () => {
        if (!inputValueQ.trim()) return;

        // Add user's question to the conversation
        setConversation((prev) => [...prev, { role: 'user', message: inputValueQ }]);
        setIsLoading(true);

        try {
            // Fetch AI response
            const response = await fetch('https://aftervisit-0b4087b58b8e.herokuapp.com/api/respond-to-chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: inputValueQ }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch AI response');
            }

            const data = await response.json();

            // Update conversation with AI's response
            setConversation((prev) => [...prev, { role: 'ai', message: data.response }]);

            // Add new insight to the insights section
            setInsights((prev) => [...prev, data.insight]);
        } catch (error) {
            console.error('Error fetching AI response:', error);
            setConversation((prev) => [...prev, { role: 'ai', message: 'Sorry, something went wrong. Please try again.' }]);
        } finally {
            setInputValueQ(''); // Clear input field
            setIsLoading(false); // Stop loading spinner
        }
    };


    const handleEndChat = () => {
        setConversation([]); // Clear the conversation
        setInputValueQ(''); // Reset input field
    };
    const creators2 = [
        {
            name: "Podcasts",
            description: "Discover Esther’s latest podcasts.",
            image: "/hero/Group1.png",
        },
        {
            name: "Articles",
            description: "Want to read more about Relationships?",
            image: "/hero/Group2.png",
        },
        {
            name: "Videos",
            description: "watch more about love and discover.",
            image: "/hero/Group3.png",
        },
    ];
    const settings = {
        dots: false,
        arrows: false, // Remove left/right arrows
        infinite: true,
        speed: 500,
        slidesToShow: 2.05,
        slidesToScroll: 1.2,
        responsive: [
            {
                breakpoint: 768, // Mobile view
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };
    return (

        <div
            className="relative min-h-screen flex flex-col items-center justify-start bg-cover bg-center text-white"
            style={{
                backgroundImage: "url('/Esther.png')",
                backgroundAttachment: 'fixed',
            }}
        >
            {/* Blurry Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70 backdrop-blur-sm"></div>
            <Container >

                {/* Top Bar with Title and Back Arrow */}
                <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                    <div className="relative z-10 w-full  px-4 mt-6 flex items-center">
                        <ChevronLeft size={24} className="mr-4 cursor-pointer hover:text-gray-300" />
                        <h1 className="text-xl font-semibold" style={{ fontFamily: 'Playfair' }} >
                            Esther Perel</h1>
                    </div>
                </Reveal>
                <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                    <div className="relative z-10 w-full max-w-4xl px-6  flex items-center">
                        <p className="text-md lg:text-lg md:text-lg mt-2 "  >
                            @Pscy.Esther
                        </p>
                    </div>
                </Reveal>
                <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                    <div className="relative z-10 w-full max-w-4xl px-6  flex items-center">
                        <p className="text-sm lg:text-lg md:text-lg mt-2 " >
                            Psychotherapist and author
                        </p>
                    </div>
                </Reveal>
                {/* Profile Card */}
                <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                    <div className="relative z-10 mt-10 bg-white bg-opacity-20 rounded-2xl p-6">
                        {/* Profile Info */}
                        <div className="flex items-center mb-6">
                            {/* Profile Image */}
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
                                <img
                                    src="/Bianca.png"
                                    alt="Esther Perel"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Text Info */}
                            <div className="ml-4 flex-1"> {/* Added flex-1 for text to take available space */}
                                <h2 className="text-xl font-bold">Esther Perel</h2>
                                <p className="text-sm text-gray-300">@Pscy.Esther</p>
                            </div>
                            {/* Button */}
                            <button
                                className={`ml-auto px-4 py-2 font-medium rounded-full transition duration-300 
                ${isFollowing ? "bg-gray-300 text-black" : "bg-white text-black hover:bg-gray-200"}`}
                                onClick={() => setIsFollowing(!isFollowing)}
                            >
                                {isFollowing ? "Following" : "Follow"}
                            </button>
                        </div>


                        {/* Stats */}
                        <p className="text-lg font-medium mb-4">2.9M followers</p>
                        <p className="text-sm text-gray-300 mb-4">#Relationships #Love #Desire #Emotions</p>
                        {/* Description Section */}
                        <div
                            className="relative z-10 w-full bg-white bg-opacity-10 rounded-2xl p-6"
                            style={{
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                WebkitBackdropFilter: "blur(20px)",
                                backdropFilter: "blur(20px)",
                            }}
                        >
                            <p className="text-sm text-white mb-4">
                                Dive deep into Esther&apos;s world of relationship psychology through engaging
                                videos, insightful podcasts, and articles on building stronger emotional
                                connections.
                            </p>
                            <div className="flex justify-end">
                                <button className="flex items-center px-4 py-2 border text-white font-medium rounded-full hover:bg-gray-300 transition duration-300">
                                    <span className="mr-2">Ask Esther</span>
                                    {/* Replace the below img src with your icon file */}
                                    <img src="/Vector.svg" alt="Icon" className="w-5 h-5" />
                                </button>
                            </div>
                            <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                                {/* Chat Input and Response Logic */}
                                <div className="mt-auto">
                                    {!chatResponse ? (
                                        // Input Section
                                        <>
                                            <div className="flex items-center w-full gap-2">
                                                {/* Text Input */}
                                                <input
                                                    type="text"
                                                    placeholder={`Ask Esther anything`}
                                                    className="flex-1 p-3 rounded-full bg-transparent text-white border placeholder-gray-400 focus:outline-none"
                                                    style={{ fontSize: "14.29px" }}
                                                />

                                                {/* Send Button */}
                                                <button className="bg-white p-3 rounded-full flex-shrink-0" style={{ minWidth: "48px", minHeight: "48px" }}>
                                                    <ArrowForwardIcon style={{ fontSize: "24px", color: "black" }} />
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        // Chat Response Section
                                        <div className="w-full mt-5 p-2 rounded-lg" style={{ backgroundColor: "rgba(74, 62, 62, 0.7)" }}>
                                            <div className="flex items-center">
                                                <img
                                                    src="/collections/protocol1.png"
                                                    alt="Profile"
                                                    className="w-10 h-10 rounded-full"
                                                />
                                                <p className="ml-4 text-sm font-medium">{inputValueQ}</p>
                                            </div>
                                            <div className="mt-4 p-0 rounded-lg text-sm text-white">{chatResponse}</div>
                                            <div className="flex justify-end space-x-4 mt-4">
                                                <button
                                                    onClick={() => {
                                                        setChatResponse(null);
                                                        setInputValueQ("");
                                                    }}
                                                    className="px-2 py-1 border text-xs text-white rounded-full"
                                                >
                                                    End Chat
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setChatResponse(null); // Clear response for next input
                                                        setInputValueQ(""); // Reset input
                                                    }}
                                                    className="px-3 py-1 bg-white text-xs text-black rounded-full"
                                                >
                                                    Continue
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Reveal>
                        </div>





                    </div>
                </Reveal>
                <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                    <div className="relative z-10 w-full  px-4 mt-6 flex items-center">

                        <h1 className="text-xl font-semibold" style={{ fontFamily: 'Playfair' }} >
                            Where Should We Begin?
                        </h1>
                    </div>
                </Reveal>
                {/* Carousel Section */}
                <Reveal keyframes={fadeInLeft} duration={800} delay={50}>
                    <div className="w-full ">
                        <Slider {...settings}>
                            {creators2.map((creator, index) => (
                                <div key={index} className="p-5">
                                    <div className="relative bg-white rounded-lg shadow-lg p-4"
                                        style={{ height: '120px', width: '100%' }}
                                    >
                                        {/* Text Content */}
                                        <div className="flex-1 w-1/3 md:w-2/3">
                                            <h3 className="text-xl text-black font-bold mb-2">{creator.name}</h3>
                                            <p className="text-sm text-gray-600">{creator.description}</p>
                                        </div>

                                        {/* Image */}
                                        <div className="absolute top-[-5px] right-[-15px] w-2/3 md:w-1/3 md:top-[0px]">
                                            <img
                                                src={creator.image}
                                                alt={creator.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </Reveal>

                <div className="min-h-screen text-white px-5 py-10">
                    {/* Section Title */}
                    <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                        <div className="text-left mb-10">
                            <h2 className="text-3xl font-bold" style={{ fontFamily: 'Playfair' }}>
                                Esther&apos;s Expertise
                            </h2>
                            <p className="text-sm text-gray-300 mt-2">
                                Get practical tools and exercises to transform your relationships.
                            </p>
                        </div>
                    </Reveal>
                    {/* Grid Section */}
                    <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* 🔹 Duplicated Section (Visible Only on Desktop, Aligned Left) */}
                        <div className="hidden md:flex">
                            {/* Grid Section */}
                            <div
                                className="grid grid-cols-2 gap-3"
                                style={{
                                    gridTemplateRows: 'auto auto',
                                }}
                            >
                                <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                                    {/* Card 1 (Tall Card) */}
                                    <div
                                        className="bg-[#323232] rounded-lg overflow-hidden flex flex-col justify-center items-center"
                                        style={{ height: '400px', backgroundColor: 'rgba(74, 62, 62, 0.7)' }}
                                    >
                                        {/* Image Section */}
                                        <div className="w-full flex justify-center items-center p-2">
                                            <img
                                                src="/vid1.png"
                                                alt="Relationship Reboot Coaching"
                                                className="w-full max-w-xs md:max-w-xs lg:max-w-xs rounded-50 h-auto md:max-h-64 lg:max-h-64 object-cover" />
                                        </div>
                                        {/* Content Section */}
                                        <div className="w-full flex flex-col items-center justify-center">
                                            <h3 className="text-md md:text-lg font-semibold text-center mb-5">Relationship Reboot Coaching</h3>
                                            <button className="bg-white opacity-70 text-black py-1 px-4 rounded-full text-sm font-medium hover:bg-gray-200">
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </Reveal>
                                <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                                    {/* Card 2 (Smaller Card) */}
                                    <div
                                        className="bg-[#FFFFFF] rounded-lg overflow-hidden flex flex-col justify-center items-center"
                                        style={{ height: '300px', backgroundColor: 'rgba(202, 184, 184, 0.7)' }}
                                    >
                                        {/* Image Section */}
                                        <div className="w-full flex justify-center items-center p-4">
                                            <img
                                                src="/R.jpg"
                                                alt="Emotional Resilience Mastery"
                                                className="w-full max-w-xs md:max-w-xs lg:max-w-xs max-h-40 rounded-70 object-cover"
                                            />
                                        </div>
                                        {/* Content Section */}
                                        <div className="w-full flex flex-col items-center justify-center">
                                            <h3 className="text-md md:text-lg font-semibold text-center mb-2">Emotional Resilience Mastery</h3>
                                            <button className="bg-white opacity-70 text-black py-2 px-4 rounded-full text-sm font-medium hover:bg-gray-200">
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </Reveal>
                                <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                                    {/* Card 3 (Smaller Card) */}
                                    <div
                                        className="bg-[#4A3E3E] rounded-lg overflow-hidden flex flex-col justify-center items-center p-4"
                                        style={{ height: '300px', backgroundColor: 'rgba(202, 184, 184, 0.7)' }}
                                    >
                                        {/* Image Section */}
                                        <div className="w-full flex justify-center items-center mb-4">
                                            <img
                                                src="/vid3.png"
                                                alt="Emotional Intelligence Coaching"
                                                className="w-full max-w-xs md:max-w-xs lg:max-w-xs max-h-40 object-cover"
                                            />
                                        </div>
                                        {/* Content Section */}
                                        <div className="w-full flex flex-col items-center justify-center">
                                            <h3 className="text-md md:text-lg font-semibold text-center mb-2">Emotional Intelligence Coaching</h3>
                                            <button className="bg-white opacity-70 text-black py-2 px-4 rounded-full text-sm font-medium hover:bg-gray-200">
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </Reveal>
                                <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                                    {/* Card 4 (Tall Card) */}
                                    <div
                                        className="bg-[#323232] rounded-lg overflow-hidden flex flex-col justify-center items-center -mt-24 p-2"
                                        style={{ height: '400px', backgroundColor: 'rgba(74, 62, 62, 0.7)' }}
                                    >
                                        {/* Image Section */}
                                        <div className="w-full flex justify-center items-center mb-4">
                                            <img
                                                src="/vid2.png"
                                                alt="Rebuilding Trust Modules"
                                                className="w-full max-w-xs md:max-w-xs lg:max-w-xs rounded-50 h-auto md:max-h-64 lg:max-h-64 object-cover"
                                            />
                                        </div>
                                        {/* Content Section */}
                                        <div className="w-full flex flex-col items-center justify-center">
                                            <h3 className="text-md md:text-lg font-semibold text-center mb-2">Rebuilding Trust Modules</h3>
                                            <button className="bg-white opacity-70 text-black py-2 px-4 rounded-full text-sm font-medium hover:bg-gray-200">
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </Reveal>

                            </div>
                        </div>

                        {/* 🔹 Original Section (Visible on All Screens) */}
                        <div>
                            {/* Grid Section */}
                            <div
                                className="grid grid-cols-2 gap-3"
                                style={{
                                    gridTemplateRows: 'auto auto',
                                }}
                            >
                                <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                                    {/* Card 1 (Tall Card) */}
                                    <div
                                        className="bg-[#323232] rounded-lg overflow-hidden flex flex-col justify-center items-center"
                                        style={{ height: '400px', backgroundColor: 'rgba(74, 62, 62, 0.7)' }}
                                    >
                                        {/* Image Section */}
                                        <div className="w-full flex justify-center items-center p-2">
                                            <img
                                                src="/vid1.png"
                                                alt="Relationship Reboot Coaching"
                                                className="w-full max-w-xs md:max-w-xs lg:max-w-xs rounded-50 h-auto md:max-h-64 lg:max-h-64 object-cover" />
                                        </div>
                                        {/* Content Section */}
                                        <div className="w-full flex flex-col items-center justify-center">
                                            <h3 className="text-md md:text-lg font-semibold text-center mb-5">Relationship Reboot Coaching</h3>
                                            <button className="bg-white opacity-70 text-black py-1 px-4 rounded-full text-sm font-medium hover:bg-gray-200">
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </Reveal>
                                <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                                    {/* Card 2 (Smaller Card) */}
                                    <div
                                        className="bg-[#FFFFFF] rounded-lg overflow-hidden flex flex-col justify-center items-center"
                                        style={{ height: '300px', backgroundColor: 'rgba(202, 184, 184, 0.7)' }}
                                    >
                                        {/* Image Section */}
                                        <div className="w-full flex justify-center items-center p-4">
                                            <img
                                                src="/R.jpg"
                                                alt="Emotional Resilience Mastery"
                                                className="w-full max-w-xs md:max-w-xs lg:max-w-xs max-h-40 rounded-70 object-cover"
                                            />
                                        </div>
                                        {/* Content Section */}
                                        <div className="w-full flex flex-col items-center justify-center">
                                            <h3 className="text-md md:text-lg font-semibold text-center mb-2">Emotional Resilience Mastery</h3>
                                            <button className="bg-white opacity-70 text-black py-2 px-4 rounded-full text-sm font-medium hover:bg-gray-200">
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </Reveal>
                                <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                                    {/* Card 3 (Smaller Card) */}
                                    <div
                                        className="bg-[#4A3E3E] rounded-lg overflow-hidden flex flex-col justify-center items-center p-4"
                                        style={{ height: '300px', backgroundColor: 'rgba(202, 184, 184, 0.7)' }}
                                    >
                                        {/* Image Section */}
                                        <div className="w-full flex justify-center items-center mb-4">
                                            <img
                                                src="/vid3.png"
                                                alt="Emotional Intelligence Coaching"
                                                className="w-full max-w-xs md:max-w-xs lg:max-w-xs max-h-40 object-cover"
                                            />
                                        </div>
                                        {/* Content Section */}
                                        <div className="w-full flex flex-col items-center justify-center">
                                            <h3 className="text-md md:text-lg font-semibold text-center mb-2">Emotional Intelligence Coaching</h3>
                                            <button className="bg-white opacity-70 text-black py-2 px-4 rounded-full text-sm font-medium hover:bg-gray-200">
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </Reveal>
                                <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                                    {/* Card 4 (Tall Card) */}
                                    <div
                                        className="bg-[#323232] rounded-lg overflow-hidden flex flex-col justify-center items-center -mt-24 p-2"
                                        style={{ height: '400px', backgroundColor: 'rgba(74, 62, 62, 0.7)' }}
                                    >
                                        {/* Image Section */}
                                        <div className="w-full flex justify-center items-center mb-4">
                                            <img
                                                src="/vid2.png"
                                                alt="Rebuilding Trust Modules"
                                                className="w-full max-w-xs md:max-w-xs lg:max-w-xs rounded-50 h-auto md:max-h-64 lg:max-h-64 object-cover"
                                            />
                                        </div>
                                        {/* Content Section */}
                                        <div className="w-full flex flex-col items-center justify-center">
                                            <h3 className="text-md md:text-lg font-semibold text-center mb-2">Rebuilding Trust Modules</h3>
                                            <button className="bg-white opacity-70 text-black py-2 px-4 rounded-full text-sm font-medium hover:bg-gray-200">
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </Reveal>

                            </div>
                        </div>

                        {/* 🔹 Duplicated Section2 (Visible Only on Desktop, Aligned Left) */}
                        <div className="hidden lg:flex">
                            {/* Grid Section */}
                            <div
                                className="grid grid-cols-2 gap-3"
                                style={{
                                    gridTemplateRows: 'auto auto',
                                }}
                            >
                                <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                                    {/* Card 1 (Tall Card) */}
                                    <div
                                        className="bg-[#323232] rounded-lg overflow-hidden flex flex-col justify-center items-center"
                                        style={{ height: '400px', backgroundColor: 'rgba(74, 62, 62, 0.7)' }}
                                    >
                                        {/* Image Section */}
                                        <div className="w-full flex justify-center items-center p-2">
                                            <img
                                                src="/vid1.png"
                                                alt="Relationship Reboot Coaching"
                                                className="w-full max-w-xs md:max-w-xs lg:max-w-xs rounded-50 h-auto md:max-h-64 lg:max-h-64 object-cover" />
                                        </div>
                                        {/* Content Section */}
                                        <div className="w-full flex flex-col items-center justify-center">
                                            <h3 className="text-md md:text-lg font-semibold text-center mb-5">Relationship Reboot Coaching</h3>
                                            <button className="bg-white opacity-70 text-black py-1 px-4 rounded-full text-sm font-medium hover:bg-gray-200">
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </Reveal>
                                <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                                    {/* Card 2 (Smaller Card) */}
                                    <div
                                        className="bg-[#FFFFFF] rounded-lg overflow-hidden flex flex-col justify-center items-center"
                                        style={{ height: '300px', backgroundColor: 'rgba(202, 184, 184, 0.7)' }}
                                    >
                                        {/* Image Section */}
                                        <div className="w-full flex justify-center items-center p-4">
                                            <img
                                                src="/R.jpg"
                                                alt="Emotional Resilience Mastery"
                                                className="w-full max-w-xs md:max-w-xs lg:max-w-xs max-h-40 rounded-70 object-cover"
                                            />
                                        </div>
                                        {/* Content Section */}
                                        <div className="w-full flex flex-col items-center justify-center">
                                            <h3 className="text-md md:text-lg font-semibold text-center mb-2">Emotional Resilience Mastery</h3>
                                            <button className="bg-white opacity-70 text-black py-2 px-4 rounded-full text-sm font-medium hover:bg-gray-200">
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </Reveal>
                                <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                                    {/* Card 3 (Smaller Card) */}
                                    <div
                                        className="bg-[#4A3E3E] rounded-lg overflow-hidden flex flex-col justify-center items-center p-4"
                                        style={{ height: '300px', backgroundColor: 'rgba(202, 184, 184, 0.7)' }}
                                    >
                                        {/* Image Section */}
                                        <div className="w-full flex justify-center items-center mb-4">
                                            <img
                                                src="/vid3.png"
                                                alt="Emotional Intelligence Coaching"
                                                className="w-full max-w-xs md:max-w-xs lg:max-w-xs max-h-40 object-cover"
                                            />
                                        </div>
                                        {/* Content Section */}
                                        <div className="w-full flex flex-col items-center justify-center">
                                            <h3 className="text-md md:text-lg font-semibold text-center mb-2">Emotional Intelligence Coaching</h3>
                                            <button className="bg-white opacity-70 text-black py-2 px-4 rounded-full text-sm font-medium hover:bg-gray-200">
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </Reveal>
                                <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                                    {/* Card 4 (Tall Card) */}
                                    <div
                                        className="bg-[#323232] rounded-lg overflow-hidden flex flex-col justify-center items-center -mt-24 p-2"
                                        style={{ height: '400px', backgroundColor: 'rgba(74, 62, 62, 0.7)' }}
                                    >
                                        {/* Image Section */}
                                        <div className="w-full flex justify-center items-center mb-4">
                                            <img
                                                src="/vid2.png"
                                                alt="Rebuilding Trust Modules"
                                                className="w-full max-w-xs md:max-w-xs lg:max-w-xs rounded-50 h-auto md:max-h-64 lg:max-h-64 object-cover"
                                            />
                                        </div>
                                        {/* Content Section */}
                                        <div className="w-full flex flex-col items-center justify-center">
                                            <h3 className="text-md md:text-lg font-semibold text-center mb-2">Rebuilding Trust Modules</h3>
                                            <button className="bg-white opacity-70 text-black py-2 px-4 rounded-full text-sm font-medium hover:bg-gray-200">
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </Reveal>

                            </div>
                        </div>
                    </div>
                </div>




            </Container>
        </div>


    );
};

export default CreatorProfileSection;
