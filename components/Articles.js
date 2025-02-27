import React, { useState } from "react";
import { Reveal } from 'react-awesome-reveal';
import { fadeInUp, fadeInLeft } from '@/keyframes';
import { Container } from '.';
import { useRouter } from "next/router";
import Link from "next/link";
const articlesData = [
    {
      id: 1,
      title: "Understanding ADHD: Tips for Focus & Productivity",
      author: "Dr. Sarah Khalil",
      image: "/articles/adhd.svg",
      description: "Practical strategies to manage ADHD and improve daily life.",
    },
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

const ArticlesPage = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredArticles = articlesData.filter(
        (article) =>
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container >
            <div className="min-h-screen text-white p-6">

                <Reveal keyframes={fadeInUp} duration={800} delay={50}>
                    <h1 className="text-3xl font-bold  mb-6" style={{ fontFamily: 'Playfair' }}>

                        Comedy Articles
                    </h1>
                </Reveal>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.length > 0 ? (
                        filteredArticles.map((article) => (
                            <Link key={article.id} href={`/article`} passHref>
                            <div
                                key={article.id}
                                className="bg-white bg-opacity-20 p-5 rounded-3xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer flex flex-col items-center text-center"
                                >
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-48 h-48 object-cover rounded-md mb-4"
                                />
                                <h2 className="text-xl font-semibold">{article.title}</h2>
                                <p className="text-gray-400 text-sm mt-1">By {article.author}</p>
                                <p className="text-gray-300 mt-2">{article.description}</p>
                            </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-center text-gray-400 col-span-3">No articles found.</p>
                    )}
                </div>
            </div>
        </Container>
    );
};

export default ArticlesPage;
