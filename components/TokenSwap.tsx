"use client"
import React, { useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';

const TokenSwap: React.FC = () => {
  const [fromToken, setFromToken] = useState('');
  const [toToken, setToToken] = useState('');
  const [amount, setAmount] = useState('');
  const [quote, setQuote] = useState<any | null>(null);

  const getQuote = async () => {
    try {
      const response = await axios.get(`https://api.0x.org/swap/v1/quote`, {
        params: {
          sellToken: fromToken,
          buyToken: toToken,
          sellAmount: ethers.utils.parseUnits(amount, 18).toString(),
        },
      });
      setQuote(response.data);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Token Swap</h2>
      
    </div>
  );
};

export default TokenSwap;
