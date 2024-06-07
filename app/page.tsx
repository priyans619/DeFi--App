import React from 'react';
import Metamask from '@/components/Metamask';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl mb-6">DeFi App</h1>
      <Metamask />
    </div>
  );
};

export default Home;
