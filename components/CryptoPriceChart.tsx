"use client";

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import axios from 'axios';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

type ChartOptionsType = ChartOptions<'line'>;

const CryptoPriceChart: React.FC = () => {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });
  const [timeframe, setTimeframe] = useState('30');

  const options: ChartOptionsType = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        beginAtZero: false,
        ticks: {
          callback: function (value: string | number): string {
            return `$${Number(value).toFixed(2)}`;
          },
        },
      },
    },
    elements: {
      point: {
        radius: 3,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `Price: $${context.raw.toFixed(2)}`;
          },
        },
      },
    },
  };

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
    <div className="flex flex-col items-center bg-gray-100 mb-12 rounded-lg shadow-lg">
      <div className="w-full max-w-6xl mx-auto px-16 bg-white rounded-lg shadow-lg ">
        <h2 className="text-2xl font-bold text-center mb-4 ">Bitcoin Price Chart</h2>
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setTimeframe('1')}
            className={`px-4 py-2 mx-2 rounded ${timeframe === '1' ? 'bg-violet-800 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            1 Day
          </button>
          <button
            onClick={() => setTimeframe('7')}
            className={`px-4 py-2 mx-2 rounded ${timeframe === '7' ? 'bg-violet-800 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            1 Week
          </button>
          <button
            onClick={() => setTimeframe('30')}
            className={`px-4 py-2 mx-2 rounded ${timeframe === '30' ? 'bg-violet-800 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            1 Month
          </button>
        </div>
        <div className="relative h-96 ">
          <Line data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default CryptoPriceChart;
