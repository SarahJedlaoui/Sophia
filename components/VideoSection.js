import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import InsightsPanel from './InsightsPanel';
import VideoCarousel from './VideoCarousel';
import { videoList } from './videoData';
import { Container } from '.';
import ChatComponent from './ChatComponent';
import { Reveal } from 'react-awesome-reveal';
import { fadeInDownShorter, fadeInLeft, fadeInUp,fadeInRight } from '@/keyframes';

const VideoSection = () => {
    const [selectedVideo, setSelectedVideo] = useState(videoList[0]);
    const [showVideo, setShowVideo] = useState(false);
    const [filterType, setFilterType] = useState('all'); 
    return (
        <Container>
            <div className="bg-[#2D2B2B] rounded-3xl text-white p-10  mb-10">
            <Reveal keyframes={fadeInLeft} duration={800} delay={200}>
                <h1 className="text-3xl font-bold mb-5">Explore 50+ Curated Videos with AI Insights</h1>
                </Reveal>
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Video Player */}
                    <Reveal keyframes={fadeInLeft} duration={800} delay={200}>
                    <VideoPlayer selectedVideo={selectedVideo} showVideo={showVideo} setShowVideo={setShowVideo} />
                    </Reveal>
                    {/* Chat Section */}
                    <Reveal keyframes={fadeInRight} duration={800} delay={200}>
                    <ChatComponent selectedVideo={selectedVideo}/>
                    </Reveal>
                    {/* Insights Panel with Filters */}
                    <Reveal keyframes={fadeInRight} duration={800} delay={200}>
                    <InsightsPanel selectedVideo={selectedVideo} filterType={filterType} setFilterType={setFilterType} />
                    </Reveal>
                </div>

                {/* Explore More Section */}
                <h2 className="text-xl font-bold mt-8">Explore More</h2>
                <Reveal keyframes={fadeInUp} duration={800} delay={200}>
                <VideoCarousel videos={videoList} onSelectVideo={(video) => { setSelectedVideo(video); setShowVideo(false); }} />
                </Reveal>
            </div>
        </Container>
    );
};

export default VideoSection;
