import React, { useEffect, useState } from 'react';

const EmpowerSection = () => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setCursorPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="bg-[#EBEBF5] py-20 relative mb-20">
            {/* Large Image on Mobile */}
            <div className="block md:hidden mb-8">
                <img
                    src="/pic.jpg" // Replace with the correct path to your mobile image
                    alt="Mobile Hero Image"
                    className="mx-auto rounded-lg shadow-lg w-[90%]"
                />
            </div>

            {/* Images with shaking effect for larger screens */}
            <div
                className="absolute hidden md:block lg:left-[-10%] md:left-[-11%] w-[270px] lg:w-[400px] h-auto rotate-[-5deg]"
                style={{
                    transform: `translate(${cursorPosition.x * 0.02}px, ${cursorPosition.y * 0.02}px)`,
                }}
            >
                <img
                    src="/pic.jpg" // Replace with the correct path to your left image
                    alt="Left Image"
                    className="rounded-lg shadow-lg"
                />
            </div>

            <div
                className="absolute hidden md:block lg:right-[-10%] md:right-[-11%] w-[270px] lg:w-[400px] h-auto rotate-[5deg]"
                style={{
                    transform: `translate(-${cursorPosition.x * 0.02}px, -${cursorPosition.y * 0.02}px)`,
                }}
            >
                <img
                    src="/pic.jpg" // Replace with the correct path to your right image
                    alt="Right Image"
                    className="rounded-lg shadow-lg"
                />
            </div>

            {/* Content Section */}
            <div className="max-w-xl lg:max-w-5xl md:max-w-xl mx-auto px-5 text-center">
                <h2 className="font-bold text-2xl lg:text-4xl mb-4 text-black">
                    Empower Your Influence with <span className="text-[#8E72D7]">Sophia</span>
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                    Turn your content into actionable coaching experiences that inspire and transform lives. Upload videos, podcasts, or reels, and let Sophia help you create personalized growth journeys for your audience:
                </p>

                {/* Bulleted List */}
                <ul className="text-center mx-auto mb-6 list-disc list-inside text-gray-700 space-y-2">
                    <li>
                        <span role="img" aria-label="video">🎥</span> Transform videos into coaching protocols.
                    </li>
                    <li>
                        <span role="img" aria-label="lightbulb">💡</span> Provide value your audience will love.
                    </li>
                    <li>
                        <span role="img" aria-label="star">🌟</span> Amplify your impact and engagement.
                    </li>
                </ul>

                {/* Button */}
                <button className="bg-[#8E72D7] text-white px-6 py-3 rounded-full shadow-lg hover:bg-purple-800">
                    Create YourPage
                </button>
            </div>
        </div>
    );
};

export default EmpowerSection;
