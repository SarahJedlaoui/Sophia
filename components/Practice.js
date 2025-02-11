import React, { useState } from 'react';
import { Reveal } from 'react-awesome-reveal';
import { fadeInUp } from '@/keyframes';
import { Button, Container } from '.';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';




const Practice = () => {
    const [videoLinks, setVideoLinks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [inputValueQ, setInputValueQ] = useState('');
    const [chatResponse, setChatResponse] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [inputValuePractice, setInputValuePractice] = useState("I'm grateful for ");
    const [practiceFinished, setPracticeFinished] = useState(false); // Tracks if the practice is finished
    const examples = ['Love', 'Family', 'Health', 'Work', 'Food'];
    const creators = [
        { name: "Glucose Revolution", image: "/coverb.jpeg" },
        { name: "Esther Perel", image: "/esther.png" },
        { name: "Ramit Sethi", image: "/vid2.png" },
        { name: "Adam Grant", image: "/vid1.png" },
    ];
    const [selectedCreator, setSelectedCreator] = useState(creators[0]);
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
            <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                <div className="text-left  lg:text-left md:text-left mb-10">
                    <h1 className="text-xl  lg:text-4xl md:text-4xl lg:font-bold"
                        style={{ fontFamily: 'Playfair' }} >Your Personalized Practices</h1>
                    <p className="text-sm lg:text-lg md:text-lg mt-2 " style={{ fontFamily: 'Playfair' }} >
                        Discover practices you&apos;ve created, saved, and explore suggestions tailored just for you.                        </p>


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
                        <div className="flex space-x-5 mb-5 ">
                            <h2
                                className={`text-md md:text-md lg:text-md pb-2 cursor-pointer border-b-2 border-white `}

                            >
                                Videos
                            </h2>

                        </div>
                        <div>
                            <h2 className="text-md md:text-md lg:text-md mb-5">
                                Discover coaching sessions designed to help you improve your skills and mindset.
                            </h2>
                        </div>

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
                    </div>

                    {/* Right Cards Section */}
                    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4  w-full lg:w-2/3 mt-10">

                        {/* Coaching Cards */}
                        <div className="relative text-center h-48 md:h-64 flex flex-col items-center justify-center bg-[#262121] rounded-lg overflow-hidden">
                            <img
                                src="/creators/coach1.png"
                                alt="Card 1"
                                className="rounded-md w-full h-full object-cover"
                            />
                        </div>
                        <div className="relative text-center h-48 md:h-64 flex flex-col items-center justify-center bg-[#262121] rounded-lg overflow-hidden">
                            <img
                                src="/creators/coach2.png"
                                alt="Card 1"
                                className="rounded-md w-full h-full object-cover"
                            />
                        </div>
                        <div className="relative text-center h-48 md:h-64 flex flex-col items-center justify-center bg-[#262121] rounded-lg overflow-hidden">
                            <img
                                src="/creators/coach3.png"
                                alt="Card 1"
                                className="rounded-md w-full h-full object-cover"
                            />
                        </div>
                        <div className="hidden md:flex relative text-center h-48 md:h-64 flex flex-col items-center justify-center bg-[#262121] rounded-lg overflow-hidden">
                            <img
                                src="/creators/coach4.png"
                                alt="Card 1"
                                className="rounded-md w-full h-full object-cover"
                            />
                        </div>
                       
                    </div>
                </div>
            </Reveal>



            {/* practice Section */}


            <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                <div className=" text-white mt-10">

                    <div className="text-left lg:text-center mb-6">
                        <h2 className="text-xl md:text-2xl lg:text-3xl text-left mb-6" style={{ fontFamily: 'Playfair' }}>
                            Improve your ability to understand                        </h2>
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

            {/* practice Section2 */}
            <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                <div className="flex flex-row lg:flex-row  text-white rounded-lg overflow-hidden shadow-lg mt-10">
                    {/* Left Section: Image and Title */}
                    <div className="bg-[#6B7B88] flex flex-col items-center justify-between p-4 w-1/3 lg:w-1/4">
                        <div className="w-full h-[100px] lg:h-[150px] flex items-center">
                            <img
                                src="/coverb.jpeg"
                                alt="Emotional Intelligence Coaching"
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                        <h3 className="text-white text-lg lg:text-xl font-bold mt-4" style={{ fontFamily: 'Playfair' }}>
                            Emotional Intelligence Coaching
                        </h3>
                        <button
                            className="mt-2 bg-white text-black py-1 px-2 rounded-full text-xs font-medium hover:bg-gray-200"
                            onClick={() => alert('Get this now clicked!')} // Add logic here
                        >
                            Get this now
                        </button>
                    </div>

                    {/* Right Section: Description */}
                    <div className="p-6 flex flex-col justify-between lg:w-3/4">
                        <div>
                            <div className="flex items-center mb-4">
                                <img
                                    src="/vid4.png" // Replace with the profile picture URL
                                    alt="Esther Perel"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className="ml-3">
                                    <p className="text-sm font-medium">Emotional Intelligence</p>
                                    <p className="text-xs text-gray-400">By Esther Perel</p>
                                </div>
                            </div>
                            <h4 className="text-sm lg:text-xl font-semibold mb-3">
                                Try Before You Buy – Experience the Coaching Module Firsthand
                            </h4>
                            <p className="text-xs lg:text-base text-gray-300 mb-4">
                                Test a sample lesson, ask questions, and try interactive exercises to see how this coaching module can help you.
                            </p>
                        </div>
                        <div className="flex flex-row justify-between ">
                            <p className="text-sm lg:text-base font-medium text-white mb-3">What skills will I gain?</p>
                            <button
                                className="flex items-center bg-[#6B7B88] text-white py-2 px-4 rounded-full hover:bg-gray-700"
                                onClick={() => alert('Explore clicked!')} // Add logic here
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </Reveal>

            <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                <div className="flex flex-row lg:flex-row  text-white rounded-lg overflow-hidden shadow-lg mt-10">
                    {/* Left Section: Image and Title */}
                    <div className="bg-[#6B7B88] flex flex-col items-center justify-between p-4 w-1/3 lg:w-1/4">
                        <div className="w-full h-[100px] lg:h-[150px] flex items-center">
                            <img
                                src="/vid3.png" // Replace with the actual image URL
                                alt="Emotional Intelligence Coaching"
                                className="w-full h-full rounded-lg object-cover"
                            />
                        </div>
                        <h3 className="text-white text-lg lg:text-xl font-bold mt-4" style={{ fontFamily: 'Playfair' }}>
                            Management Mastery Coaching
                        </h3>
                        <button
                            className="mt-2 bg-white text-black py-1 px-2 rounded-full text-xs font-medium hover:bg-gray-200"
                            onClick={() => alert('Get this now clicked!')} // Add logic here
                        >
                            Get this now
                        </button>
                    </div>

                    {/* Right Section: Description */}
                    <div className="p-6 flex flex-col justify-between lg:w-3/4">
                        <div>
                            <div className="flex items-center mb-4">
                                <img
                                    src="/vid2.png" // Replace with the profile picture URL
                                    alt="Esther Perel"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className="ml-3">
                                    <p className="text-sm font-medium">Management Coaching</p>
                                    <p className="text-xs text-gray-400">By anna Hilton</p>
                                </div>
                            </div>
                            <h4 className="text-sm lg:text-xl font-semibold mb-3">
                                Try Before You Buy – Experience the Coaching Module Firsthand
                            </h4>
                            <p className="text-xs lg:text-base text-gray-300 mb-4">
                                Test a sample lesson, ask questions, and try interactive exercises to see how this coaching module can help you.
                            </p>
                        </div>
                        <div className="flex flex-row justify-between ">
                            <p className="text-sm lg:text-base font-medium text-white mb-3">What skills will I gain?</p>
                            <button
                                className="flex items-center bg-[#6B7B88] text-white py-2 px-4 rounded-full hover:bg-gray-700"
                                onClick={() => alert('Explore clicked!')} // Add logic here
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </Reveal>
        </Container>
    );
};

export default Practice;
