import React, { useState } from 'react';
import Image from 'next/image';
import { Container } from '../../components';
import { JackInTheBox, Reveal } from 'react-awesome-reveal';
import { fadeInUp } from '@/keyframes';
import { useRouter } from 'next/router';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';






const Chat = ({ setActiveTabPage }) => {
    const [inputValueQ, setInputValueQ] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [conversation, setConversation] = useState([
        { role: 'ai', message: 'How do you feel when you and your partner have a disagreement?' },
    ]);
    const [insights, setInsights] = useState([]); // Add this state
    const [savedInsights, setSavedInsights] = useState([]);
    const hasSavedInsights = savedInsights.length > 0; // Check if any insight is saved

    const [selectedImage, setSelectedImage] = useState("/cover.png");


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
        <Container className=" bg-black text-white p-5">

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
        </Container>
    );
};





const Practice = () => {
    const [inputValuePractice, setInputValuePractice] = useState("I'm grateful for ");
    const [practiceFinished, setPracticeFinished] = useState(false); // Tracks if the practice is finished
    const examples = ['Love', 'Family', 'Health', 'Work', 'Food'];

    const handleExampleClick = (example) => {
        setInputValuePractice(`I'm grateful for ${example}`);
    };

    const handleSubmitPractice = () => {
        setPracticeFinished(true); // Set practice to finished
    };

    return (
        <Container className="bg-black text-white p-5">
            {/* practice Section */}


            <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                <div className=" text-white mt-10">

                    <div className="text-left lg:text-center mb-6">
                        <h2 className="text-xl md:text-2xl lg:text-3xl text-left mb-6" style={{ fontFamily: 'Playfair' }}>
                            Improve your ability to understand
                        </h2>
                        <p className="text-sm lg:text-lg mt-2">
                            Strengthen your connections with practical, guided steps. Build trust, improve communication, and nurture meaningful relationships.
                        </p>
                    </div>


                    <div className=" mx-auto bg-[#7A65B0] text-white p-4 rounded-lg">


                        <div className="flex items-center mb-4">
                            <img
                                src="/collections/protocol1.png"
                                alt="Esther Perl"
                                className="w-12 h-12 md:w-20 md:h-20 lg:w-25 lg:h-25 rounded-full"
                            />
                            <div className="ml-4">
                                <p className="text-xs lg:text-lg font-medium">The Daily Connection Ritual</p>
                                <p className="text-xs md:text-lg text-gray-200">By Esther Perl</p>
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

        </Container>
    );
};






const BestSelfPage = () => {
    const router = useRouter();

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
            videoUrl: "https://youtube.com/shorts/UEEDbtVJBI4?si=d5mS2FRznz4fF6hh",
            instructions: [
                "Make a list of your top three favorite distractions.",
                "Ask yourself, 'What relief do I get from this distraction?'.",
                "Consider, 'How helpful is this distraction to me?'.",
                "Make another list of any negative consequences of these distractions.",
                "Narrow down the list to focus on the most beneficial distractions."
            ],
            section: null,
        },
        {
            title: "Follow Your Curiosity",
            description: "Curiosity fuels creativity and resilience. By exploring new ideas and perspectives, you can expand your sense of possibility and discover untapped potential in yourself.",
            image: "/illustration2.svg",
            guide: "Anna Smith",
            guideImage: "/cover.png",
            details: `Anna Smith is a Mindfulness Coach and Neuroscience Researcher. She has spent over a decade studying the role of curiosity in personal development. 
          Through her work, she helps individuals shift from fear-based decision-making to curiosity-driven growth, encouraging them to embrace uncertainty as a tool for transformation.`,
            videoUrl: "https://youtube.com/shorts/UEEDbtVJBI4?si=d5mS2FRznz4fF6hh",
            instructions: [
                "Make a list of your top three favorite distractions.",
                "Ask yourself, 'What relief do I get from this distraction?'.",
                "Consider, 'How helpful is this distraction to me?'.",
                "Make another list of any negative consequences of these distractions.",
                "Narrow down the list to focus on the most beneficial distractions."
            ],
            section: Chat,
        },
        {
            title: "Draw Something",
            description: "Art is a powerful form of self-expression. When words fail, drawing can help you process emotions, reduce stress, and gain a deeper understanding of your inner world.",
            image: "/illustration3.svg",
            guide: "Michael Brown",
            guideImage: "/cover5.png",
            details: `Michael Brown is an Art Therapist and Creativity Educator. With a background in Expressive Arts Therapy, he has worked with children and adults to 
          unlock their creative potential. His approach emphasizes how drawing, doodling, and visual storytelling can enhance emotional well-being and mindfulness.`,
            videoUrl: "https://youtube.com/shorts/UEEDbtVJBI4?si=d5mS2FRznz4fF6hh",
            instructions: [
                "Make a list of your top three favorite distractions.",
                "Ask yourself, 'What relief do I get from this distraction?'.",
                "Consider, 'How helpful is this distraction to me?'.",
                "Make another list of any negative consequences of these distractions.",
                "Narrow down the list to focus on the most beneficial distractions."
            ],
            section: Practice,
        }
    ];
    const [selectedVideo, setSelectedVideo] = useState(videos[0]);
    const [subPage, setSubPage] = useState(null); // Controls the sub-subpages
    const formatYouTubeUrl = (url) => {
        if (url.includes("shorts/")) {
            return url.replace("shorts/", "embed/");
        } else {
            return url.replace("watch?v=", "embed/");
        }
    };


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
                {selectedVideo && !subPage && (

                    <div className="fixed left-0 bottom-0 w-full h-full p-5 bg-black text-white rounded-t-3xl shadow-xl z-50 overflow-y-auto">
                        <Container className=" bg-black text-white p-5">
                            <JackInTheBox>
                                <div className="relative">
                                    {/* Close Button
                                    <button className="absolute top-4 right-4 text-gray-400 text-2xl" onClick={() => setSelectedVideo(null)}>✖</button>
                                    */}
                                    {/* Video Illustration */}
                                    <div className="flex justify-center">
                                        <Image src={selectedVideo.image} width={250} height={250} alt={selectedVideo.title} className="rounded-lg" />
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
                                                <Image src={selectedVideo.guideImage} width={40} height={40} alt={selectedVideo.guide} className="rounded-full" />
                                                <span className="ml-2 text-sm">{selectedVideo.guide}</span>
                                            </div>
                                            <p className="text-gray-400 text-sm mt-2">{selectedVideo.details}</p>
                                        </div>
                                    </Reveal>

                                    {/* Render Action Buttons only if selectedVideo.section is null */}
                                    {selectedVideo.section === null && (
                                        <Reveal keyframes={fadeInUp} duration={800} delay={150}>
                                            <div className="mt-6">
                                                <button className="w-full bg-white text-black py-3 rounded-full font-medium" onClick={() => setSubPage('video')}>
                                                    Watch Video
                                                </button>
                                                <button className="w-full text-gray-400 py-2 mt-2" onClick={() => setSubPage('instructions')}>
                                                    Read Instructions
                                                </button>
                                            </div>
                                        </Reveal>
                                    )}


                                    {/* Dynamic Section Component */}
                                    {selectedVideo.section && <selectedVideo.section />}
                                    {/* Action Buttons */}
                                    <Reveal keyframes={fadeInUp} duration={800} delay={150}>
                                        <div className="mt-6">
                                            <button
                                                className="w-full bg-white text-black py-3 rounded-full font-medium"
                                                onClick={() => {
                                                    const currentIndex = videos.findIndex((video) => video.title === selectedVideo.title);

                                                    if (currentIndex === videos.length - 1) {
                                                        // If it's the last video, redirect to /tools
                                                        router.push("/tools");
                                                    } else {
                                                        // Otherwise, move to the next video
                                                        setSelectedVideo(videos[currentIndex + 1]);
                                                    }
                                                }}
                                            >
                                                {videos.findIndex((video) => video.title === selectedVideo.title) === videos.length - 1
                                                    ? "Finish"
                                                    : "Next"}
                                            </button>

                                        </div>
                                    </Reveal>

                                </div>
                            </JackInTheBox>
                        </Container>
                    </div>

                )}
                {subPage === 'video' && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black text-white z-50">
                        <Container className="w-full h-full md:w-3/4 lg:w-1/2 md:h-auto bg-black text-white p-5 flex flex-col justify-center ">
                            <button className=" top-4 text-left text-white text-2xl" style={{ fontFamily: 'Playfair' }} onClick={() => setSubPage(null)}>← Back</button>
                            <div className="w-full h-full flex justify-center items-center">
                                <iframe
                                    className="w-full h-full md:h-[500px] rounded-lg"
                                    src={formatYouTubeUrl(selectedVideo.videoUrl)}
                                    frameBorder="0"
                                    allowFullScreen
                                ></iframe>

                            </div>
                        </Container>
                    </div>
                )}


                {subPage === 'instructions' && (
                    <div className="fixed left-0 bottom-0 w-full h-full p-5 bg-black text-white z-50 overflow-y-auto">
                        <Container className=" bg-black text-white p-5">
                            <button className=" top-4 left-4 text-white text-2xl" style={{ fontFamily: 'Playfair' }} onClick={() => setSubPage(null)}>← Back</button>
                            <h2 className=" mt-10 text-2xl font-bold mb-4">{selectedVideo.title}</h2>
                            {selectedVideo.instructions.map((step, index) => (
                                <div key={index} className="mb-4">
                                    <h3 className="text-lg font-semibold">{index + 1}. {step.split(' ')[0]}</h3>
                                    <p className="text-gray-400 text-sm">{step}</p>
                                </div>
                            ))}
                            <button className="w-full bg-white text-black py-3 rounded-full font-medium mt-5" onClick={() => setSubPage(null)} >Finish</button>
                        </Container>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default BestSelfPage;
