import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaPlay, FaExternalLinkAlt } from "react-icons/fa";

const VideoCarousel = ({ videos, onSelectVideo }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 4 } },
            { breakpoint: 768, settings: { slidesToShow: 3 } },
            { breakpoint: 480, settings: { slidesToShow: 2 } }
        ]
    };

    return (
        <Slider {...settings} className="mt-5">
            {videos.map(video => (
                <div 
                    key={video.id} 
                    className="relative cursor-pointer p-2 group"
                    onClick={() => onSelectVideo(video)}
                >
                    {/* Video Thumbnail */}
                    <div className="relative">
                        <div className="absolute rounded-lg inset-0 bg-black opacity-70"></div>
                        <img 
                            src={video.thumbnail} 
                            alt={video.title} 
                            className="rounded-lg w-full h-48 object-cover"
                        />

                        {/* Title Overlay */}
                        <div className="absolute top-2 left-2 right-2 text-white text-xs  w-32">
                            {video.title}
                        </div>

                        {/* Play Icon */}
                        <div className="absolute  top-2 right-2 bg-black/50 p-2 rounded-full border-2 opacity-70">
                            <FaPlay className="text-white w-4 h-4 opacity-70" />
                        </div>
                    </div>

                    {/* Visit Link - Prevents Click Bubbling */}
                    <a 
                        href={video.videoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()} // 🔹 Prevents triggering onClick for the parent
                        className="absolute bottom-4 right-4 text-white text-xs flex items-center gap-1"
                    >
                        Watch on YouTube <FaExternalLinkAlt className="w-2 h-2" />
                    </a>
                </div>
            ))}
        </Slider>
    );
};

export default VideoCarousel;
