import React, { useState } from 'react';
import { Button, Container, NFTItem } from '.';
import { Reveal } from 'react-awesome-reveal';
import { fadeInDownShorter, fadeInUp } from '@/keyframes';
import { fadeInDownShorter2, fadeInLeft } from '@/keyframes';

const Collections = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [listCollection, setListCollection] = useState([
    {
      name: 'Enhancing Focus Through Routine',
      theme: 'Personal Growth',
      image: '/collections/protocol1.png',
    },
    {
      name: 'Mastering Leadership Skills',
      theme: 'Leadership',
      image: '/collections/protocol2.png',
    },
    {
      name: 'Healthy Relationships Tips',
      theme: 'Relationships',
      image: '/collections/protocol3.png',
    },
    {
      name: 'Effective Learning Strategies',
      theme: 'Learning',
      image: '/collections/protocol4.png',
    },
    {
      name: 'Effective Learning Strategies',
      theme: 'Learning',
      image: '/collections/protocol5.png',
    },
    {
      name: 'Effective Learning Strategies',
      theme: 'Learning',
      image: '/collections/protocol6.png',
    },
  ]);

  const [listBtn, setListBtn] = useState([
    { name: 'All', status: true },
    { name: 'Leadership', status: false },
    { name: 'Learning', status: false },
    { name: 'Personal Growth', status: false },
    { name: 'Wellness', status: false },
    { name: 'Relationships', status: false },
  ]);

  const handleClickMenu = (name) => {
    const filterBtn = listBtn.map((item) => {
      return {
        ...item,
        status: item.name === name ? true : false,
      };
    });
    setListBtn(filterBtn);
  };


  const handleFilter = (theme) => {
    const updatedButtons = listBtn.map((btn) => ({
      ...btn,
      status: btn.name === theme,
    }));
    setListBtn(updatedButtons);

    if (theme === 'All') {
      setSearchTerm(''); // Reset search if 'All' is clicked
    } else {
      setSearchTerm(theme);
    }
  };

  const filteredCollection = listCollection.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.theme.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mb-44 scroll-mt-10">
      {/* Search Bar */}
      <div className="relative mb-10">
        <input
          type="text"
          className="w-full bg-gray-800 text-white px-5 py-3 rounded-3xl focus:outline-none"
          placeholder="Find a protocol by name, keyword, or topic"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Purple Card with Stars */}
      <div className="relative rounded-3xl bg-[#7A67C7] p-6 mb-10 flex flex-col lg:flex-row items-center lg:items-start">
        <div className="text-left  md:text-left lg:text-left flex-1">
          <h3 className="opacity-70 font-normal text-md mb-2 text-white">
            NEED MORE INSPIRATION?
          </h3>
          <p className="text-white font-normal mb-6">
            Whether you're looking for guidance, new ideas, or building something
            from scratch, the tools you need are just a click away.
          </p>
          <button className="flex items-center gap-2 mt-4 bg-black text-white px-6 py-3 rounded-full shadow-lg">
            <span>Create New Protocol</span>
            <img
              src="/collections/icon.svg" // Replace with your icon's path
              alt="Arrow"
              className="w-8 h-8"
            />
          </button>
        </div>

        {/* Stars Image */}
        <img
          src="/collections/container.svg" // Replace with your stars image path
          alt="Stars"
          className="absolute top-0 right-0 h-full w-auto hidden md:block lg:block"
        />
      </div>


      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { title: '30+', description: 'Protocols Created', icon: '/collections/btn.svg' },
          { title: '12', description: 'Protocols Completed', icon: '/collections/btn1.svg' },
          { title: '5', description: 'Categories Explored', icon: '/collections/btn2.svg' },
        ].map((stat, i) => (
          <div key={i} className="rounded-2xl bg-white p-4 shadow-lg flex items-center gap-4">
            <img src={stat.icon} alt={stat.description} className="w-10 h-10" />
            <div>
              <h3 className="font-bold text-xl text-[#8E72D7]">{stat.title}</h3>
              <p className="opacity-70 text-black">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>



      {/* Filter Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 mb-5">
        {listBtn.map((item, index) => (
          <Reveal keyframes={fadeInUp} duration={500} delay={index * 100} key={index}>
            <Button
              onClick={() => handleFilter(item.name)}
              variant={item.status ? 'primary' : 'secondary'}
              className="w-full px-4 py-2 text-sm rounded-2xl"
            >
              {item.name}
            </Button>
          </Reveal>
        ))}
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {filteredCollection.map((item, i) => (
          <Reveal
            key={i}
            keyframes={fadeInDownShorter}
            duration={500}
            delay={50 * (i + 1)}
          >
            <NFTItem data={item} />
          </Reveal>
        ))}
      </div>


    </Container>
  );
};

export default Collections;
