import React from 'react';
import { Link } from 'react-router-dom';
import './StockCard.css';

const StockCard = ({ stock }) => {
  const priceChange = stock.change || 0;
  const isPositive = priceChange >= 0;

  return (
    <Link to={`/stock/${stock.id}`} className="stock-card">
      <div className="stock-header">
        <div className="stock-symbol">{stock.symbol}</div>
        <div className={`stock-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? '▲' : '▼'} {Math.abs(priceChange).toFixed(2)}%
        </div>
      </div>
      
      <div className="stock-name">{stock.name}</div>
      
      <div className="stock-price">
        ${stock.price ? stock.price.toFixed(2) : 'N/A'}
      </div>
      
      <div className="stock-details">
        <div className="stock-detail">
          <span className="detail-label">Volume:</span>
          <span className="detail-value">
            {stock.volume ? stock.volume.toLocaleString() : 'N/A'}
          </span>
        </div>
        <div className="stock-detail">
          <span className="detail-label">Market Cap:</span>
          <span className="detail-value">
            {stock.marketCap ? `$${(stock.marketCap / 1e9).toFixed(2)}B` : 'N/A'}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default StockCard;
