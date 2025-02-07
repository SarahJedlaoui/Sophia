import React, { useState } from 'react';
import { Reveal } from 'react-awesome-reveal';
import { fadeInUp } from '@/keyframes'; // Include this keyframe animation
import { Button, Container } from '.';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';




const Chat = () => {
    const [videoLinks, setVideoLinks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [inputValueQ, setInputValueQ] = useState('');
    const [chatResponse, setChatResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [conversation, setConversation] = useState([
        { role: 'ai', message: 'How do you feel when you and your partner have a disagreement?' },
    ]);
    const [insights, setInsights] = useState([]); // Add this state



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


    const handleEndChat = () => {
        setConversation([]); // Clear the conversation
        setInputValueQ(''); // Reset input field
    };


    // Card data
    const cards = [
        {
            name: 'Insight',
            description:
                "To deepen emotional connection, try sharing one thing you've never shared with your partner or someone close to you. This small step can create trust.",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 20h9m-9-4h6m-6-4h3m-3-4h.01M9 12h.01M6 16h.01M6 20h.01M6 8h.01M9 4h.01M9 8h.01M6 4h.01"
                    />
                </svg>
            ),
        },
        {
            name: 'Affirmations',
            description:
                'I am worthy of love and connection, and I am brave enough to be vulnerable. I honor my individuality and my relationships, and I can find balance between the two.',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 21l-8-8m0 0l-8 8m8-8V3"
                    />
                </svg>
            ),
        },
        {
            name: 'Actions',
            description:
                'Practice Active Listening. In your next conversation, focus on listening without planning your response. Ask open-ended questions and validate the feelings of the other person before offering your viewpoint. This builds trust and understanding.',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.75 17L7 15m0 0V7a2 2 0 012-2h6a2 2 0 012 2v8m-6-6h.01M12 17h0"
                    />
                </svg>
            ),
        },
    ];

    // Save state for cards
    const [savedCards, setSavedCards] = useState({});

    const handleSaveClick = (index) => {
        setSavedCards((prev) => ({
            ...prev,
            [index]: !prev[index], // Toggle save state
        }));
    };

    return (
        <Container className="min-h-screen bg-black text-white p-5">
            {/* Welcome Section */}
            <div className="text-left  lg:text-center md:text-center mb-10">
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
            <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                <div className="relative text-white mt-10 mb-10">
                    {/* Blurred Background */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: "url('/coverb.jpeg')", // Replace with your background image
                            filter: "blur(30px)", // Adjust the blur intensity

                        }}
                    ></div>

                    {/* Content */}
                    <div className="relative z-10">
                        {/* video Section */}
                        <div>
                            <h2 className="text-xl md:text-2xl lg:text-3xl  mb-5 text-left md:text-left lg:text-left mt-5" style={{ fontFamily: 'Playfair' }}>
                                Highlights of the Video
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
                                            tl;dr - The quality of your relationships determines the quality of your lives
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
                        
                        <div className="w-full mx-auto bg-[#262121] bg-opacity-70 text-white p-5 rounded-lg shadow-lg mt-10"
                         style={{
                            backgroundColor: 'rgba(74, 62, 62, 0.7)', // Apply transparency using rgba
                        }}>
                            {/* Header */}
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center">
                                    <img
                                        src="/collections/protocol1.png"
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
            </Reveal>



            {/* Insights Section */}
            {insights && insights.length > 0 && (
                <div className="text-white flex flex-col w-full items-center mt-7">
                    {/* Title Section */}
                    <div className="text-left mb-6">
                        <h2 className="text-xl md:text-2xl lg:text-3xl mb-5 text-left mt-5" style={{ fontFamily: 'Playfair' }}>
                            Personalized Insights
                        </h2>
                        <p className="text-sm md:text-base lg:text-lg mt-2">
                            In the video, Esther Perel explores the complexities of relationships,how we connect, communicate, and grow with our partners. Based on your conversation, here&apos;s what stood out.                    </p>
                    </div>

                    {/* Dynamic Cards Section */}
                    <div className="space-y-4 w-full">
                        {insights.map((insight, index) => (
                            <div key={index} className="bg-[#4A3E3E] p-4 rounded-lg flex flex-col">
                                <div className="flex items-center gap-2 mb-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 20h9m-9-4h6m-6-4h3m-3-4h.01M9 12h.01M6 16h.01M6 20h.01M6 8h.01M9 4h.01M9 8h.01M6 4h.01"
                                        />
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
