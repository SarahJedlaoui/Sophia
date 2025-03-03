"use client";
import React, { useState, useEffect } from "react";
import { Reveal } from "react-awesome-reveal";
import { fadeInUp } from "@/keyframes";
import { Button, Container } from ".";
import { useRouter } from "next/router";
import Link from "next/link";

const ArticlesPage = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [articles, setArticles] = useState([]); // Store articles from DB
    const [loadingArticles, setLoadingArticles] = useState(true);

    // Fetch articles from backend
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch("https://sophiaai-9a965fb6e429.herokuapp.com/api/articles");
                if (!response.ok) throw new Error("Failed to fetch articles");
                const data = await response.json();
                setArticles(data);
            } catch (error) {
                console.error("Error fetching articles:", error);
            } finally {
                setLoadingArticles(false);
            }
        };

        fetchArticles();
    }, []);

    // Predefined static articles
    const predefinedArticles = [

        {
            id: 2,
            title: "Building Stronger Relationships",
            author: "Nadia Ben Saad",
            image: "/articles/relationships.svg",
            description: "Learn how to improve communication and emotional connection.",
        },
        {
            id: 3,
            title: "The Power of Mindfulness in Daily Life",
            author: "Ali Jebali",
            image: "/articles/mindfulness.svg",
            description: "Simple mindfulness techniques for a stress-free mind.",
        },
        {
            id: 4,
            title: "Best Exercises for a Healthy Lifestyle",
            author: "Dr. Ahmed Tounsi",
            image: "/articles/fitness.svg",
            description: "The top workouts to keep you fit and energized.",
        },
        {
            id: 5,
            title: "Overcoming Anxiety: A Step-by-Step Guide",
            author: "Hana Ferjani",
            image: "/articles/anxiety.svg",
            description: "Effective ways to manage stress and anxiety naturally.",
        },
        {
            id: 6,
            title: "Mastering Self-Confidence in Social Situations",
            author: "Layla Bouzid",
            image: "/articles/confidence.svg",
            description: "Learn how to build confidence and be more charismatic.",
        },
    ];

    // Modal states
    const [showModal, setShowModal] = useState(false);
    const [newArticle, setNewArticle] = useState({
        title: "",
        author: "",
        image: "",
        description: "",
        sections: [{ title: "", content: "" }],
    });
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewArticle((prev) => ({ ...prev, [name]: value }));
    };

    // Handle section input change
    const handleSectionChange = (index, field, value) => {
        const updatedSections = [...newArticle.sections];
        updatedSections[index][field] = value;
        setNewArticle((prev) => ({ ...prev, sections: updatedSections }));
    };

    // Add new section field
    const addSection = () => {
        setNewArticle((prev) => ({
            ...prev,
            sections: [...prev.sections, { title: "", content: "" }],
        }));
    };

    // Submit new article
    const handleSubmit = async () => {
        setLoadingSubmit(true);

        try {
            const response = await fetch("https://sophiaai-9a965fb6e429.herokuapp.com/api/articles", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: newArticle.title,
                    author: { name: newArticle.author, image: newArticle.image },
                    contributors: [],
                    sections: newArticle.sections,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Article added:", data);

                // Update the articles list dynamically
                setArticles((prev) => [
                    data.article, // Add the new article from response
                    ...prev, // Keep the existing ones
                ]);

                // Show success alert
                alert("Article added successfully!");

                // Reset fields & close modal
                setNewArticle({ title: "", author: "", image: "", description: "", sections: [{ title: "", content: "" }] });
                setShowModal(false);
            } else {
                console.error("Error adding article:", await response.json());
            }
        } catch (error) {
            console.error("Error submitting article:", error);
        } finally {
            setLoadingSubmit(false);
        }
    };

    const filteredArticles = [...articles, ...predefinedArticles].filter(
        (article) =>
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (article.author?.name && article.author.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    

    return (
        <Container>
            <div className="min-h-screen text-white p-6">
                <div className="flex justify-between items-center mb-6">
                    <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                        <h1 className="text-3xl font-bold" style={{ fontFamily: "Playfair" }}>
                            Comedy Articles
                        </h1>
                    </Reveal>

                    {/* Add Article Button */}
                    <Button
                        variant={"primary"}
                        className="text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
                        onClick={() => setShowModal(true)}
                    >
                        Add Article
                    </ Button>
                </div>

                {/* Search Bar */}
                <div className="w-full mx-auto mb-6">
                    <input
                        type="text"
                        placeholder="Search by title or author..."
                        className="w-full p-3 rounded-3xl bg-white bg-opacity-20 text-white outline-none border border-gray-600 focus:border-gray-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Articles List */}
                {loadingArticles ? (
                    <p className="text-center text-gray-400">Loading articles...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredArticles.length > 0 ? (
                            filteredArticles.map((article) => {
                                const formattedTitle = encodeURIComponent(article.title.replace(/\s+/g, "-").toLowerCase()); // Format title for URL

                                return (
                                    <Link key={article._id || article.id} href={`/article/${formattedTitle}`} passHref>
                                        <div
                                            key={article._id || article.id}
                                            className="bg-white bg-opacity-20 p-5 rounded-3xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer flex flex-col items-center text-center"
                                        >
                                            <img
                                                src={article.image ? article.image : "/articles/adhd.svg"}
                                                alt={article.title}
                                                className="w-48 h-48 object-cover rounded-md mb-4"
                                            />
                                            <h2 className="text-xl font-semibold">{article.title}</h2>
                                            <p className="text-gray-400 text-sm mt-1">By {article.author?.name || article.author}</p>
                                            <p className="text-gray-300 mt-2">
                                                {article.sections?.[0]?.content.split(".")[0] || article.description}
                                            </p>
                                        </div>
                                    </Link>
                                );
                            })
                        ) : (
                            <p className="text-center text-gray-400 col-span-3">No articles found.</p>
                        )}

                    </div>
                )}

                {/* Modal for Adding Article */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-black bg-opacity-80 p-6 rounded-lg shadow-lg w-38%">
                            <h2 className="text-lg font-semibold mb-4">Add New Article</h2>

                            <input type="text" name="title" placeholder="Article Title" value={newArticle.title} onChange={handleInputChange} className="w-full p-2 border text-black rounded mb-2" />
                            <input type="text" name="author" placeholder="Author Name" value={newArticle.author} onChange={handleInputChange} className="w-full p-2 border  text-black rounded mb-2" />

                            <h3 className="font-semibold mb-2">Sections</h3>
                            {newArticle.sections.map((section, index) => (
                                <div key={index} className="mb-2">
                                    <input type="text" placeholder="Section Title" value={section.title} onChange={(e) => handleSectionChange(index, "title", e.target.value)} className="w-full p-2 border text-black rounded mb-1" />
                                    <textarea placeholder="Section Content" value={section.content} onChange={(e) => handleSectionChange(index, "content", e.target.value)} className="w-full p-2 border text-black rounded" />
                                </div>
                            ))}
                            <button className="text-[#8E72D7] underline mt-2" onClick={addSection}>+ Add Section</button>

                            <div className="flex justify-between mt-4">
                                <Button className=" text-white px-4 py-2 rounded-lg" onClick={() => setShowModal(false)}>Cancel</Button>
                                <Button className=" text-white px-4 py-2 rounded-lg" variant={"primary"} onClick={handleSubmit}>Add</Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default ArticlesPage;
