import React, { useState } from 'react';
import { Reveal } from 'react-awesome-reveal';
import { fadeInUp } from '@/keyframes'; // Include this keyframe animation
import { Button, Container } from '.';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';




const Chat = () => {
    const [videoLinks, setVideoLinks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [inputValueChat, setInputValueChat] = useState('');
    const [inputValueQ, setInputValueQ] = useState('');
    const [chatResponse, setChatResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [conversation, setConversation] = useState([
        { role: 'ai', message: 'How do you feel when you and your partner have a disagreement?' },
    ]);
    const [insights, setInsights] = useState([]); // Add this state
    const [savedInsights, setSavedInsights] = useState([]);
    const hasSavedInsights = savedInsights.length > 0; // Check if any insight is saved

    const [selectedImage, setSelectedImage] = useState("/cover.png");
    const [selectedTitle, setSelectedTitle] = useState("Enhancing Focus Through Routine");

    const cards = [
        { title: "Enhancing Focus Through Routine", image: "/cover.png" },
        { title: "Mastering Effective Feedback", image: "/content2.png" },
        { title: "Effective Leadership", image: "/content3.png" },
        { title: "Building Resilience", image: "/content4.png" },
    ];


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
            {/* Welcome Section */}
            <div className="text-left  lg:text-left md:text-left mb-10">
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
                <div className="flex flex-col justify-between w-full lg:w-full h-full">
                    {/* Title Section */}
                    <Reveal keyframes={fadeInUp} duration={800} delay={50}>

                        <div className="flex space-x-5 mb-5 ">
                            <h2
                                className={`text-md md:text-md lg:text-md pb-2 cursor-pointer  border-b-2 border-white"
                                    }`}
                            >
                                All Videos
                            </h2>

                        </div>
                    </Reveal>
                    <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                        <div>
                            <h2 className="text-md md:text-md lg:text-md mb-5">

                                You watched videos about dopamine fasting, personal finance tips, and skin care.

                            </h2>
                        </div>
                    </Reveal>
                    <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                        {/* Chat Input and Response Logic */}
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
                                            value={inputValueChat}
                                            onChange={(e) => setInputValueChat(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage2()}
                                        />

                                        {/* Send Button */}
                                        <button onClick={() => handleSendMessage2()}
                                            className="bg-white p-3 rounded-full flex-shrink-0" style={{ minWidth: "48px", minHeight: "48px" }}>
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
                                                setInputValueChat(""); // Reset input
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
                    <div className=" w-full lg:w-full mt-10">
                        {/* Mobile View: Horizontal Scroll */}
                        <div className="flex gap-4 overflow-x-auto md:hidden scrollbar-hide">
                            {/* Static Cards */}
                            {cards.map((card, index) => (
                                <div
                                    key={index}
                                    className={`relative flex-shrink-0 w-[calc(100%/3.1)] sm:w-[calc(100%/4.1)] md:w-[calc(100%/5.1) lg:w-[calc(100%/6.1)] h-64 flex flex-col items-center justify-center bg-[#262121] rounded-lg overflow-hidden cursor-pointer ${selectedImage === card.image ? "border-2 border-white" : ""
                                        }`}
                                    onClick={() => {
                                        setSelectedImage(card.image);
                                        setSelectedTitle(card.title);
                                    }}
                                >
                                    {/* Dark Overlay */}
                                    <div className="absolute inset-0 bg-black opacity-50"></div>
                                    {/* Image (Black & White) */}
                                    <img
                                        src={card.image}
                                        alt={card.title}
                                        className="rounded-md w-full h-full object-cover filter grayscale"
                                    />
                                </div>
                            ))}




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
                        {/* Desktop View: Grid Layout */}
                        <div className="hidden md:grid grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-4">
                            {cards.map((card, index) => (
                                <div
                                    key={index}
                                    className={`relative text-center h-64 flex flex-col items-center justify-center bg-[#262121] rounded-lg overflow-hidden cursor-pointer ${selectedImage === card.image ? "border-2 border-white" : ""
                                        }`}
                                    onClick={() => {
                                        setSelectedImage(card.image);
                                        setSelectedTitle(card.title);
                                    }}
                                >
                                    {/* Dark Overlay */}
                                    <div className="absolute inset-0 bg-black opacity-50"></div>
                                    {/* Image (Black & White) */}
                                    <img
                                        src={card.image}
                                        alt={card.title}
                                        className="rounded-md w-full h-full object-cover filter grayscale"
                                    />
                                </div>
                            ))}


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
                            <h2 className="text-xl md:text-2xl lg:text-3xl  mb-5 text-left md:text-left lg:text-left mt-5" style={{ fontFamily: 'Playfair' }}>
                                Highlights of the Video
                            </h2>
                        </Reveal>
                        <Reveal keyframes={fadeInUp} duration={800} delay={50}>
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
                                        src={selectedImage}
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
                                            tl;dr - {selectedTitle}
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
                                    src={selectedImage}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full"
                                />
                                <p className="ml-4 font-medium text-sm">Ask me anything</p>
                            </div>
                            <button
                                onClick={handleEndChat}
                                className="text-gray-400 hover:text-white text-sm"
                            >
                                ✖
                            </button>
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
                    onClick={() => alert('Practices saved!')}
                    disabled={!hasSavedInsights} // Disable if no saved insights
                    className={`py-2 px-4 rounded-full text-xs font-medium transition ${
                        hasSavedInsights ? "bg-white text-black hover:bg-gray-200" : "bg-gray-600 text-gray-300 cursor-not-allowed"
                    }`}
                >
                    Save to Coaching
                </button>
            </div>

            {/* Subtitle */}
            <p className="text-sm md:text-base lg:text-lg mt-2">
                In the video, Esther Perel explores the complexities of relationships, how we connect, communicate, and grow with our partners. Based on your conversation, here&apos;s what stood out.
            </p>

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
                                className={`h-6 w-6 ${
                                    savedInsights.some((item) => item.title === insight.title) ? "text-white fill-white" : "text-gray-400"
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
        </Container>
    );
};

export default Chat;
