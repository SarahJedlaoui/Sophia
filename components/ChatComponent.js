import React, { useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ChatComponent = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            setChatHistory([...chatHistory, { text: message, user: true }]);
            setMessage('');
        }
    };

    return (
        <div className="w-full lg:w-1/4 bg-[#3E3C3C] p-5 rounded-lg flex flex-col justify-between">
            <h3 className="text-white text-lg font-bold">Hi there 👋</h3>
            <div className="flex flex-col space-y-2 mt-4">
                {chatHistory.map((chat, index) => (
                    <div key={index} className={`p-2 rounded-lg ${chat.user ? 'bg-purple-500 text-white self-end' : 'bg-gray-800 text-white self-start'}`}>
                        {chat.text}
                    </div>
                ))}
            </div>
            <div className="flex mt-4 w-full gap-2">
                {/* Text Input */}
                <input
                    type="text"
                    placeholder={`Ask me anything`}
                    className="flex-1 p-3 rounded-full bg-transparent text-white border placeholder-gray-400 focus:outline-none"
                    style={{ fontSize: "14.29px" }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter'}
                />

                {/* Send Button */}
                <button onClick={handleSendMessage}
                    className="bg-white p-3 rounded-full flex-shrink-0" style={{ minWidth: "48px", minHeight: "48px" }}>
                    <ArrowForwardIcon style={{ fontSize: "24px", color: "black" }} />
                </button>
            </div>
           
        </div>
    );
};

export default ChatComponent;
