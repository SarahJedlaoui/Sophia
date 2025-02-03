import {
    Button,
    Collections,
    Footer,
    Navbar,
    YC
   
  } from '@/components';
  import React from 'react';
  import { Reveal } from 'react-awesome-reveal';
  import { fadeInDownShorter } from '@/keyframes';
  const Home = () => {
    return (
      <div className='h-full main_bg text-white overflow-hidden' id='top'>
        <Navbar />
        <YC />
       
        <Footer />
      </div>
    );
  };
  
  export default Home;
  