import React, { useState, useEffect } from 'react';
import { alpacaAPI } from '../services/alpaca';
import StockCard from '../components/StockCard';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';
import './StockList.css';

const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    fetchStocks();
  }, []);

  const SYMBOLS = ['AAPL', 'MSFT', 'TSLA', 'NVDA', 'GOOGL', 'AMZN', 'META', 'JPM'];

  const fetchStocks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await Promise.all(
        SYMBOLS.map(async (sym) => {
          const bars = await alpacaAPI.getBars(sym);
          const last = bars?.[bars.length - 1];
          const prev = bars?.[bars.length - 2];
          if (!last || !prev) {
            return { id: sym, symbol: sym, name: sym, price: null, change: 0, marketCap: null, volume: null };
          }
          const changePct = ((last.c - prev.c) / prev.c) * 100;
          return { id: sym, symbol: sym, name: sym, price: last.c, change: changePct, marketCap: null, volume: last.v };
        })
      );
      setStocks(data);
      setFilteredStocks(data);
    } catch (err) {
      setError('Failed to fetch stocks. The server might be waking up...');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (symbol) => {
    try {
      setLoading(true);
      const query = symbol?.trim()?.toUpperCase();
      const results = stocks.filter((s) => s.symbol === query);
      setSearchResults(results);
      setFilteredStocks(results);
    } catch (err) {
      setError(`No stocks found for symbol: ${symbol}`);
      setSearchResults([]);
      setFilteredStocks([]);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchResults(null);
    setFilteredStocks(stocks);
    setError(null);
  };

  if (loading) {
    return <Loading message="Loading stocks..." />;
  }

  return (
    <div className="stock-list-page">
      <div className="page-header">
        <h1>All Stocks</h1>
        <p>Browse and search through our comprehensive stock database</p>
      </div>

      <SearchBar onSearch={handleSearch} />

      {searchResults && (
        <div className="search-info">
          <p>Search results for your query</p>
          <button onClick={clearSearch} className="clear-search-btn">
            Clear Search
          </button>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={fetchStocks} className="retry-btn">
            Retry
          </button>
        </div>
      )}

      <div className="stocks-grid">
        {filteredStocks.length > 0 ? (
          filteredStocks.map((stock) => (
            <StockCard key={stock.id} stock={stock} />
          ))
        ) : (
          <div className="no-stocks">
            <p>No stocks found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockList;
