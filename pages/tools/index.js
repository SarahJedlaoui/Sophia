import Head from 'next/head';
import {
    ToolsPage,
    Navbar2,
    
} from '@/components';
import React from 'react';

const Home = () => {
    return (
        <>
            
            <div className='h-full main_bg text-white overflow-hidden' id='top'>
                <Navbar2 />
                <ToolsPage />
             
            </div>
        </>
    );
};

export default Home;
