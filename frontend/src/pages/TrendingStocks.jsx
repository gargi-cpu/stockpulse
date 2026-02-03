import React, { useState, useEffect } from 'react';
import { alpacaAPI } from '../services/alpaca';
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

  const SYMBOLS = ['AAPL', 'MSFT', 'TSLA', 'NVDA', 'GOOGL', 'AMZN', 'META', 'JPM'];

  const fetchTrendingStocks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await Promise.all(
        SYMBOLS.map(async (sym) => {
          const bars = await alpacaAPI.getBars(sym);
          const last = bars?.[bars.length - 1];
          const prev = bars?.[bars.length - 2];
          if (!last || !prev) {
            return { id: sym, symbol: sym, name: sym, price: null, change: 0 };
          }
          const changePct = ((last.c - prev.c) / prev.c) * 100;
          return { id: sym, symbol: sym, name: sym, price: last.c, change: changePct };
        })
      );
      data.sort((a, b) => Math.abs(b.change) - Math.abs(a.change));
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
