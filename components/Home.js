import React, { useState } from 'react';
import { Reveal } from 'react-awesome-reveal';
import { fadeInUp } from '@/keyframes'; // Include this keyframe animation
import { Button, Container } from '.';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';




const VideoAnalysisPage = () => {
    const [videoLinks, setVideoLinks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [inputValueQ, setInputValueQ] = useState('');
    const [chatResponse, setChatResponse] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [inputValuePractice, setInputValuePractice] = useState("I'm grateful for ");
    const [practiceFinished, setPracticeFinished] = useState(false); // Tracks if the practice is finished
    const examples = ['Love', 'Family', 'Health', 'Work', 'Food'];

    const handleExampleClick = (example) => {
        setInputValuePractice(`I'm grateful for ${example}`);
    };

    const handleSubmitPractice = () => {
        setPracticeFinished(true); // Set practice to finished
    };
    const handleAddLink = () => {
        if (inputValue.trim()) {
            setVideoLinks((prev) => [...prev, { link: inputValue, status: 'loading' }]);
            setInputValue('');
        }
    };

    const handleVideoReady = (index) => {
        setVideoLinks((prev) =>
            prev.map((item, i) => (i === index ? { ...item, status: 'ready' } : item))
        );
    };
    const handleSendMessage = async () => {
        if (!inputValueQ.trim()) return;

        setIsLoading(true);

        try {
            const response = await fetch('https://aftervisit-0b4087b58b8e.herokuapp.com/api/ask-ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: inputValueQ }), // Send the user's question
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


    return (
        <Container className="min-h-screen bg-black text-white p-5">
            {/* Welcome Section */}
            <div className="text-left  lg:text-center md:text-center mb-10">
                <h1 className="text-xl  lg:text-4xl md:text-4xl lg:font-bold"
                    style={{ fontFamily: 'Playfair' }} >Welcome Back, Alex.</h1>
                <p className="text-sm lg:text-lg md:text-lg mt-2 " style={{ fontFamily: 'Playfair' }} >Ready to learn something new today?</p>
                <div className="flex justify-center items-center mt-5 w-full">
                    <div className="relative w-full ">
                        <input
                            type="text"
                            placeholder="Paste a link to a video, podcast, or article to analyze"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-full p-3 rounded-full text-xs lg:text-xl md:text-xl bg-transparent border border-white text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"

                        />
                    </div>
                    <button
                        onClick={handleAddLink}
                        className="ml-3 bg-white p-3 rounded-full flex items-center justify-center shadow-md"
                        style={{ width: '48px', height: '48px' }} // Ensures circular button
                    >
                        <ArrowForwardIcon style={{ fontSize: '24px', color: 'black' }} />
                    </button>


                </div>

            </div>
            {/* Highlights Section */}
            <div>
                <h2 className="text-xl md:text-2xl lg:text-3xl mb-5 text-left md:text-left lg:text-left" style={{ fontFamily: 'Playfair' }}>
                    This Week&apos;s Highlights
                </h2>
                <div className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6">
                    {/* Predefined Cards */}
                    <Reveal keyframes={fadeInUp} duration={800} delay={100}>
                        <div className="relative text-center">
                            <h3 className="absolute top-1 text-white text-center text-xs lg:text-xl md:text-xl "  >Enhancing Focus Through Routine</h3>
                            <img
                                src="/vid1.png"
                                alt="Card 1"
                                className="rounded-md w-full h-36 lg:h-64 md:h-64 object-cover"
                            />
                        </div>
                    </Reveal>
                    <Reveal keyframes={fadeInUp} duration={800} delay={200}>
                        <div className="relative text-center">
                            <h3 className="absolute top-1 text-white text-center text-xs lg:text-xl md:text-xl "  > Mastering Effective Feedback</h3>
                            <img
                                src="/vid2.png"
                                alt="Card 2"
                                className="rounded-md w-full h-36 lg:h-64 md:h-64 object-cover"
                            />
                        </div>
                    </Reveal>
                    {/* User-Generated Cards */}
                    {videoLinks.map((video, index) => (
                        <Reveal keyframes={fadeInUp} duration={800} delay={index * 100} key={index}>
                            <div className="relative text-center">
                                <h3 className="absolute top-1 text-white text-center text-xs lg:text-xl md:text-xl">
                                    {video.status === 'loading' ? 'Your next one is loading' : 'Video Analysis'}
                                </h3>
                                {video.status === 'loading' ? (
                                    <div className="flex justify-center items-center h-36 lg:h-64 md:h-64">
                                        <div className="animate-spin w-8 h-8 border-4 border-t-transparent border-purple-600 rounded-full"></div>
                                    </div>
                                ) : (
                                    <div className="w-full h-36 lg:h-64 md:h-64 relative">
                                        <iframe
                                            className="absolute top-0 left-0 w-full h-full rounded-md object-cover"
                                            src={video.link} // Replace with actual video embedding logic
                                            title={`Video ${index}`}
                                            frameBorder="0"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                )}
                                {video.status === 'loading' && (
                                    <button
                                        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-[#8E72D7] px-3 py-0 text-white rounded-full text-xs"
                                        onClick={() => handleVideoReady(index)}
                                    >
                                        Simulate Ready
                                    </button>
                                )}
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
            {/* video Section */}
            <div>
                <h2 className="text-xl md:text-2xl lg:text-3xl  mb-5 text-left md:text-left lg:text-left mt-5" style={{ fontFamily: 'Playfair' }}>
                    Spotlight Video
                </h2>
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center mt-5 gap-6">
                    {/* Video Card */}
                    <div className="relative w-full lg:w-1/2 aspect-video">

                        {/* YouTube Video */}
                        <iframe
                            id="spotlightYouTube"
                            className="w-full h-full rounded-lg"
                            src="https://www.youtube.com/embed/OkgtwMxbnLw?rel=0&autoplay=1"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay ; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            style={{ display: 'none' }} // Initially hide the YouTube video
                        ></iframe>
                        {/* Video Cover */}
                        <img
                            id="coverOverlay"
                            src="/cover.png" // Cover image
                            alt="Video Cover"
                            className="absolute w-full h-full object-cover rounded-lg"
                        />
                    </div>

                    {/* Video Description */}
                    <div className="w-full lg:w-1/2">
                        <div className="text-white space-y-2">
                            <p className="text-sm lg:text-xl" style={{ fontFamily: 'Wix Madefor Display' }}>
                                Uploaded By: <span className="font-medium">TEDx Talks</span>
                            </p>
                            <h4 className="text-md lg:text-3xl md:text-xl" style={{ fontFamily: 'Wix Madefor Display' }}>
                                The quality of your relationships determines the quality of your lives
                            </h4>

                            <p className="text-sm lg:text-lg font-light">Esther Perel - 12 min</p>
                        </div>
                        {/* Play Button in Description */}
                        <button
                            onClick={() => {
                                const iframe = document.getElementById('spotlightYouTube');
                                iframe.style.display = 'block'; // Show the YouTube video
                                document.getElementById('coverOverlay').style.display = 'none'; // Hide the overlay
                            }}
                            className="flex items-center mt-4 bg-white text-black px-4 py-2 rounded-full"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14.752 11.168l-5.197 3.007A1 1 0 018 13.307V6.693a1 1 0 011.555-.832l5.197 3.007a1 1 0 010 1.664z"
                                />
                            </svg>
                            <span className="ml-2">Play</span>
                        </button>
                    </div>
                </div>

            </div>
            {/* question Section */}
            <div className="flex flex-col w-full items-center mt-7">
                {/* Input Section */}
                {!chatResponse && ( // Only show the input section when there's no chat response
                    <div className="flex flex-wrap items-center w-full w-full  gap-4">
                        <img
                            src="/collections/protocol1.png"
                            alt="Profile"
                            className="w-12 h-12 rounded-full flex-shrink-0"
                        />
                        <input
                            type="text"
                            placeholder="Ask me anything"
                            value={inputValueQ}
                            onChange={(e) => setInputValueQ(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} // Handle Enter key
                            className="flex-1 p-3 rounded-full bg-transparent text-white border placeholder-gray-400 focus:outline-none w-full sm:w-auto"
                            style={{ fontSize: '14.29px' }}
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={isLoading}
                            className="bg-white p-3 rounded-full flex-shrink-0"
                            style={{ minWidth: '48px', minHeight: '48px' }}
                        >
                            {isLoading ?
                                <div className="animate-spin w-6 h-6 border-2 border-t-transparent border-purple-600 rounded-full"></div>
                                : <ArrowForwardIcon style={{ fontSize: '24px', color: 'black' }} />}
                        </button>
                    </div>
                )}

                {/* Chat Dropdown Section */}
                {chatResponse && (
                    <div className="w-full max-w-md mt-5 p-4 rounded-lg" style={{ backgroundColor: 'rgba(74, 62, 62, 0.7)' }}>
                        <div className="flex items-center">
                            <img
                                src="/collections/protocol1.png"
                                alt="Profile"
                                className="w-10 h-10 rounded-full"
                            />
                            <p className="ml-4 text-sm font-medium">{inputValueQ}</p>
                        </div>
                        <div className="mt-4 p-0 rounded-lg text-sm">
                            {chatResponse}
                        </div>
                        <div className="flex justify-end space-x-4 mt-4">
                            <button
                                onClick={() => {
                                    setChatResponse(null);
                                    setInputValueQ('');
                                }} className="px-2 py-1 border text-xs text-white rounded-full"
                            >
                                End Chat
                            </button>
                            <button
                                onClick={() => (window.location.href = '/dive-in')}
                                className="px-3 py-1 bg-white text-xs text-black rounded-full"
                            >
                                Dive In
                            </button>
                        </div>
                    </div>
                )}

            </div>
            {/* Cards Section */}
            <div className="w-full bg-black text-white mt-10">
                <h2 className="text-xl md:text-2xl lg:text-3xl text-left mb-6" style={{ fontFamily: 'Playfair' }}>
                    This Week&lsquo;s Practice
                </h2>
                <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 md:gap-5 md:px-20">
                    {/* Card 1 */}
                    <div className="bg-[#4A3E3E] pt-5 rounded-lg  flex flex-col items-center">
                        <h3 className="text-xs md:text-xl lg:text-xl text-center font-medium mb-4" style={{ fontFamily: 'Wix Madefor Display', height: '50px' }}>
                            Deep Work Challenge
                        </h3>
                        <img
                            src="/icons/practice1.svg"
                            alt="Deep Work Challenge"
                            className="w-20 h-20 md:w-28 md:h-28"
                        />
                    </div>
                    {/* Card 2 */}
                    <div className="bg-[#4A3E3E] pt-5 rounded-lg flex flex-col items-center">
                        <h3 className="text-xs md:text-xl lg:text-xl text-center font-medium mb-4" style={{ fontFamily: 'Wix Madefor Display', height: '50px' }}>
                            Mastering Effective Feedback
                        </h3>
                        <img
                            src="/icons/practice2.svg"
                            alt="Mastering Effective Feedback"
                            className="w-20 h-20 md:w-28 md:h-28 mb-5 md:mb-10"
                        />
                    </div>
                    {/* Card 3 */}
                    <div className="bg-[#4A3E3E] pt-5 rounded-lg flex flex-col items-center">
                        <h3 className="text-xs md:text-xl lg:text-xl text-center font-medium mb-4" style={{ fontFamily: 'Wix Madefor Display', height: '50px' }}>
                            Make your Relationship Work
                        </h3>
                        <img
                            src="/icons/practice3.svg"
                            alt="Make your Relationship Work"
                            className="w-20 h-20 md:w-28 md:h-28"
                        />
                    </div>
                </div>
            </div>
            {/* practice Section */}
            <div className=" bg-black text-white mt-10">
                {/* Title Section */}
                <div className="text-left lg:text-center mb-6">
                    <h2 className="text-xl md:text-2xl lg:text-3xl text-left mb-6" style={{ fontFamily: 'Playfair' }}>
                        Start Practicing
                    </h2>
                    <p className="text-sm lg:text-lg mt-2">
                        Strengthen your connections with practical, guided steps. Build trust, improve communication, and nurture meaningful relationships.
                    </p>
                </div>

                {/* Gratitude Card */}
                <div className="max-w-md mx-auto bg-[#7A65B0] text-white p-4 rounded-lg">

                    {/* Card Header */}
                    <div className="flex items-center mb-4">
                        <img
                            src="/collections/protocol1.png"
                            alt="Esther Perl"
                            className="w-12 h-12 rounded-full"
                        />
                        <div className="ml-4">
                            <p className="text-xs lg:text-sm font-medium">The Daily Connection Ritual</p>
                            <p className="text-xs text-gray-200">By Esther Perl</p>
                        </div>
                    </div>
                    {!practiceFinished ? (
                        <>
                            {/* Card Content */}
                            <h3 className="text-md md:text-lg font-medium mb-4">Deepening Your Relationships</h3>
                            <p className="text-xs md:text-sm mb-4 ">What&lsquo;s one thing you&lsquo;re grateful for today?</p>

                            {/* Input Section */}
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    value={inputValuePractice}
                                    onChange={(e) => setInputValuePractice(e.target.value)}
                                    className="flex-1 mt-5 rounded-md bg-transparent placeholder-gray-300 text-xs md:text-lg text-white focus:outline-none"
                                    placeholder="I'm grateful for"
                                />

                            </div>
                            {/* Arrow Button */}

                            <div className="flex items-right justify-end mt-4">
                                <button
                                    onClick={handleSubmitPractice}
                                    className="ml-4 bg-white p-3 rounded-full opacity-80 flex items-center justify-center shadow-md"
                                    style={{ width: '48px', height: '48px' }}
                                >
                                    <ArrowForwardIcon style={{ fontSize: '24px', color: 'black' }} />
                                </button>
                            </div>

                            {/* Examples Section */}
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
        </Container>
    );
};

export default VideoAnalysisPage;
