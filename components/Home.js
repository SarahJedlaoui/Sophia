import React, { useState } from 'react';
import { Reveal } from 'react-awesome-reveal';
import { fadeInUp } from '@/keyframes'; // Include this keyframe animation
import { Button, Container } from '.';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';




const VideoAnalysisPage = () => {
    const [videoLinks, setVideoLinks] = useState([]);
    const [inputValue, setInputValue] = useState('');

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

    return (
        <Container className="min-h-screen bg-black text-white p-5">
            {/* Welcome Section */}
            <div className="text-left  lg:text-center md:text-center mb-10">
                <h1 className="text-xl  lg:text-4xl md:text-4xl lg:font-bold"
                    style={{ fontFamily: 'Playfair' }} >Welcome Back, Alex.</h1>
                <p className="text-sm lg:text-lg md:text-lg mt-2 " style={{ fontFamily: 'Playfair' }} >Ready to learn something new today?</p>
                <div className="flex justify-center items-center mt-5">
                    <div className="relative w-full max-w-lg">
                        <input
                            type="text"
                            placeholder="Paste a link to a video, podcast, or article to analyze"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-full p-3 rounded-full bg-transparent border border-white text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                            style={{ fontSize: '10.29px' }}
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
                <h2 className="text-xl md:text-2xl  mb-5 text-left md:text-center lg:text-center" style={{ fontFamily: 'Playfair' }}>
                    This Week's Highlights
                </h2>
                <div className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6">
                    {/* Predefined Cards */}
                    <Reveal keyframes={fadeInUp} duration={800} delay={100}>
                        <div className="relative text-center">
                            <h3 className="absolute top-1 text-white text-center text-xs lg:text-xl md:text-xl "  >Enhancing Focus Through Routine</h3>
                            <img
                                src="/vid1.png"
                                alt="Card 1"
                                className="rounded-md w-full h-32 lg:h-64 md:h-50 object-cover"
                            />
                        </div>
                    </Reveal>
                    <Reveal keyframes={fadeInUp} duration={800} delay={200}>
                        <div className="relative text-center">
                            <h3 className="absolute top-1 text-white text-center text-xs lg:text-xl md:text-xl "  > Mastering Effective Feedback</h3>
                            <img
                                src="/vid2.png"
                                alt="Card 2"
                                className="rounded-md w-full h-32 lg:h-64 md:h-50 object-cover"
                            />
                        </div>
                    </Reveal>
                    {/* User-Generated Cards */}
                    {videoLinks.map((video, index) => (
                        <Reveal keyframes={fadeInUp} duration={800} delay={index * 100} key={index}>
                            <div className="relative text-center">
                                <h3 className="absolute top-0 text-white text-xs ">
                                    {video.status === 'loading' ? 'Your next one is loading' : 'Video Analysis'}
                                </h3>
                                {video.status === 'loading' ? (
                                    <div className="flex justify-center items-center h-32">
                                        <div className="animate-spin w-8 h-8 border-4 border-t-transparent border-purple-600 rounded-full"></div>
                                    </div>
                                ) : (
                                    <iframe
                                        className="w-full h-32 rounded-md"
                                        src={video.link} // Replace with actual video embedding logic
                                        title={`Video ${index}`}
                                        frameBorder="0"
                                        allowFullScreen
                                    ></iframe>
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
            <div>
                <h2 className="text-xl md:text-2xl  mb-5 text-left md:text-center lg:text-center mt-5" style={{ fontFamily: 'Playfair' }}>
                    Spotlight Video
                </h2>
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center mt-5 gap-6">
                    {/* Video Card */}
                    <div className="relative w-full lg:w-1/2 aspect-video">
                        {/* Video Cover */}
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">

                        </div>
                        {/* Video */}
                        {/* YouTube Video */}
                        <iframe
                            id="spotlightYouTube"
                            className="w-full h-full rounded-lg"
                            src="https://www.youtube.com/embed/OkgtwMxbnLw?rel=0"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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
                            <p className="text-sm" style={{ fontFamily: 'Wix Madefor Display' }}>
                                Uploaded By: <span className="font-medium">TEDx Talks</span>
                            </p>
                            <h4 className="text-md lg:text-xl md:text-xl" style={{ fontFamily: 'Wix Madefor Display' }}>
                                The quality of your relationships determines the quality of your lives
                            </h4>

                            <p className="text-sm font-light">Esther Perel - 12 min</p>
                        </div>
                        {/* Play Button in Description */}
                        <button
                            onClick={() => {
                                const iframe = document.getElementById('spotlightYouTube');
                                iframe.src += "&autoplay=1"; // Add autoplay to the YouTube URL
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
        </Container>
    );
};

export default VideoAnalysisPage;
