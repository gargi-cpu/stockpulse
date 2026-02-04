import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Card from './Card';
import './PriceChartCard.css';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

const PriceChartCard = ({ prices = [] }) => {
  const data = {
    labels: prices.map((p) => p.date),
    datasets: [
      {
        label: 'Closing Price',
        data: prices.map((p) => p.close),
        borderColor: '#60a5fa',
        backgroundColor: 'rgba(96, 165, 250, 0.2)',
        borderWidth: 2,
        tension: 0.35,
        pointRadius: 0
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { display: false },
      y: {
        ticks: { color: '#9ca3af' },
        grid: { color: 'rgba(148, 163, 184, 0.1)' }
      }
    }
  };

  return (
    <Card className="price-chart-card">
      <div className="price-chart-header">
        <h3>Price Trend (30 Days)</h3>
        <span className="muted">Daily close</span>
      </div>
      <div className="price-chart-canvas">
        <Line data={data} options={options} />
      </div>
    </Card>
  );
};

export default PriceChartCard;
