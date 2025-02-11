import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

const Home = () => {
    return (
        <>
            <Head>
                <title>Sophia AI - AI-driven Video Coaching & Insights</title>
                <meta name="description" content="Sophia AI offers personalized video coaching powered by artificial intelligence, helping you achieve leadership, learning, and personal growth." />
                <meta name="keywords" content="AI coaching, video coaching, leadership, personal growth, learning, Sophia AI" />
                <meta name="author" content="Sophia AI Team" />
                {/* Favicon */}
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Link href='/home'>
            <div
                className="h-screen w-screen bg-cover bg-center"
                style={{ backgroundImage: "url('/notif.png')" }} // Replace with your actual image path
                href={'/home'}
            >
                
            </div>
            </Link>
        </>
    );
};

export default Home;
