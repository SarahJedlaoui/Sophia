import React, { useState, useEffect, useRef } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ChatComponent = ({ selectedVideo }) => {
    const [message, setMessage] = useState("");
    const [chatHistories, setChatHistories] = useState({});
    const [selectedChat, setSelectedChat] = useState("Sophia"); // Default chat is Sophia
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef(null);

    // Define chat options dynamically
    const chatOptions = [
        { name: "Sophia", image: "/favicon.svg" },
        { name: selectedVideo?.name || "Expert", image: selectedVideo?.thumbnail || "/default-thumbnail.png" }
    ];

    // Get current chat history based on selected assistant
    const currentChatHistory = chatHistories[selectedChat] || [];

    // Handle sending messages
    const handleSendMessage = async () => {
        if (!message.trim()) return;

        const newChatHistory = [...currentChatHistory, { text: message, user: true }];

        // Update the state with the chat history for the selected assistant
        setChatHistories((prev) => ({
            ...prev,
            [selectedChat]: newChatHistory
        }));

        setMessage("");
        setIsLoading(true);

        try {
            const response = await fetch("https://sophiaai-9a965fb6e429.herokuapp.com/api/ask-ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ conversation: newChatHistory, assistant: selectedChat }),
            });

            if (!response.ok) throw new Error("Failed to fetch AI response");

            const data = await response.json();
            
            // Append AI response to the correct assistant's chat history
            setChatHistories((prev) => ({
                ...prev,
                [selectedChat]: [...prev[selectedChat], { text: data.answer, user: false }]
            }));

        } catch (error) {
            console.error("Error fetching AI response:", error);
            setChatHistories((prev) => ({
                ...prev,
                [selectedChat]: [...prev[selectedChat], { text: "There was an error processing your question. Please try again.", user: false }]
            }));
        } finally {
            setIsLoading(false);
        }
    };

    // Auto-scroll to latest message
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistories[selectedChat]]);

    return (
        <div className="w-full lg:w-1/4 bg-[#3E3C3C] p-5 rounded-lg flex flex-col">
            <h3 className="text-white text-lg font-bold">Hi there 👋</h3>

            {/* Chat History */}
            <div ref={chatContainerRef} className="flex flex-col space-y-2 mt-2 overflow-auto max-h-48 custom-scrollbar">
                {currentChatHistory.map((chat, index) => (
                    <div key={index} className={`p-2 rounded-lg ${chat.user ? "bg-purple-500 text-white self-end" : "bg-gray-800 text-white self-start"}`}>
                        {chat.text}
                    </div>
                ))}
                {isLoading && <p className="text-gray-400">Thinking...</p>}
            </div>

            {/* Chat Options (Switching between Sophia and Expert) */}
            <div className="flex space-x-0 mt-auto mb-1">
                {chatOptions.map((option, index) => (
                    <button
                        key={index}
                        className={`w-10 h-10 rounded-full overflow-hidden border-2 ${selectedChat === option.name ? "border-white" : "border-transparent"}`}
                        onClick={() => setSelectedChat(option.name)} // Set selected assistant
                    >
                        <img src={option.image} alt={option.name} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>

            {/* Chat Input */}
            <div className="flex items-center w-full gap-2">
                <input
                    type="text"
                    placeholder={`Ask ${selectedChat} anything`}
                    className="flex-1 p-3 rounded-full bg-transparent text-white border placeholder-gray-400 focus:outline-none"
                    style={{ fontSize: "14.29px" }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-white p-3 rounded-full flex-shrink-0"
                    style={{ minWidth: "48px", minHeight: "48px" }}
                >
                    <ArrowForwardIcon style={{ fontSize: "24px", color: "black" }} />
                </button>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 5px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: rgba(255, 255, 255, 0.3);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
            `}</style>
        </div>
    );
};

export default ChatComponent;
