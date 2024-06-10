import React from 'react';
import Navbar from '@/components/Navbar';
import CryptoPriceChart from '@/components/CryptoPriceChart';
import TokenSwap from '@/components/TokenSwap';

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-violet-100">
      <Navbar />
      <div className="pt-16 flex flex-col items-center min-h-screen py-2">
        <div className="flex flex-row w-full justify-center space-x-16">
          <CryptoPriceChart />
          <TokenSwap />
        </div>
      </div>
    </div>
  );
};

export default Home;

