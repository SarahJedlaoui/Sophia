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
    const [categories] = useState(["Health", "Productivity", "Mindfulness", "Relationships", "Fitness", "Comedy", "Love", "Food"]);
    const [showCustomCategory, setShowCustomCategory] = useState(false);
    const predefinedCategories = ["All", "Comedy", "Health", "Religion", "Acting", "Love", "Relationships", "Food", "Diet"];
    const [selectedCategory, setSelectedCategory] = useState("All");

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
        category: "",
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
                    category: newArticle.category,
                    image: newArticle.image,
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

    const removeSection = (index) => {
        setNewArticle((prevArticle) => ({
            ...prevArticle,
            sections: prevArticle.sections.filter((_, i) => i !== index), // Remove the section at the given index
        }));
    };

    // Function to handle image upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewArticle({ ...newArticle, image: reader.result }); // Store Base64 string
            };
            reader.readAsDataURL(file);
        }
    };

    // First, apply the search filter
    const searchFilteredArticles = [...articles, ...predefinedArticles].filter(
        (article) =>
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (article.author?.name && article.author.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Then, apply the category filter on the already filtered list
    const filteredArticles = selectedCategory === "All"
        ? searchFilteredArticles
        : searchFilteredArticles.filter(article => article.category === selectedCategory);

    return (
        <Container>
            <div className="min-h-screen text-white p-6">
                <div className="flex justify-between items-center mb-6">
                    <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                        <h1 className="text-3xl font-bold" style={{ fontFamily: "Playfair" }}>
                           Articles
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

                {/* Category Filters */}
                <div className="flex space-x-3 mb-6 overflow-x-auto">
                    {predefinedCategories.map((category, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${selectedCategory === category ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-300"
                                }`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {loadingArticles ? (
                    <p className="text-center text-gray-400">Loading articles...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredArticles.length > 0 ? (
                            filteredArticles.map((article) => {
                                const formattedTitle = encodeURIComponent(article.title.replace(/\s+/g, "-").toLowerCase());

                                return (
                                    <Link key={article._id || article.id} href={`/article/${formattedTitle}`} passHref>
                                        <div className="bg-gray-900 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer">

                                            {/* Article Image */}
                                            <div className="relative w-full h-48">
                                                <img
                                                    src={article.image ? article.image : "/cover.png"} // Default image
                                                    alt={article.title}
                                                    className="w-full h-full object-cover rounded-xl"
                                                />
                                                {/* Category Badge */}
                                                {article.category && (
                                                    <span className="absolute top-3 left-3 bg-purple-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                                        {article.category}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Article Content */}
                                            <div className="mt-4">
                                                <h2 className="text-lg font-semibold text-white">{article.title}</h2>
                                                <p className="text-gray-400 text-sm mt-1">
                                                    {article.sections?.[0]?.content.split(".")[0] || article.description}
                                                </p>
                                            </div>

                                            {/* Author & Timestamp */}
                                            <div className="flex items-center mt-4">
                                                <img
                                                    src={article.author?.image || "/cover.png"} // Default avatar
                                                    alt="Author"
                                                    className="w-8 h-8 rounded-full object-cover mr-2"
                                                />
                                                <div>
                                                    <p className="text-sm text-white">{article.author?.name || "Unknown"}</p>
                                                    <p className="text-xs text-gray-400">
                                                        {new Date(article.timestamp).toLocaleDateString("en-US", {
                                                            month: "long",
                                                            day: "numeric",
                                                            year: "numeric",
                                                        })}
                                                    </p>
                                                </div>
                                            </div>

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
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto">
                        <div className="bg-black bg-opacity-80 p-6 rounded-lg shadow-lg w-3/8 max-h-[90vh] overflow-y-auto">
                            <h2 className="text-lg font-semibold mb-4">Add New Article</h2>

                            {/* Article Title & Author */}
                            <input
                                type="text"
                                name="title"
                                placeholder="Article Title"
                                value={newArticle.title}
                                onChange={handleInputChange}
                                className="w-full p-2 border text-black rounded-xl mb-2"
                            />
                            <input
                                type="text"
                                name="author"
                                placeholder="Author Name"
                                value={newArticle.author}
                                onChange={handleInputChange}
                                className="w-full p-2 border text-black rounded-xl mb-2"
                            />
                            {/* Image Upload */}
                            <h3 className="font-semibold mb-2">Upload Image</h3>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="w-full p-2 border text-black rounded-xl mb-2"
                            />

                            {/* Preview Image */}
                            {newArticle.image && (
                                <img src={newArticle.image} alt="Preview" className="w-48 h-48 object-cover rounded-lg mb-2" />
                            )}

                            {/* Category Dropdown & Custom Input */}
                            <h3 className="font-semibold mb-2">Category</h3>
                            <select
                                className="w-full p-2 border text-black rounded-xl mb-2"
                                value={newArticle.category}
                                onChange={(e) => {
                                    const selectedCategory = e.target.value;
                                    if (selectedCategory === "custom") {
                                        setShowCustomCategory(true);
                                        setNewArticle({ ...newArticle, category: "" });
                                    } else {
                                        setShowCustomCategory(false);
                                        setNewArticle({ ...newArticle, category: selectedCategory });
                                    }
                                }}
                            >
                                <option value="">Select a Category</option>
                                {categories.map((cat, index) => (
                                    <option key={index} value={cat}>{cat}</option>
                                ))}
                                <option value="custom">+ Add Custom Category</option>
                            </select>

                            {showCustomCategory && (
                                <input
                                    type="text"
                                    placeholder="Enter custom category"
                                    className="w-full p-2 border text-black rounded-xl mb-2"
                                    value={newArticle.category}
                                    onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
                                />
                            )}

                            {/* Sections */}
                            <h3 className="font-semibold mb-2">Sections</h3>
                            <div className="max-h-[50vh] overflow-y-auto ">
                                {newArticle.sections.map((section, index) => (
                                    <div key={index} className="mb-2 p-2 bg-gray-800 bg-opacity-50 rounded-md relative">
                                        <input
                                            type="text"
                                            placeholder="Section Title"
                                            value={section.title}
                                            onChange={(e) => handleSectionChange(index, "title", e.target.value)}
                                            className="w-full p-2 border text-black rounded-xl mb-1"
                                        />
                                        <textarea
                                            placeholder="Section Content"
                                            value={section.content}
                                            onChange={(e) => handleSectionChange(index, "content", e.target.value)}
                                            className="w-full p-2 border text-black rounded-xl"
                                        />
                                        {/* Delete Section Button */}
                                        <svg
                                            onClick={() => removeSection(index)}
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="absolute top-2 right-2 w-6 h-6 cursor-pointer text-black hover:text-gray-700 transition"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M6 6L18 18M6 18L18 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                ))}
                            </div>

                            {/* Add Section Button */}
                            <button className="text-[#8E72D7] underline mt-2" onClick={addSection}>+ Add Section</button>

                            {/* Buttons */}
                            <div className="flex justify-between mt-4">
                                <Button className="text-white px-4 py-2 rounded-lg" onClick={() => setShowModal(false)}>Cancel</Button>
                                <Button
                                    className="text-white px-4 py-2 rounded-lg"
                                    variant={"primary"}
                                    onClick={handleSubmit}
                                    disabled={loadingSubmit} // Disable button while loading
                                >
                                    {loadingSubmit ? "Loading..." : "Add"}
                                </Button>

                            </div>
                        </div>
                    </div>
                )}



            </div>
        </Container>
    );
};

export default ArticlesPage;
