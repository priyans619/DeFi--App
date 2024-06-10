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

  const performSwap = async () => {
    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask!');
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();

      const response = await axios.get(`https://api.0x.org/swap/v1/quote`, {
        params: {
          sellToken: fromToken,
          buyToken: toToken,
          sellAmount: ethers.utils.parseUnits(amount, 18).toString(),
        },
      });

      const txParams = {
        to: response.data.to,
        data: response.data.data,
        value: response.data.value,
        gasPrice: response.data.gasPrice,
        gas: response.data.gas,
      };

      const tx = await signer.sendTransaction(txParams);
      await tx.wait();
      alert('Swap Successful!');
    } catch (error) {
      console.error('Error performing swap:', error);
      alert('Error performing swap. Please try again.');
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Token Swap</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">From Token</label>
        <input
          type="text"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
          value={fromToken}
          onChange={(e) => setFromToken(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">To Token</label>
        <input
          type="text"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
          value={toToken}
          onChange={(e) => setToToken(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <button
          className="px-4 py-2 bg-violet-800 text-white rounded"
          onClick={getQuote}
        >
          Get Quote
        </button>
      </div>
      {quote && (
        <div className="mb-4">
          <p>Price: {quote.price}</p>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={performSwap}
          >
            Swap
          </button>
        </div>
      )}
    </div>
  );
};

export default TokenSwap;
