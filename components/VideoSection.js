import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import InsightsPanel from './InsightsPanel';
import VideoCarousel from './VideoCarousel';
import { videoList } from './videoData';
import { Container } from '.';
import ChatComponent from './ChatComponent';

const VideoSection = () => {
    const [selectedVideo, setSelectedVideo] = useState(videoList[0]);
    const [showVideo, setShowVideo] = useState(false);
    const [filterType, setFilterType] = useState('all'); 
    return (
        <Container>
            <div className="bg-[#2D2B2B] rounded-3xl text-white p-10  mb-10">
                <h1 className="text-3xl font-bold mb-5">Explore 50+ Curated Videos with AI Insights</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Video Player */}
                    <VideoPlayer selectedVideo={selectedVideo} showVideo={showVideo} setShowVideo={setShowVideo} />

                    {/* Chat Section */}
                    <ChatComponent selectedVideo={selectedVideo}/>

                    {/* Insights Panel with Filters */}
                    <InsightsPanel selectedVideo={selectedVideo} filterType={filterType} setFilterType={setFilterType} />
                </div>

                {/* Explore More Section */}
                <h2 className="text-xl font-bold mt-8">Explore More</h2>
                <VideoCarousel videos={videoList} onSelectVideo={(video) => { setSelectedVideo(video); setShowVideo(false); }} />
            </div>
        </Container>
    );
};

export default VideoSection;
