import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button, Container, Logo } from '.';

const Navbar = () => {
  return (
    <div className='py-3 text-white'>
      <Container className={'flex justify-between items-center'}>
        {/* Logo (Smaller on Mobile) */}
        <Link href="/" passHref>
          <a className="w-20 md:w-32"> {/* Adjust width based on screen size */}
            <Logo />
          </a>
        </Link>

        
      </Container>
    </div>
  );
};

const NavLinks = () => {
  return (
    <div className="flex items-center space-x-4 md:space-x-7">
      <Link href='/home'>
        <a className="text-xs md:text-base hover:text-gray-300 transition">Home</a>
      </Link>
      <Link href='/chat'>
        <a className="text-xs md:text-base hover:text-gray-300 transition">Chat</a>
      </Link>
      <Link href='/practice'>
        <a className="text-xs md:text-base hover:text-gray-300 transition">Practice</a>
      </Link>
      <Link href='/creators'>
        <a className="text-xs md:text-base hover:text-gray-300 transition">Creators</a>
      </Link>
    </div>
  );
};

export default Navbar;
