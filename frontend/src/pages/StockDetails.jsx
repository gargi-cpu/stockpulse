import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { stockAPI } from '../services/api';
import Loading from '../components/Loading';
import './StockDetails.css';

const StockDetails = () => {
  const { id } = useParams();
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStockDetails();
  }, [id]);

  const fetchStockDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await stockAPI.getStockById(id);
      setStock(data);
    } catch (err) {
      setError('Failed to fetch stock details. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Loading stock details..." />;
  }

  if (error || !stock) {
    return (
      <div className="stock-details-page">
        <div className="error-container">
          <h2>Stock Not Found</h2>
          <p>{error || 'The requested stock could not be found.'}</p>
          <Link to="/stocks" className="back-button">
            ← Back to Stocks
          </Link>
        </div>
      </div>
    );
  }

  const priceChange = stock.change || 0;
  const isPositive = priceChange >= 0;

  return (
    <div className="stock-details-page">
      <Link to="/stocks" className="back-button">
        ← Back to Stocks
      </Link>

      <div className="stock-details-container">
        <div className="stock-header-section">
          <div className="stock-title">
            <h1>{stock.symbol}</h1>
            <p className="company-name">{stock.name}</p>
          </div>
          <div className={`price-change-badge ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? '▲' : '▼'} {Math.abs(priceChange).toFixed(2)}%
          </div>
        </div>

        <div className="price-section">
          <div className="current-price">
            ${stock.price ? stock.price.toFixed(2) : 'N/A'}
          </div>
          <div className="price-label">Current Price</div>
        </div>

        <div className="details-grid">
          <div className="detail-card">
            <div className="detail-icon">📊</div>
            <div className="detail-content">
              <div className="detail-label">Volume</div>
              <div className="detail-value">
                {stock.volume ? stock.volume.toLocaleString() : 'N/A'}
              </div>
            </div>
          </div>

          <div className="detail-card">
            <div className="detail-icon">💰</div>
            <div className="detail-content">
              <div className="detail-label">Market Cap</div>
              <div className="detail-value">
                {stock.marketCap ? `$${(stock.marketCap / 1e9).toFixed(2)}B` : 'N/A'}
              </div>
            </div>
          </div>

          <div className="detail-card">
            <div className="detail-icon">📈</div>
            <div className="detail-content">
              <div className="detail-label">52 Week High</div>
              <div className="detail-value">
                {stock.high52Week ? `$${stock.high52Week.toFixed(2)}` : 'N/A'}
              </div>
            </div>
          </div>

          <div className="detail-card">
            <div className="detail-icon">📉</div>
            <div className="detail-content">
              <div className="detail-label">52 Week Low</div>
              <div className="detail-value">
                {stock.low52Week ? `$${stock.low52Week.toFixed(2)}` : 'N/A'}
              </div>
            </div>
          </div>

          <div className="detail-card">
            <div className="detail-icon">💵</div>
            <div className="detail-content">
              <div className="detail-label">Open Price</div>
              <div className="detail-value">
                {stock.openPrice ? `$${stock.openPrice.toFixed(2)}` : 'N/A'}
              </div>
            </div>
          </div>

          <div className="detail-card">
            <div className="detail-icon">🔒</div>
            <div className="detail-content">
              <div className="detail-label">Previous Close</div>
              <div className="detail-value">
                {stock.previousClose ? `$${stock.previousClose.toFixed(2)}` : 'N/A'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetails;
