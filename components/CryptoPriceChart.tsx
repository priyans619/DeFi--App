"use client";

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

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

        const prices = response.data.prices;

        setChartData({
          labels: prices.map((price: any) =>
            new Date(price[0]).toLocaleDateString()
          ),
          datasets: [
            {
              label: 'Bitcoin Price (USD)',
              data: prices.map((price: any) => price[1]),
              borderColor: '#4b6cb7',
              backgroundColor: 'rgba(75, 108, 183, 0.2)',
              pointBackgroundColor: '#4b6cb7',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: '#4b6cb7',
            },
          ],
        });
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
