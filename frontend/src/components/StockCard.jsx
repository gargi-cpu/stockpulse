import React from 'react';
import { Link } from 'react-router-dom';
import './StockCard.css';

const StockCard = ({ stock }) => {
  const priceChange = Number.isFinite(stock?.change) ? stock.change : 0;
  const isPositive = priceChange >= 0;

  const priceText = Number.isFinite(stock?.price) ? `$${stock.price.toFixed(2)}` : 'N/A';
  const volumeText = Number.isFinite(stock?.volume) ? stock.volume.toLocaleString() : 'N/A';
  const marketCapText = Number.isFinite(stock?.marketCap)
    ? `$${(stock.marketCap / 1e9).toFixed(2)}B`
    : 'N/A';

  return (
    <Link to={`/stock/${stock.id}`} className="stock-card">
      <div className="stock-header">
        <div className="stock-symbol">{stock.symbol}</div>
        <div className={`stock-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? 'â–²' : 'â–¼'} {Math.abs(priceChange).toFixed(2)}%
        </div>
      </div>

      <div className="stock-name">{stock.name}</div>

      <div className="stock-price">{priceText}</div>

      <div className="stock-details">
        <div className="stock-detail">
          <span className="detail-label">Volume:</span>
          <span className="detail-value">{volumeText}</span>
        </div>
        <div className="stock-detail">
          <span className="detail-label">Market Cap:</span>
          <span className="detail-value">{marketCapText}</span>
        </div>
      </div>
    </Link>
  );
};

export default StockCard;
