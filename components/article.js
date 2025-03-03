"use client";
import React, { useState, useEffect } from "react";
import { Button, Container } from ".";
import { useRouter } from "next/router";
const ArticlePage = () => {
    const router = useRouter();
    // State to store the article
    const { title } = router.query;
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sections, setSections] = useState([]);
    const [inputData, setInputData] = useState([]);
    const [loadingStates, setLoadingStates] = useState([]);
    const [showOriginal, setShowOriginal] = useState(Array(sections.length).fill(false));    // Fetch the article from MongoDB
    useEffect(() => {
        if (!title) return;
        const fetchArticle = async () => {
            try {
                const response = await fetch(
                    `https://sophiaai-9a965fb6e429.herokuapp.com/api/articles/${decodeURIComponent(title)}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch article");
                }

                const data = await response.json();
                setArticle(data);
                setSections(data.sections); // Set sections from the fetched article
                setInputData(data.sections.map(() => ({ text: "", contributor: "" })));
                setLoadingStates(data.sections.map(() => false));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, []);

    // Ensure we don't access properties on null
    if (loading) return <p className="text-center text-gray-400">Loading article...</p>;
    if (error)  
    
    return (
        <Container>
            <div className="min-h-screen text-white p-6 w-full mx-auto">
              
                <div className="flex justify-between items-center pb-4">
                    <h1 className="text-2xl font-bold">Article not published yet!</h1>
                    
                </div>

               
            </div>
        </Container>
    );
    if (!article) return <p className="text-center text-gray-400">Article not found.</p>;

    // Handle user input change
    const handleInputChange = (index, field, value) => {
        const newInputData = [...inputData];
        newInputData[index][field] = value;
        setInputData(newInputData);
    };

    // Handle contribution submission
    const handleSubmit = async (index) => {
        const newContent = inputData[index].text.trim();
        const contributorName = inputData[index].contributor.trim() || "Anonymous";
    
        if (!newContent) return;
    
        // Set loading state for the specific section
        setLoadingStates((prev) => {
            const newLoading = [...prev];
            newLoading[index] = true;
            return newLoading;
        });
    
        try {
            const response = await fetch("https://sophiaai-9a965fb6e429.herokuapp.com/api/add-contribution", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    articleTitle: article.title,
                    articleId: article._id, // Use MongoDB _id
                    sectionTitle: sections[index].sectionTitle,
                    originalContent: sections[index].originalContent,
                    newContribution: newContent,
                    contributor: contributorName,
                }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setSections((prevSections) => {
                    const updatedSections = [...prevSections];
                    
                    // Manually push the new contribution before updating state
                    updatedSections[index] = {
                        ...updatedSections[index],
                        originalContent: data.updatedSection, // AI-processed final content
                        modifications: [
                            ...updatedSections[index].modifications,  // Keep existing contributions
                            { addedText: newContent, contributor: contributorName }, // Append new contribution
                        ],
                    };
    
                    return updatedSections;
                });
    
                // Update contributors list immediately
                if (contributorName !== "Anonymous") {
                    setArticle((prevArticle) => ({
                        ...prevArticle,
                        contributors: [...new Set([...prevArticle.contributors, contributorName])], // Avoid duplicates
                    }));
                }
    
                // Reset input fields immediately
                setInputData((prevInputData) => {
                    const newData = [...prevInputData];
                    newData[index] = { text: "", contributor: "" };
                    return newData;
                });
            }
        } catch (error) {
            console.error("Error submitting contribution:", error);
        }
    
        // Reset loading state
        setLoadingStates((prev) => {
            const newLoading = [...prev];
            newLoading[index] = false;
            return newLoading;
        });
    };
    

    return (
        <Container>
            <div className="min-h-screen text-white p-6 w-full mx-auto">
                {/* Title & Author Section */}
                <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                    <h1 className="text-3xl font-bold">{article.title}</h1>
                    <div className="flex items-center space-x-3">
                        <img src={article.author.image} alt="Author" className="w-10 h-10 rounded-full object-cover" />
                        <div>
                            <p className="text-sm text-gray-300">Author: {article.author.name}</p>
                            <p className="text-sm text-gray-500">Contributors: {article.contributors.join(", ")}</p>
                        </div>
                    </div>
                </div>

                {/* Sections */}
                <div className=" bg-white bg-opacity-20 rounded-xl shadow-lg">
                {sections.map((section, index) => (
                    <div key={index} className="mt-6 p-4   ">
                        <h2 className="text-xl font-semibold mb-2">{section.sectionTitle}</h2>
                        {/* Toggle between original and latest content */}
                        <h2 className="text-lg font-semibold mb-2">Original Section</h2>
                        <p className="text-gray-300">
                            {section.content }
                        </p>
                        <h2 className="text-lg font-semibold mb-2">Summary Community addition</h2>
                        <p className="text-gray-300">
                            { section.originalContent}
                        </p>

                        {/* Button to toggle original content view 
                        <button
                            className="mt-2 text-[#8E72D7] hover:text-[#E9DEFF] underline"
                            onClick={() => {
                                setShowOriginal(prevState => {
                                    const newState = [...prevState];
                                    newState[index] = !newState[index]; // Toggle only the clicked section
                                    return newState;
                                });
                            }}
                        >
                            {showOriginal[index] ? "See Latest Version" : "See Original Content"}
                        </button>
                           */}
                        {/* Display previous contributions */}
                        {section.modifications.length > 0 && (
                            <div className="mt-3 p-3 bg-gray-700 rounded-md">
                                <h3 className="text-sm text-gray-400">Community Contributions:</h3>
                                {section.modifications.map((contrib, i) => (
                                    <p key={i} className="text-gray-200 mt-1">
                                        <span className="font-bold">{contrib.contributor}:</span> {contrib.addedText}
                                    </p>
                                ))}
                            </div>
                        )}

                        {/* Contribution Form */}
                        <div className="mt-4">
                            <textarea
                                className="w-full bg-gray-700 text-white p-2 rounded-lg outline-none"
                                placeholder="Add your contribution..."
                                value={inputData[index].text}
                                onChange={(e) => handleInputChange(index, "text", e.target.value)}
                            />
                            <input
                                type="text"
                                className="w-full bg-gray-700 text-white p-2 mt-2 rounded-lg outline-none"
                                placeholder="Your Name (Optional)"
                                value={inputData[index].contributor}
                                onChange={(e) => handleInputChange(index, "contributor", e.target.value)}
                            />
                            <Button
                                className="mt-2 text-white px-4 py-2 rounded-lg font-semibold"
                                onClick={() => handleSubmit(index)}
                                variant={"primary"}
                                disabled={loadingStates[index]}
                            >
                                {loadingStates[index] ? "Loading..." : "Add Contribution"}
                            </Button>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </Container>
    );
};

export default ArticlePage;
