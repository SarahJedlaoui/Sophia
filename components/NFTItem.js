import React from 'react';
import { Button } from '.';
import Image from 'next/image';

const NFTItem = ({ data }) => {
  const { image, username, theme, name } = data;
  return (
    <div className='hover:bg-[#ffffff66] transition duration-300 ease-in-out bg-[#ffffff1a] p-5 rounded-lg shadow-lg'>
      <div className='rounded-lg overflow-hidden mb-3 relative w-full h-[400px] sm:h-[300px] lg:h-[400px]'>
        <Image
          layout='fill'
          objectFit='cover'
          objectPosition={'center'}
          src={image}
          alt={username}
        />

      </div>
      <h1>{name}</h1>
      <p className=" opacity-70  font-normal text-md mb-2 text-blwhiteack" >{theme}</p>

    </div>
  );
};

export default NFTItem;
