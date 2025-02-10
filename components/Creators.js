import React, { useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Reveal } from 'react-awesome-reveal';
import { fadeInUp, fadeInLeft } from '@/keyframes';
import Link from 'next/link';
import { Button, Container } from '.';

const CreatorSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const creators = [
        {
            name: 'Esther Perel',
            username: '@Pscy.Esther',
            profession: 'Psychotherapist And Author',
            description:
                'Dive deep into Esther’s world of relationship psychology through engaging videos, insightful podcasts, and articles on building stronger emotional connections.',
            image: '/Esther.png',
            link: '/esther'
        },
        {
            name: 'John Doe',
            username: '@JohnDoe',
            profession: 'Life Coach',
            description:
                'Helping you achieve your goals through proven coaching techniques and actionable insights.',
            image: '/John.png',
            link: '/esther'
        },
        // Add more creators as needed
    ];

    const filteredCreators = creators.filter((creator) =>
        creator.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const creators2 = [
        {
            name: "Glucose Goddess",
            description: "Biochemist, author, and advocate for better health through nutrition.",
            image: "/creator1.png",
        },
        {
            name: "Brené Brown",
            description: "Renowned researcher and author.",
            image: "/creator2.png",
        },
        {
            name: "Adam Grant",
            description: "Organizational psychologist and bestselling author.",
            image: "/creator3.png",
        },
    ];

    const settings = {
        dots: false,
        arrows: false, // Remove left/right arrows
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1.2,
        responsive: [
            {
                breakpoint: 1024, // For medium screens (tablets)
                settings: {
                    slidesToShow: 2.01, // Show 4.1 slides
                    centerMode: true,
                },
            },
            {
                breakpoint: 768, // Mobile view
                settings: {
                    slidesToShow: 1.03,
                },
            },
        ],
    };
    return (
        <Container >
        <div className="min-h-screen  text-white  py-10">
            {/* Header */}
            <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                <h2 className="text-3xl font-bold" style={{ fontFamily: 'Playfair' }}>

                    Our Creators
                </h2>
            </Reveal>
            {/* Search Bar */}
            <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                <div className="relative mb-10">
                    <input
                        type="text"
                        placeholder="Search anything in your mind 🔍"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full py-3 px-5 rounded-full bg-[#3E3C3C] text-white placeholder-gray-400 focus:outline-none"
                    />
                </div>
            </Reveal>
            {/* Spotlight Section */}
            <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                <h2 className="text-2xl font-bold mb-5" style={{ fontFamily: 'Playfair' }}>
                    Creator of the Month
                </h2>
            </Reveal>

            {/* Creators Section */}
            <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                <div className="grid grid-cols-1 gap-5">
                    {filteredCreators.map((creator, index) => (
                        <div key={index} className="flex bg-[#4A3E3E] rounded-lg p-5 mb-5 items-center md:h-[150px]"
                        >
                            {/* Left Section: Image */}
                            <div className="w-1/3 md:w-1/5 ">
                                <img
                                    src={creator.image}
                                    alt={creator.name}
                                    className="w-full h-full md:w-40 md:h-28 rounded-md object-cover"
                                />
                            </div>

                            {/* Right Section: Content */}
                            <div className="w-2/3 pl-5">
                                <div className="flex items-center justify-between">
                                    {/* Name and Button */}
                                    <h3 className="text-xl font-bold text-white">{creator.name}</h3>
                                    <Link href={creator.link} passHref>
                                        <button className="py-1 px-1 bg-white opacity-70 text-black rounded-full text-sm">
                                            View profile
                                        </button>
                                    </Link>
                                </div>
                                <p className="text-sm text-gray-300">{creator.username}</p>
                                <p className="text-sm mt-2 text-white">{creator.profession}</p>
                                <p className="text-xs mt-2 text-gray-400">{creator.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Reveal>


            {/* No results message */}
            {filteredCreators.length === 0 && (
                <p className="text-gray-400 text-center mt-10">No creators found.</p>
            )}

            {/* Carousel Section */}
            <Reveal keyframes={fadeInLeft} duration={800} delay={50}>
                <div className="w-full ">
                    <Slider {...settings}>
                        {creators2.map((creator, index) => (
                            <div key={index} className="p-5">
                                <div className="relative bg-white rounded-lg shadow-lg p-4"
                                    style={{ height: '120px' }}
                                >
                                    {/* Text Content */}
                                    <div className="flex-1 w-2/3">
                                        <h3 className="text-xl text-black font-bold mb-2">{creator.name}</h3>
                                        <p className="text-sm text-gray-600">{creator.description}</p>
                                    </div>

                                    {/* Image */}
                                    <div className="absolute top-[-30px] right-[-15px] w-1/3">
                                        <img
                                            src={creator.image}
                                            alt={creator.name}
                                            className="w-24 h-36 object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </Reveal>

            <div className="min-h-screen text-white px-5 py-10">
                {/* Section Title */}
                <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                    <div className="text-left mb-10">
                        <h2 className="text-3xl font-bold" style={{ fontFamily: 'Playfair' }}>
                        Our creators  Expertise
                        </h2>
                        <p className="text-sm text-gray-300 mt-2">
                        Get practical tools and exercises to transform your life.
                        </p>
                    </div>
                </Reveal>
                {/* Grid Section */}
                <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* 🔹 Duplicated Section (Visible Only on Desktop, Aligned Left) */}
                    <div className="hidden md:flex">
                        {/* Grid Section */}
                        <div
                            className="grid grid-cols-2 gap-3"
                            style={{
                                gridTemplateRows: 'auto auto',
                            }}
                        >
                            <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                                {/* Card 1 (Tall Card) */}
                                <div
                                    className="bg-[#323232] rounded-lg overflow-hidden flex flex-col justify-center items-center"
                                    style={{ height: '400px', backgroundColor: 'rgba(74, 62, 62, 0.7)' }}
                                >
                                    {/* Image Section */}
                                    <div className="w-full flex justify-center items-center p-2">
                                        <img
                                            src="/vid1.png"
                                            alt="Relationship Reboot Coaching"
                                            className="w-full max-w-xs md:max-w-xs lg:max-w-xs rounded-50 h-auto md:max-h-64 lg:max-h-64 object-cover" />
                                    </div>
                                    {/* Content Section */}
                                    <div className="w-full flex flex-col items-center justify-center">
                                        <h3 className="text-md md:text-lg font-semibold text-center mb-5">Relationship Reboot Coaching</h3>
                                        <button className="bg-white opacity-70 text-black py-1 px-4 rounded-full text-sm font-medium hover:bg-gray-200">
                                            Discover More 
                                        </button>
                                    </div>
                                </div>
                            </Reveal>
                            <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                                {/* Card 2 (Smaller Card) */}
                                <div
                                    className="bg-[#FFFFFF] rounded-lg overflow-hidden flex flex-col justify-center items-center"
                                    style={{ height: '300px', backgroundColor: 'rgba(202, 184, 184, 0.7)' }}
                                >
                                    {/* Image Section */}
                                    <div className="w-full flex justify-center items-center p-4">
                                        <img
                                            src="/R.jpg"
                                            alt="Emotional Resilience Mastery"
                                            className="w-full max-w-xs md:max-w-xs lg:max-w-xs max-h-40 rounded-70 object-cover"
                                        />
                                    </div>
                                    {/* Content Section */}
                                    <div className="w-full flex flex-col items-center justify-center">
                                        <h3 className="text-md md:text-lg font-semibold text-center mb-2">Emotional Resilience Mastery</h3>
                                        <button className="bg-white opacity-70 text-black py-2 px-4 rounded-full text-sm font-medium hover:bg-gray-200">
                                            Discover More 
                                        </button>
                                    </div>
                                </div>
                            </Reveal>
                            <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                                {/* Card 3 (Smaller Card) */}
                                <div
                                    className="bg-[#4A3E3E] rounded-lg overflow-hidden flex flex-col justify-center items-center p-4"
                                    style={{ height: '300px', backgroundColor: 'rgba(202, 184, 184, 0.7)' }}
                                >
                                    {/* Image Section */}
                                    <div className="w-full flex justify-center items-center mb-4">
                                        <img
                                            src="/vid3.png"
                                            alt="Emotional Intelligence Coaching"
                                            className="w-full max-w-xs md:max-w-xs lg:max-w-xs max-h-40 object-cover"
                                        />
                                    </div>
                                    {/* Content Section */}
                                    <div className="w-full flex flex-col items-center justify-center">
                                        <h3 className="text-md md:text-lg font-semibold text-center mb-2">Emotional Intelligence Coaching</h3>
                                        <button className="bg-white opacity-70 text-black py-2 px-4 rounded-full text-sm font-medium hover:bg-gray-200">
                                            Discover More 
                                        </button>
                                    </div>
                                </div>
                            </Reveal>
                            <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                                {/* Card 4 (Tall Card) */}
                                <div
                                    className="bg-[#323232] rounded-lg overflow-hidden flex flex-col justify-center items-center -mt-24 p-2"
                                    style={{ height: '400px', backgroundColor: 'rgba(74, 62, 62, 0.7)' }}
                                >
                                    {/* Image Section */}
                                    <div className="w-full flex justify-center items-center mb-4">
                                        <img
                                            src="/vid2.png"
                                            alt="Rebuilding Trust Modules"
                                            className="w-full max-w-xs md:max-w-xs lg:max-w-xs rounded-50 h-auto md:max-h-64 lg:max-h-64 object-cover"
                                        />
                                    </div>
                                    {/* Content Section */}
                                    <div className="w-full flex flex-col items-center justify-center">
                                        <h3 className="text-md md:text-lg font-semibold text-center mb-2">Rebuilding Trust Modules</h3>
                                        <button className="bg-white opacity-70 text-black py-2 px-4 rounded-full text-sm font-medium hover:bg-gray-200">
                                            Discover More 
                                        </button>
                                    </div>
                                </div>
                            </Reveal>

                        </div>
                    </div>

                    {/* 🔹 Original Section (Visible on All Screens) */}
                    <div>
                        {/* Grid Section */}
                        <div
                            className="grid grid-cols-2 gap-3"
                            style={{
                                gridTemplateRows: 'auto auto',
                            }}
                        >
                            <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                                {/* Card 1 (Tall Card) */}
                                <div
                                    className="bg-[#323232] rounded-lg overflow-hidden flex flex-col justify-center items-center"
                                    style={{ height: '400px', backgroundColor: 'rgba(74, 62, 62, 0.7)' }}
                                >
                                    {/* Image Section */}
                                    <div className="w-full flex justify-center items-center p-2">
                                        <img
                                            src="/vid1.png"
                                            alt="Relationship Reboot Coaching"
                                            className="w-full max-w-xs md:max-w-xs lg:max-w-xs rounded-50 h-auto md:max-h-64 lg:max-h-64 object-cover" />
                                    </div>
                                    {/* Content Section */}
                                    <div className="w-full flex flex-col items-center justify-center">
                                        <h3 className="text-md md:text-lg font-semibold text-center mb-5">Relationship Reboot Coaching</h3>
                                        <button className="bg-white opacity-70 text-black py-1 px-4 rounded-full text-sm font-medium hover:bg-gray-200">
                                            Discover More 
                                        </button>
                                    </div>
                                </div>
                            </Reveal>
                            <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                                {/* Card 2 (Smaller Card) */}
                                <div
                                    className="bg-[#FFFFFF] rounded-lg overflow-hidden flex flex-col justify-center items-center"
                                    style={{ height: '300px', backgroundColor: 'rgba(202, 184, 184, 0.7)' }}
                                >
                                    {/* Image Section */}
                                    <div className="w-full flex justify-center items-center p-4">
                                        <img
                                            src="/R.jpg"
                                            alt="Emotional Resilience Mastery"
                                            className="w-full max-w-xs md:max-w-xs lg:max-w-xs max-h-40 rounded-70 object-cover"
                                        />
                                    </div>
                                    {/* Content Section */}
                                    <div className="w-full flex flex-col items-center justify-center">
                                        <h3 className="text-md md:text-lg font-semibold text-center mb-2">Emotional Resilience Mastery</h3>
                                        <button className="bg-white opacity-70 text-black py-2 px-4 rounded-full text-sm font-medium hover:bg-gray-200">
                                            Discover More 
                                        </button>
                                    </div>
                                </div>
                            </Reveal>
                            <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                                {/* Card 3 (Smaller Card) */}
                                <div
                                    className="bg-[#4A3E3E] rounded-lg overflow-hidden flex flex-col justify-center items-center p-4"
                                    style={{ height: '300px', backgroundColor: 'rgba(202, 184, 184, 0.7)' }}
                                >
                                    {/* Image Section */}
                                    <div className="w-full flex justify-center items-center mb-4">
                                        <img
                                            src="/vid3.png"
                                            alt="Emotional Intelligence Coaching"
                                            className="w-full max-w-xs md:max-w-xs lg:max-w-xs max-h-40 object-cover"
                                        />
                                    </div>
                                    {/* Content Section */}
                                    <div className="w-full flex flex-col items-center justify-center">
                                        <h3 className="text-md md:text-lg font-semibold text-center mb-2">Emotional Intelligence Coaching</h3>
                                        <button className="bg-white opacity-70 text-black py-2 px-4 rounded-full text-sm font-medium hover:bg-gray-200">
                                            Discover More 
                                        </button>
                                    </div>
                                </div>
                            </Reveal>
                            <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                                {/* Card 4 (Tall Card) */}
                                <div
                                    className="bg-[#323232] rounded-lg overflow-hidden flex flex-col justify-center items-center -mt-24 p-2"
                                    style={{ height: '400px', backgroundColor: 'rgba(74, 62, 62, 0.7)' }}
                                >
                                    {/* Image Section */}
                                    <div className="w-full flex justify-center items-center mb-4">
                                        <img
                                            src="/vid2.png"
                                            alt="Rebuilding Trust Modules"
                                            className="w-full max-w-xs md:max-w-xs lg:max-w-xs rounded-50 h-auto md:max-h-64 lg:max-h-64 object-cover"
                                        />
                                    </div>
                                    {/* Content Section */}
                                    <div className="w-full flex flex-col items-center justify-center">
                                        <h3 className="text-md md:text-lg font-semibold text-center mb-2">Rebuilding Trust Modules</h3>
                                        <button className="bg-white opacity-70 text-black py-2 px-4 rounded-full text-sm font-medium hover:bg-gray-200">
                                            Discover More 
                                        </button>
                                    </div>
                                </div>
                            </Reveal>

                        </div>
                    </div>

                    {/* 🔹 Duplicated Section2 (Visible Only on Desktop, Aligned Left) */}
                    <div className="hidden lg:flex">
                        {/* Grid Section */}
                        <div
                            className="grid grid-cols-2 gap-3"
                            style={{
                                gridTemplateRows: 'auto auto',
                            }}
                        >
                            <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                                {/* Card 1 (Tall Card) */}
                                <div
                                    className="bg-[#323232] rounded-lg overflow-hidden flex flex-col justify-center items-center"
                                    style={{ height: '400px', backgroundColor: 'rgba(74, 62, 62, 0.7)' }}
                                >
                                    {/* Image Section */}
                                    <div className="w-full flex justify-center items-center p-2">
                                        <img
                                            src="/vid1.png"
                                            alt="Relationship Reboot Coaching"
                                            className="w-full max-w-xs md:max-w-xs lg:max-w-xs rounded-50 h-auto md:max-h-64 lg:max-h-64 object-cover" />
                                    </div>
                                    {/* Content Section */}
                                    <div className="w-full flex flex-col items-center justify-center">
                                        <h3 className="text-md md:text-lg font-semibold text-center mb-5">Relationship Reboot Coaching</h3>
                                        <button className="bg-white opacity-70 text-black py-1 px-4 rounded-full text-sm font-medium hover:bg-gray-200">
                                            Discover More 
                                        </button>
                                    </div>
                                </div>
                            </Reveal>
                            <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                                {/* Card 2 (Smaller Card) */}
                                <div
                                    className="bg-[#FFFFFF] rounded-lg overflow-hidden flex flex-col justify-center items-center"
                                    style={{ height: '300px', backgroundColor: 'rgba(202, 184, 184, 0.7)' }}
                                >
                                    {/* Image Section */}
                                    <div className="w-full flex justify-center items-center p-4">
                                        <img
                                            src="/R.jpg"
                                            alt="Emotional Resilience Mastery"
                                            className="w-full max-w-xs md:max-w-xs lg:max-w-xs max-h-40 rounded-70 object-cover"
                                        />
                                    </div>
                                    {/* Content Section */}
                                    <div className="w-full flex flex-col items-center justify-center">
                                        <h3 className="text-md md:text-lg font-semibold text-center mb-2">Emotional Resilience Mastery</h3>
                                        <button className="bg-white opacity-70 text-black py-2 px-4 rounded-full text-sm font-medium hover:bg-gray-200">
                                            Discover More 
                                        </button>
                                    </div>
                                </div>
                            </Reveal>
                            <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                                {/* Card 3 (Smaller Card) */}
                                <div
                                    className="bg-[#4A3E3E] rounded-lg overflow-hidden flex flex-col justify-center items-center p-4"
                                    style={{ height: '300px', backgroundColor: 'rgba(202, 184, 184, 0.7)' }}
                                >
                                    {/* Image Section */}
                                    <div className="w-full flex justify-center items-center mb-4">
                                        <img
                                            src="/vid3.png"
                                            alt="Emotional Intelligence Coaching"
                                            className="w-full max-w-xs md:max-w-xs lg:max-w-xs max-h-40 object-cover"
                                        />
                                    </div>
                                    {/* Content Section */}
                                    <div className="w-full flex flex-col items-center justify-center">
                                        <h3 className="text-md md:text-lg font-semibold text-center mb-2">Emotional Intelligence Coaching</h3>
                                        <button className="bg-white opacity-70 text-black py-2 px-4 rounded-full text-sm font-medium hover:bg-gray-200">
                                            Discover More 
                                        </button>
                                    </div>
                                </div>
                            </Reveal>
                            <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                                {/* Card 4 (Tall Card) */}
                                <div
                                    className="bg-[#323232] rounded-lg overflow-hidden flex flex-col justify-center items-center -mt-24 p-2"
                                    style={{ height: '400px', backgroundColor: 'rgba(74, 62, 62, 0.7)' }}
                                >
                                    {/* Image Section */}
                                    <div className="w-full flex justify-center items-center mb-4">
                                        <img
                                            src="/vid2.png"
                                            alt="Rebuilding Trust Modules"
                                            className="w-full max-w-xs md:max-w-xs lg:max-w-xs rounded-50 h-auto md:max-h-64 lg:max-h-64 object-cover"
                                        />
                                    </div>
                                    {/* Content Section */}
                                    <div className="w-full flex flex-col items-center justify-center">
                                        <h3 className="text-md md:text-lg font-semibold text-center mb-2">Rebuilding Trust Modules</h3>
                                        <button className="bg-white opacity-70 text-black py-2 px-4 rounded-full text-sm font-medium hover:bg-gray-200">
                                            Discover More 
                                        </button>
                                    </div>
                                </div>
                            </Reveal>

                        </div>
                    </div>
                </div>
            </div>




        </div>
        </Container>
    );
};

export default CreatorSearch;
