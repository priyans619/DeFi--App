import React from 'react';
import Navbar from '@/components/Navbar';
import CryptoPriceChart from '@/components/CryptoPriceChart';

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="flex h-screen  flex-col items-center justify-center min-h-screen py-2">
        <CryptoPriceChart />
      </div>
    </div>
  );
};

export default Home;
