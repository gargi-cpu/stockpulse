import React, { useState, useEffect } from 'react';
import { stockAPI } from '../services/api';
import StockCard from '../components/StockCard';
import Loading from '../components/Loading';
import './TrendingStocks.css';

const TrendingStocks = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrendingStocks();
  }, []);

  const fetchTrendingStocks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await stockAPI.getTrendingStocks();
      setStocks(data);
    } catch (err) {
      setError('Failed to fetch trending stocks. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Loading trending stocks..." />;
  }

  return (
    <div className="trending-page">
      <div className="page-header trending-header">
        <h1>🔥 Trending Stocks</h1>
        <p>The hottest stocks in the market right now</p>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={fetchTrendingStocks} className="retry-btn">
            Retry
          </button>
        </div>
      )}

      <div className="trending-grid">
        {stocks.length > 0 ? (
          stocks.map((stock, index) => (
            <div key={stock.id} className="trending-item">
              <div className="trending-rank">#{index + 1}</div>
              <StockCard stock={stock} />
            </div>
          ))
        ) : (
          <div className="no-stocks">
            <p>No trending stocks available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingStocks;
