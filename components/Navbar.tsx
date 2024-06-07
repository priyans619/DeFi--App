import React from 'react';
import Metamask from '@/components/Metamask';

const Navbar: React.FC = () => {
  return (
    <nav className="py-4 bg-gray-800 flex justify-between items-center px-8">
      <h1 className="text-4xl text-white">DeFi App</h1>
      <Metamask />
    </nav>
  );
};

export default Navbar;
