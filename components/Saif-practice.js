import React, { useEffect, useRef, useState } from "react";
import { Reveal } from 'react-awesome-reveal';
import { fadeInUp } from '@/keyframes'; // Include this keyframe animation
import { Button, Container } from '.';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from "next/image";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

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
        <div className="flex items-center bg-black px-4 py-2 rounded-full mt-5">
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

const SaifPractice = ({ setActiveTabPage }) => {
    const [videoLinks, setVideoLinks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [inputValueChat, setInputValueChat] = useState('');
    const [inputValueQ, setInputValueQ] = useState('');
    const [chatResponse, setChatResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [inputValuePractice, setInputValuePractice] = useState(" Yes, and I’ve decided my ship will only sail on land now! ");
    const [practiceFinished, setPracticeFinished] = useState(false); // Tracks if the practice is finished
    const examples = ['Love', 'Family', 'Health', 'Work', 'Food'];
    const [conversation, setConversation] = useState([
        { role: 'ai', message: 'How can you be funny? ' },
    ]);
    const [insights, setInsights] = useState([]); // Add this state
    const [savedInsights, setSavedInsights] = useState([]);
    const hasSavedInsights = savedInsights.length > 0; // Check if any insight is saved

    const [selectedImage, setSelectedImage] = useState("/saif/saif12.jpeg");
    const handleExampleClick = (example) => {
        setInputValuePractice(`Yes, and I’ve decided my ship will only sail on land now! ${example}`);
    };

    const handleSubmitPractice = () => {
        setPracticeFinished(true); // Set practice to finished
    };
    const videoCards = [
        { title: "From Idea to Laughter- Crafting the Perfect Joke", image: "/saif/saif9.jpeg" },
        { title: "From Idea to Laughter- Crafting the Perfect Joke", image: "/saif/saif10.jpeg" },
        { title: "From Idea to Laughter- Crafting the Perfect Joke", image: "/saif/saif11.jpeg" },
        { title: "From Idea to Laughter- Crafting the Perfect Joke", image: "/saif/saif8.jpeg" },
    ];




    const handleSendMessage = async () => {
        if (!inputValueQ.trim()) return;

        // Add user's question to the conversation
        setConversation((prev) => [...prev, { role: 'user', message: inputValueQ }]);
        setIsLoading(true);

        try {
            // Fetch AI response
            const response = await fetch('https://sophiaai-9a965fb6e429.herokuapp.com/api/ask-saif', {
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
    const handleSendMessage2 = async () => {
        if (!inputValueChat.trim()) return;

        setIsLoading(true);

        try {
            const response = await fetch('https://aftervisit-0b4087b58b8e.herokuapp.com/api/ask-ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: inputValueChat }), // Send the user's question
            });

            if (!response.ok) {
                throw new Error('Failed to fetch AI response');
            }

            const data = await response.json();
            setChatResponse(data.answer); // Update chat response with AI's answer

        } catch (error) {
            console.error('Error fetching AI response:', error);
            setChatResponse('There was an error processing your question. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };


    const handleEndChat = () => {
        setConversation([]); // Clear the conversation
        setInputValue(''); // Reset input field
    };

    // Save state for cards
    const [savedCards, setSavedCards] = useState({});

    // Function to toggle insight saving
    const handleToggleSave = (insight) => {
        setSavedInsights((prev) => {
            const isAlreadySaved = prev.some((item) => item.title === insight.title);
            if (isAlreadySaved) {
                return prev.filter((item) => item.title !== insight.title);
            } else {
                return [...prev, insight];
            }
        });
    };

    return (
        <Container className="min-h-screen bg-black text-white p-5">
             {/* Top Bar with Title and Back Arrow */}
             <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                    <div className="relative z-10 w-full  px-4 mt-6 flex items-center">
                        <Link href='/seif-omrane'>
                            <ChevronLeft size={24} className="mr-4 cursor-pointer hover:text-gray-300" />
                        </Link>
                        <h1 className="text-xl font-semibold" style={{ fontFamily: 'Playfair' }} >
                            Saif Omrane</h1>
                    </div>
                </Reveal>
            {/* Welcome Section */}
            <div className="text-left  lg:text-left md:text-left mb-10">
                <p className="text-sm lg:text-lg md:text-lg mt-2 " >Ready to learn something new today?</p>


            </div>
            <div
                className="relative bg-white bg-opacity-10 rounded-2xl p-6 w-full"
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    WebkitBackdropFilter: "blur(20px)",
                    backdropFilter: "blur(20px)",
                }}
            >
                <div className="text-white font-medium text-lg mb-4">
                    Comedy Foundations: The Art of Being Funny
                </div>
                {/* Video Thumbnails */}
                <div className="flex overflow-x-auto md:grid md:grid-cols-4 gap-4 scrollbar-hide">
                    {videoCards.map((card, index) => (
                        <div
                            key={index}
                            className={`relative w-[75%] sm:w-[40%] md:w-full h-44 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${selectedImage === card.image ? "border-2 border-white" : ""
                                }`}
                            onClick={() => setSelectedImage(card.image)}
                        >
                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-black opacity-50"></div>
                            {/* Image */}
                            <Image
                                src={card.image}
                                alt={card.title}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                            />
                            {/* Title Overlay */}
                            <div className="absolute top-2 left-2 text-white font-semibold text-sm">
                                {card.title}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary Section */}
                <div className="mt-5 text-white font-medium text-lg">
                    Here&apos;s a summary for all vids
                </div>
                <AudioWavePlayer audioSrc="/saif.wav" />
            </div>

            <div className="relative text-white mt-10 mb-10">
                {/* Blurred Background */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(${selectedImage})`,
                        filter: "blur(30px)", // Adjust the blur intensity

                    }}
                ></div>

                {/* Content */}
                <div className="relative z-10">
                    {/* video Section */}
                    <div>
                        <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                            <h2 className="text-xl md:text-2xl lg:text-3xl  mb-5 text-left md:text-left lg:text-left mt-5" >
                                Chat With Saif
                            </h2>
                        </Reveal>

                    </div>
                    {/* question Section */}

                    <div className="w-full mx-auto bg-[#262121] bg-opacity-70 text-white p-5 rounded-lg shadow-lg mt-10"
                        style={{
                            backgroundColor: 'rgba(74, 62, 62, 0.7)', // Apply transparency using rgba
                        }}>
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                                <img
                                    src='/saif/saif5.jpeg'
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full"
                                />
                                <p className="ml-4 font-medium text-sm">Ask me anything</p>
                            </div>

                        </div>

                        {/* Conversation */}
                        <div className="h-64 overflow-y-auto space-y-4 mb-4">
                            {conversation.map((item, index) => (
                                <div
                                    key={index}
                                    className={`flex ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`p-3 rounded-lg max-w-xs ${item.role === 'user' ? 'bg-[#8E72D7] text-white' : ' text-gray-300'
                                            }`}
                                    >
                                        {item.message}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Section */}
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="Type your question..."
                                value={inputValueQ}
                                onChange={(e) => setInputValueQ(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                className="flex-1 p-3 rounded-full bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:outline-none"
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={isLoading}
                                className="ml-4 bg-white p-3 rounded-full"
                                style={{ minWidth: '48px', minHeight: '48px' }}
                            >
                                {isLoading ? (
                                    <div className="animate-spin w-6 h-6 border-2 border-t-transparent border-purple-600 rounded-full"></div>
                                ) : (
                                    <ArrowForwardIcon style={{ fontSize: '24px', color: 'black' }} />
                                )}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            {/* Insights Section */}
            {insights && insights.length > 0 && (
                <div className="text-white flex flex-col w-full items-center mt-7">
                    {/* Title Section */}
                    <div className="flex justify-between items-center w-full mb-6">
                        {/* Title (Aligned Left) */}
                        <h2 className="text-xl md:text-2xl lg:text-3xl text-left mt-5" style={{ fontFamily: 'Playfair' }}>
                            Personalized Insights
                        </h2>

                        {/* Save to Coaching Button (Aligned Right, Disabled If No Saved Insights) */}
                        <button
                            onClick={() => {
                                if (hasSavedInsights) {
                                    setActiveTabPage("coaching"); // Switch to the Practice tab
                                } else {
                                    alert("You need to save at least one insight first!");
                                }
                            }}
                            disabled={!hasSavedInsights} // Disable if no saved insights
                            className={`py-2 px-4 rounded-full text-xs font-medium transition ${hasSavedInsights ? "bg-white text-black hover:bg-gray-200" : "bg-gray-600 text-gray-300 cursor-not-allowed"
                                }`}
                        >
                            Save to Coaching
                        </button>

                    </div>

                    {/* Subtitle */}


                    {/* Dynamic Cards Section */}
                    <div className="space-y-4 w-full">
                        {insights.map((insight, index) => (
                            <div key={index} className="bg-[#4A3E3E] p-4 rounded-lg flex flex-col relative">
                                {/* Save Button (Top Right of Card) */}
                                <button
                                    onClick={() => handleToggleSave(insight)}
                                    className="absolute top-2 right-2 p-2 rounded-full transition"
                                >
                                    {/* Save Icon (Fill if saved, Outline if not saved) */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-6 w-6 ${savedInsights.some((item) => item.title === insight.title) ? "text-white fill-white" : "text-gray-400"
                                            }`}
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        fill="none"
                                        strokeWidth={2}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v18l7-4 7 4V3z" />
                                    </svg>
                                </button>

                                {/* Insight Title & Content */}
                                <div className="flex items-center gap-2 mb-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9m-9-4h6m-6-4h3m-3-4h.01M9 12h.01M6 16h.01M6 20h.01M6 8h.01M9 4h.01M9 8h.01M6 4h.01" />
                                    </svg>
                                    <h3 className="text-sm font-bold">{insight.title}</h3>
                                </div>
                                <p className="text-xs md:text-sm">{insight.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}


            {/* practice Section */}


            <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                <div className=" text-white mt-10">

                    <div className="text-left lg:text-center mb-6">
                        <h2 className="text-xl md:text-2xl lg:text-3xl text-left mb-6">
                            Next step From Theory to Stage, Let&apos;s Practice!                        </h2>
                        <p className="text-sm lg:text-lg mt-2">
                            Comedy Assignments & Workouts
                        </p>
                    </div>


                    <div className=" mx-auto bg-[#7A65B0] text-white p-4 rounded-lg">


                        <div className="flex items-center mb-4">
                            <img
                                src="/saif/saif.png"
                                alt="Esther Perl"
                                className="w-12 h-12 md:w-20 md:h-20 lg:w-25 lg:h-25 rounded-full"
                            />
                            <div className="ml-4">
                                <p className="text-xs lg:text-lg font-medium">1. Improv: "Yes, And…" Game</p>
                                <p className="text-xs md:text-lg text-gray-200">By Saif omrane</p>
                            </div>
                        </div>
                        {!practiceFinished ? (
                            <>

                                <h3 className="text-md md:text-lg font-medium mb-4">Test your improv skills! Keep the scene going by building on funny AI-generated prompts using the golden rule of improv: Yes, and…</h3>
                                <p className="text-xs md:text-sm mb-4 ">You're a pirate who's afraid of water. What&apos;s your solution?</p>


                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        value={inputValuePractice}
                                        onChange={(e) => setInputValuePractice(e.target.value)}
                                        className="flex-1 mt-5 rounded-md bg-transparent placeholder-gray-300 text-xs md:text-lg text-white focus:outline-none"
                                        placeholder="Yes, and I’ve decided my ship will only sail on land now!"
                                    />

                                </div>


                                <div className="flex items-right justify-end mt-4">
                                    <button
                                        onClick={handleSubmitPractice}
                                        className="ml-4 bg-white p-3 rounded-full opacity-80 flex items-center justify-center shadow-md"
                                        style={{ width: '48px', height: '48px' }}
                                    >
                                        <ArrowForwardIcon style={{ fontSize: '24px', color: 'black' }} />
                                    </button>
                                </div>

                                {/**
                                <div className="mt-4">
                                    <h4 className="text-sm font-medium mb-2">Examples</h4>
                                    <div className="flex gap-1 flex-wrap">
                                        {examples.map((example, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleExampleClick(example)}
                                                className="px-2 py-1 border border-white text-white rounded-full text-xs"
                                            >
                                                {example}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                 */}

                            </>
                        ) : (
                            <div className="text-center mb-10">
                                <h3 className="text-lg md:text-xl font-medium mb-4">Your practice is finished. Thank you!</h3>
                                <img
                                    src="/icons/practice1.svg"
                                    alt="Practice Completed"
                                    className="mx-auto w-32 h-32"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </Reveal>
        </Container>
    );
};

export default SaifPractice;
