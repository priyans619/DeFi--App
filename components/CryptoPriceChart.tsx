"use client";

import React, { useEffect, useState } from 'react';

import axios from 'axios';


const CryptoPriceChart: React.FC = () => {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });
  const [timeframe, setTimeframe] = useState('30');

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart',
          {
            params: {
              vs_currency: 'usd',
              days: timeframe,
            },
          }
        );

      } catch (error) {
        console.error('Error fetching price data', error);
      }
    };

    fetchPriceData();
  }, [timeframe]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      
    </div>
  );
};

export default CryptoPriceChart;
