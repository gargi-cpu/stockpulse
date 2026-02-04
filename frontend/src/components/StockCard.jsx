import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import './StockCard.css';

const StockCard = ({ stock }) => {
  const priceChange = Number.isFinite(stock?.change) ? stock.change : 0;
  const isPositive = priceChange >= 0;

  const priceText = Number.isFinite(stock?.price) ? `$${stock.price.toFixed(2)}` : 'N/A';
  const sectorText = stock?.sector || 'General';

  return (
    <Link to={`/stock/${stock.id}`} className="stock-card-link">
      <Card className="stock-card">
        <div className="stock-top">
          <div>
            <div className="stock-symbol">{stock.symbol}</div>
            <div className="stock-name">{stock.name}</div>
          </div>
          <span className={`tag ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? '+' : '-'}
            {Math.abs(priceChange).toFixed(2)}%
          </span>
        </div>

        <div className="stock-bottom">
          <div>
            <div className="stock-price">{priceText}</div>
            <div className="stock-subtitle muted">Last traded</div>
          </div>
          <span className="tag">{sectorText}</span>
        </div>
      </Card>
    </Link>
  );
};

export default StockCard;
