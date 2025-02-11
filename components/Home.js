import React, { useState } from 'react';
import { Reveal } from 'react-awesome-reveal';
import { fadeInUp } from '@/keyframes'; // Include this keyframe animation
import { Button, Container } from '.';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Chat from './Chat';
import Practice from './Practice';
import CreatorSearch from './Creators';
import CreatorProfileSection from './Esther';



const VideoAnalysisPage = () => {
    const [videoLinks, setVideoLinks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [inputValueQ, setInputValueQ] = useState('');
    const [chatResponse, setChatResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("videos");
    const [activeTabPage, setActiveTabPage] = useState("home");


    const creators = [
        { name: "Glucose Revolution", image: "/hero/card1.png" },
        { name: "Jessie Inchauspe", image: "/hero/card2.png" },
        { name: "Ramit Sethi", image: "/hero/card3.png" },
        { name: "Esther Perel", image: "/hero/card4.png" },
    ];
    const [selectedCreator, setSelectedCreator] = useState(creators[0]);

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
                    slidesToShow: 1.5, // Show 3.1 slides
                    centerMode: true,
                },
            },
        ],
    };

    return (
        <>
        {/* Navbar with Tabs */}
        <Container className=" bg-black text-white p-5">
            <div className="text-left lg:text-left md:text-left">
                <h1 className="text-xl lg:text-3xl md:text-3xl lg:font-bold" style={{ fontFamily: 'Playfair' }}>
                    Welcome Back, Alex.
                </h1>

                {/* Tabs Section */}
                <div className="flex gap-6 mt-6 ">
                    {["home", "content", "coaching", "creators"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTabPage(tab)}
                            className={`text-gray-400 text-sm lg:text-lg relative transition duration-300 ${
                                activeTabPage === tab ? "text-white font-bold before:absolute before:w-full before:h-1 before:bg-white before:-bottom-2 before:left-0" : ""
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
        </Container>

        {/* Render the selected tab's component separately (Each has its own <Container>) */}
        {activeTabPage === "home" && <HomePage />}
        {activeTabPage === "content" && <Chat />}
        {activeTabPage === "coaching" && <Practice />}
        {activeTabPage === "creators" && <CreatorSearch />}
    </>
);
};


const HomePage = () => {
    const [videoLinks, setVideoLinks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [inputValueQ, setInputValueQ] = useState('');
    const [chatResponse, setChatResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("videos");
    const [activeTabPage, setActiveTabPage] = useState("home");


    const creators = [
        { name: "Glucose Revolution", image: "/hero/card1.png" },
        { name: "Jessie Inchauspe", image: "/hero/card2.png" },
        { name: "Ramit Sethi", image: "/hero/card3.png" },
        { name: "Esther Perel", image: "/hero/card4.png" },
    ];
    const [selectedCreator, setSelectedCreator] = useState(creators[0]);

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
                    slidesToShow: 1.5, // Show 3.1 slides
                    centerMode: true,
                },
            },
        ],
    };

    return (
        <Container className="min-h-screen bg-black text-white p-5">
        <div className="text-left  lg:text-left md:text-left mb-10">
            <div className="flex justify-center items-center w-full">
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
                    <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                    <div className="flex space-x-5 mb-5 ">
                        <h2
                            className={`text-md md:text-md lg:text-md pb-2 cursor-pointer ${activeTab === "videos" ? "border-b-2 border-white" : "text-gray-400"
                                }`}
                            onClick={() => setActiveTab("videos")}
                        >
                            Videos
                        </h2>
                        <h2
                            className={`text-md md:text-md lg:text-md pb-2 cursor-pointer ${activeTab === "coaching" ? "border-b-2 border-white" : "text-gray-400"
                                }`}
                            onClick={() => setActiveTab("coaching")}
                        >
                            Coaching
                        </h2>
                    </div>
                    </Reveal>
                    <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                    <div>
                        <h2 className="text-md md:text-md lg:text-md mb-5">
                            {activeTab === "videos"
                                ? "You watched videos about dopamine fasting, personal finance tips, and skin care."
                                : "Discover coaching sessions designed to help you improve your skills and mindset."}
                        </h2>
                    </div>
                    </Reveal>
                    {/* Chat Input and Response Logic */}
                    <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                    <div className="mt-auto">
                        {!chatResponse ? (
                            // Input Section
                            <>
                                <div className="flex space-x-3 mb-2">
                                    {creators.map((creator, index) => (
                                        <button
                                            key={index}
                                            className={`w-10 h-10 rounded-full overflow-hidden border-2 ${selectedCreator.name === creator.name ? "border-white" : "border-transparent"
                                                }`}
                                            onClick={() => setSelectedCreator(creator)}
                                        >
                                            <img src={creator.image} alt={creator.name} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>


                                <div className="flex items-center w-full gap-2">



                                    {/* Text Input */}
                                    <input
                                        type="text"
                                        placeholder={`Ask ${selectedCreator.name} anything`}
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

                {/* Right Cards Section */}
                <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full lg:w-2/3 mt-10">
                    {activeTab === "videos" ? (
                        <>
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
                            <div className=" flex relative text-center h-64 flex flex-col items-center justify-center bg-[#262121] rounded-lg">
                                <h3 className="text-white text-center text-xs lg:text-lg md:text-lg absolute top-1">
                                    Mastering Effective Feedback
                                </h3>
                                <img src="/hero/card3.png" alt="Card 2" className="rounded-md w-full h-full object-cover" />
                            </div>
                            <div className="hidden md:flex relative text-center h-64 flex flex-col items-center justify-center bg-[#262121] rounded-lg">
                                <h3 className="text-white text-center text-xs lg:text-lg md:text-lg absolute top-1">
                                    Mastering Effective Feedback
                                </h3>
                                <img src="/hero/card4.png" alt="Card 2" className="rounded-md w-full h-full object-cover" />
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

                        </>
                    ) : (
                        <>
                            {/* Coaching Cards */}
                            {/* Static Cards */}
                            <div className="relative text-center h-64 flex flex-col items-center justify-center bg-[#262121] rounded-lg">
                                <img src="/creators/coach1.png" alt="Card 1" className="rounded-md w-full h-full object-cover" />
                            </div>
                            <div className="relative text-center h-64 flex flex-col items-center justify-center bg-[#262121] rounded-lg">
                                <img src="/creators/coach2.png" alt="Card 2" className="rounded-md w-full h-full object-cover" />
                            </div>
                            <div className="flex relative text-center h-64 flex flex-col items-center justify-center bg-[#262121] rounded-lg">
                                <img src="/creators/coach3.png" alt="Card 2" className="rounded-md w-full h-full object-cover" />
                            </div>
                            <div className="hidden md:flex relative text-center h-64 flex flex-col items-center justify-center bg-[#262121] rounded-lg">
                                <img src="/creators/coach4.png" alt="Card 2" className="rounded-md w-full h-full object-cover" />
                            </div>
                        </>
                    )}
                </div>
                </Reveal>
            </div>
       

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
                            className="w-full h-80 overflow-hidden rounded-lg "
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


      
    </Container >
    );
};


export default VideoAnalysisPage;
