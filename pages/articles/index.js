import Head from 'next/head';
import {
    Footer,
    Navbar2,
    ArticlesPage
} from '@/components';
import React from 'react';

const Home = () => {
    return (
        <>
            <Head>
                <title>Sophia AI - Articles</title>
                <meta name="description" content="Sophia AI offers personalized video coaching powered by artificial intelligence, helping you achieve leadership, learning, and personal growth." />
                <meta name="keywords" content="AI coaching, video coaching, leadership, personal growth, learning, Sophia AI" />
                <meta name="author" content="Sophia AI Team" />
                {/* Favicon */}
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className='h-full main_bg text-white overflow-hidden' id='top'>
                <Navbar2 />
                <ArticlesPage />
               
            </div>
        </>
    );
};

export default Home;
