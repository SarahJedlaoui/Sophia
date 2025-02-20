import React from 'react';

const InsightsPanel = ({ selectedVideo, filterType, setFilterType }) => {
    return (
        <div className="w-full lg:w-1/3 bg-[#3E3C3C] p-5 rounded-lg">
            <h3 className="text-white text-lg font-bold mb-4">Here's what I gathered from this video</h3>

            {/* Filter Buttons */}
            <div className="flex gap-2 mb-4">
                <button onClick={() => setFilterType('all')} className={`px-3 py-1 rounded-full text-sm ${filterType === 'all' ? 'bg-blue-500' : 'bg-gray-700'}`}>All</button>
                <button onClick={() => setFilterType('coaching')} className={`px-3 py-1 rounded-full text-sm ${filterType === 'coaching' ? 'bg-blue-500' : 'bg-gray-700'}`}>Coaching</button>
                <button onClick={() => setFilterType('insights')} className={`px-3 py-1 rounded-full text-sm ${filterType === 'insights' ? 'bg-blue-500' : 'bg-gray-700'}`}>Insights</button>
            </div>

            {/* Coaching Cards */}
            {filterType !== 'insights' && selectedVideo.coaching.map((item, index) => (
                <div key={index} className="flex items-center bg-gray-800 p-3 rounded-lg mb-2">
                    <img src={selectedVideo.thumbnail} alt="coach" className="w-10 h-10 rounded-full" />
                    <div className="ml-3">
                        <p className="text-white text-sm">{item.title}</p>
                        <a href={item.link} className="text-blue-300 text-sm">{item.label} →</a>
                    </div>
                </div>
            ))}

            {/* Insights */}
            {filterType !== 'coaching' && selectedVideo.insights.map((insight, index) => (
                <div key={index} className="bg-gray-800 p-3 rounded-lg mt-2">
                    <h4 className="text-white font-bold">{insight.title}</h4>
                    <p className="text-gray-400 text-sm">{insight.description}</p>
                </div>
            ))}
        </div>
    );
};

export default InsightsPanel;
