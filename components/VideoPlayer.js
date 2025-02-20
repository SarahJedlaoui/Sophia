import React from 'react';
import { FaPlay } from "react-icons/fa";

const VideoPlayer = ({ selectedVideo, showVideo, setShowVideo }) => {
    // Ensure the video URL is in the correct embed format
    const getEmbedUrl = (url) => {
        if (!url.includes("youtube.com/embed")) {
            const videoId = url.split("v=")[1]?.split("&")[0]; // Extract video ID from standard YouTube link
            return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        }
        return url; // If it's already in embed format, return it directly
    };

    return (
        <div className="relative w-full lg:w-2/3">
            {!showVideo ? (
                <div className="relative">
                    <div className="absolute rounded-lg inset-0 bg-black opacity-20"></div>

                    {/* Cover Image */}
                    <img
                        src={selectedVideo.thumbnail}
                        alt={selectedVideo.title}
                        className="w-full h-72 lg:h-96 rounded-lg object-cover"
                    />
                    {/* Title Overlay */}
                    <div className="absolute top-4 left-6 right-6 text-white text-lg font-bold md:w-96">
                        {selectedVideo.title}
                    </div>
                    {/* Play Button */}
                    <button
                        onClick={() => setShowVideo(true)}
                       className="absolute top-5 right-5 bg-black/50 p-4 rounded-full  border-2"
                    >
                        <FaPlay className="text-white text-2xl" />
                    </button>
                </div>
            ) : (
                <iframe
                    className="w-full h-72 lg:h-96 rounded-lg"
                    src={getEmbedUrl(selectedVideo.videoUrl)} // Use formatted embed URL
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            )}
        </div>
    );
};

export default VideoPlayer;
