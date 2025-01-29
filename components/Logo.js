import React from 'react';
import Image from 'next/image';

const Logo = () => {
  return (
    <div className='font-bold flex items-center text-2xl'>
      {/* Replace "Psycho" with an image */}
      <Image src="/logo.svg" alt="PsychoArt Logo" width={150} height={50} />
    </div>
  );
};

export default Logo;
