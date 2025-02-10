import React, { useState } from 'react';
import { Reveal } from 'react-awesome-reveal';
import { fadeInUp } from '@/keyframes'; // Include this keyframe animation
import { Button, Container } from '.';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




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



    const carouselData = [
        {
            title: "Glucose Revolution",
            image: "/hero/carousel1.png",
        },
        {
            title: "Ramit Sethi",
            image: "/hero/carousel2.png",
        },
        {
            title: "Esther Perel",
            image: "/hero/carousel3.png",
        },
        {
            title: "Glucose Revolution",
            image: "/hero/carousel4.png",
        },
        {
            title: "Ramit Sethi",
            image: "/hero/carousel5.png",
        },
    ];

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5.1,
        centerMode: true,
        centerPadding: "0",
        focusOnSelect: true,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024, // For medium screens (tablets)
                settings: {
                    slidesToShow: 4.1, // Show 4.1 slides
                    centerMode: true,
                },
            },
            {
                breakpoint: 768, // For mobile screens
                settings: {
                    slidesToShow: 2.02, // Show 3.1 slides
                    centerMode: true,
                },
            },
        ],
    };

    return (
        <Container className="min-h-screen bg-black text-white p-5">
            {/* Welcome Section */}
            <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                <div className="text-left  lg:text-left md:text-left mb-10">
                    <h1 className="text-xl  lg:text-3xl md:text-3xl lg:font-bold"
                        style={{ fontFamily: 'Playfair' }} >Welcome Back, Alex.</h1>
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
            </Reveal>


            <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                {/* Blurry Card Container */}
                <div
                    className="relative bg-white bg-opacity-10 rounded-lg p-6 flex flex-col lg:flex-row w-full gap-6 "
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        WebkitBackdropFilter: "blur(20px)",
                        backdropFilter: "blur(20px)",
                    }}
                >
                    {/* Left Chat Section */}
                    <div className="flex flex-col justify-between w-full lg:w-1/3 h-full">
                        {/* Title Section */}
                        <div>
                            <h2 className="text-md md:text-md lg:text-md mb-5" style={{ fontFamily: "Playfair" }}>
                                You watched videos about dopamine fasting, personal finance tips, and skin care.
                            </h2>
                        </div>

                        {/* Chat Input and Response Logic */}
                        <div className="mt-auto">
                            {!chatResponse ? (
                                // Input Section
                                <div className="flex flex-nowrap items-center w-full gap-2">
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
                                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                                        className="flex-1 p-3 rounded-full bg-transparent text-white border placeholder-gray-400 focus:outline-none"
                                        style={{ fontSize: "14.29px" }}
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        disabled={isLoading}
                                        className="bg-white p-3 rounded-full flex-shrink-0"
                                        style={{ minWidth: "48px", minHeight: "48px" }}
                                    >
                                        {isLoading ? (
                                            <div className="animate-spin w-6 h-6 border-2 border-t-transparent border-purple-600 rounded-full"></div>
                                        ) : (
                                            <ArrowForwardIcon style={{ fontSize: "24px", color: "black" }} />
                                        )}
                                    </button>
                                </div>
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
                    </div>

                    {/* Right Cards Section */}
                    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full lg:w-2/3">
                        {/* Purple Card */}
                        <div className="relative text-center bg-[#7A65B0] rounded-lg p-4 flex flex-col items-center justify-between h-64">
                            <img
                                src="/coverb.jpeg"
                                alt="Relationship Reboot Coaching"
                                className="w-full h-auto max-w-xs lg:max-h-28 md:max-h-28 mb-3 rounded-[20px] object-cover"
                            />
                            <h3 className="text-white text-sm lg:text-lg font-medium mb-3" style={{ fontFamily: "Playfair" }}>
                                Relationship Reboot Coaching
                            </h3>
                            <button
                                className="bg-white text-black py-2 px-4 rounded-full text-xs font-medium hover:bg-gray-200"
                                onClick={() => alert("Start Practice clicked!")}
                            >
                                Start Practice
                            </button>
                        </div>

                        {/* Static Cards */}
                        <div className="relative text-center h-64 flex flex-col items-center justify-center bg-[#262121] rounded-lg">
                            <h3 className="text-white text-center text-xs lg:text-lg md:text-lg absolute top-1">
                                Enhancing Focus Through Routine
                            </h3>
                            <img src="/hero/card1.png" alt="Card 1" className="rounded-md w-full h-full object-cover" />
                        </div>
                        <div className="relative text-center h-64 flex flex-col items-center justify-center bg-[#262121] rounded-lg">
                            <h3 className="text-white text-center text-xs lg:text-lg md:text-lg absolute top-1">
                                Mastering Effective Feedback
                            </h3>
                            <img src="/hero/card2.png" alt="Card 2" className="rounded-md w-full h-full object-cover" />
                        </div>
                        <div className="hidden md:flex relative text-center h-64 flex flex-col items-center justify-center bg-[#262121] rounded-lg">
                            <h3 className="text-white text-center text-xs lg:text-lg md:text-lg absolute top-1">
                                Mastering Effective Feedback
                            </h3>
                            <img src="/hero/card3.png" alt="Card 2" className="rounded-md w-full h-full object-cover" />
                        </div>
                        {/* User-Generated Cards */}
                        {videoLinks.map((video, index) => (
                            <Reveal keyframes={fadeInUp} duration={800} delay={index * 100} key={index}>
                                <div className="relative text-center h-64 flex flex-col items-center justify-center bg-[#262121] rounded-lg">
                                    <h3 className="absolute top-1 text-white text-center text-xs lg:text-lg md:text-lg">
                                        {video.status === 'loading' ? 'Your next one is loading' : 'Video Analysis'}
                                    </h3>
                                    {video.status === 'loading' ? (
                                        <div className="flex justify-center items-center h-full">
                                            <div className="animate-spin w-8 h-8 border-4 border-t-transparent border-purple-600 rounded-full"></div>
                                        </div>
                                    ) : (
                                        <iframe
                                            className="rounded-md w-full h-full object-cover"
                                            src={video.link} // Replace with actual video link
                                            title={`Video ${index}`}
                                            frameBorder="0"
                                            allowFullScreen
                                        ></iframe>
                                    )}
                                    {video.status === 'loading' && (
                                        <button
                                            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-[#8E72D7] px-3 py-1 text-white rounded-full text-xs"
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
            </Reveal>

            <div className="relative  mx-auto py-10">
                <h1 className="text-xl  lg:text-3xl md:text-3xl lg:font-bold mb-10"
                    style={{ fontFamily: 'Playfair' }} >
                    Discover Fresh Insights
                </h1>
                <Slider {...settings}>
                    {carouselData.map((item, index) => (
                        <div
                            key={index}
                            className="relative text-center transition-transform transform hover:scale-105"
                        >
                            {/* Image */}
                            <div
                                className="w-full h-80 overflow-hidden rounded-lg shadow-lg"
                                style={{
                                    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
                                    transition: "box-shadow 0.3s ease, transform 0.3s ease",
                                }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>




            {/* Highlights Section2 */}
            <div>
                <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                    <h2 className="text-xl md:text-2xl lg:text-3xl mb-5 text-left md:text-left lg:text-left mt-10" style={{ fontFamily: 'Playfair' }}>
                        Coming next
                    </h2>
                </Reveal>
                <div className="grid grid-cols-4 gap-2 md:grid-cols-5 lg:grid-cols-6">

                    {/* Predefined Cards */}
                    <Reveal keyframes={fadeInUp} duration={800} delay={100}>
                        <div className="relative text-center h-64 flex flex-col items-center justify-center bg-[#262121] rounded-lg">
                            <h3 className="text-white text-center text-xs lg:text-xl md:text-xl absolute top-1">Enhancing Focus Through Routine</h3>
                            <img
                                src="/vid1.png"
                                alt="Card 1"
                                className="rounded-md w-full h-full object-cover"
                            />
                        </div>
                    </Reveal>
                    <Reveal keyframes={fadeInUp} duration={800} delay={200}>
                        <div className="relative text-center h-64 flex flex-col items-center justify-center bg-[#262121] rounded-lg">
                            <h3 className="text-white text-center text-xs lg:text-xl md:text-xl absolute top-1">Mastering Effective Feedback</h3>
                            <img
                                src="/vid2.png"
                                alt="Card 2"
                                className="rounded-md w-full h-full object-cover"
                            />
                        </div>
                    </Reveal>
                    <Reveal keyframes={fadeInUp} duration={800} delay={200}>
                        <div className="relative text-center h-64 flex flex-col items-center justify-center bg-[#262121] rounded-lg">
                            <h3 className="text-white text-center text-xs lg:text-xl md:text-xl absolute top-1">Mastering Effective Feedback</h3>
                            <img
                                src="/vid4.png"
                                alt="Card 2"
                                className="rounded-md w-full h-full object-cover"
                            />
                        </div>
                    </Reveal>
                    <Reveal keyframes={fadeInUp} duration={800} delay={200}>
                        <div className="relative text-center h-64 flex flex-col items-center justify-center bg-[#262121] rounded-lg">
                            <h3 className="text-white text-center text-xs lg:text-xl md:text-xl absolute top-1">Mastering Effective Feedback</h3>
                            <img
                                src="/vid5.png"
                                alt="Card 2"
                                className="rounded-md w-full h-full object-cover"
                            />
                        </div>
                    </Reveal>
                    <Reveal keyframes={fadeInUp} duration={800} delay={200}>
                        <div className="hidden relative text-center h-64 md:flex flex-col items-center justify-center bg-[#262121] rounded-lg">
                            <h3 className="text-white text-center text-xs lg:text-xl md:text-xl absolute top-1">Mastering Effective Feedback</h3>
                            <img
                                src="/vid6.png"
                                alt="Card 2"
                                className="rounded-md w-full h-full object-cover"
                            />
                        </div>
                    </Reveal>
                    <Reveal keyframes={fadeInUp} duration={800} delay={200}>
                        <div className=" hidden relative text-center h-64 lg:flex flex-col items-center justify-center bg-[#262121] rounded-lg">
                            <h3 className="text-white text-center text-xs lg:text-xl md:text-xl absolute top-1">Mastering Effective Feedback</h3>
                            <img
                                src="/collections/protocol4.png"
                                alt="Card 2"
                                className="rounded-md w-full h-full object-cover"
                            />
                        </div>
                    </Reveal>
                </div>

            </div>


            {/* practice Section */}

            {/** 
            <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                <div className=" bg-black text-white mt-10">
                   
                    <div className="text-left lg:text-center mb-6">
                        <h2 className="text-xl md:text-2xl lg:text-3xl text-left mb-6" style={{ fontFamily: 'Playfair' }}>
                            Start Practicing
                        </h2>
                        <p className="text-sm lg:text-lg mt-2">
                            Strengthen your connections with practical, guided steps. Build trust, improve communication, and nurture meaningful relationships.
                        </p>
                    </div>

                   
                    <div className="max-w-md mx-auto bg-[#7A65B0] text-white p-4 rounded-lg">

                       
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
                               
                                <h3 className="text-md md:text-lg font-medium mb-4">Deepening Your Relationships</h3>
                                <p className="text-xs md:text-sm mb-4 ">What&lsquo;s one thing you&lsquo;re grateful for today?</p>

                               
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        value={inputValuePractice}
                                        onChange={(e) => setInputValuePractice(e.target.value)}
                                        className="flex-1 mt-5 rounded-md bg-transparent placeholder-gray-300 text-xs md:text-lg text-white focus:outline-none"
                                        placeholder="I'm grateful for"
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
            </Reveal>
            */}
        </Container>
    );
};

export default VideoAnalysisPage;
