import React, { useState, useEffect } from 'react';
import { alpacaAPI } from '../services/alpaca';
import StockCard from '../components/StockCard';
import SearchInput from '../components/SearchInput';
import SectionHeader from '../components/SectionHeader';
import Button from '../components/Button';
import './StockList.css';

const SYMBOLS = ['AAPL', 'MSFT', 'TSLA', 'NVDA', 'GOOGL', 'AMZN', 'META', 'JPM'];
const SECTORS = {
  AAPL: 'Consumer Tech',
  MSFT: 'Enterprise',
  TSLA: 'Auto',
  NVDA: 'Semiconductors',
  GOOGL: 'Internet',
  AMZN: 'E-commerce',
  META: 'Social',
  JPM: 'Banking',
};

const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    fetchStocks();
  }, []);

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
            return { id: sym, symbol: sym, name: sym, price: null, change: 0, sector: SECTORS[sym] };
          }
          const changePct = ((last.c - prev.c) / prev.c) * 100;
          return { id: sym, symbol: sym, name: sym, price: last.c, change: changePct, sector: SECTORS[sym] };
        })
      );
      setStocks(data);
      setFilteredStocks(data);
    } catch (err) {
      setError('Failed to fetch stocks. The server might be waking up...');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (symbol) => {
    const query = symbol?.trim()?.toUpperCase();
    const results = stocks.filter((s) => s.symbol === query);
    setSearchResults(results);
    setFilteredStocks(results);
  };

  const clearSearch = () => {
    setSearchResults(null);
    setFilteredStocks(stocks);
    setError(null);
  };

  return (
    <div className="stock-list-page section">
      <div className="container">
        <SectionHeader
          eyebrow="Stocks"
          title="Explore stocks quickly"
          subtitle="Browse a clean list of popular stocks with sector tags and price changes."
          action={<Button variant="outline" onClick={fetchStocks}>Refresh</Button>}
        />

        <div className="stock-search">
          <SearchInput placeholder="Search by symbol" onSubmit={handleSearch} />
          {searchResults && (
            <Button variant="outline" onClick={clearSearch}>Clear</Button>
          )}
        </div>

        {error && (
          <div className="message-card">
            <p className="muted">{error}</p>
            <Button variant="outline" onClick={fetchStocks}>Retry</Button>
          </div>
        )}

        {loading ? (
          <div className="message-card">
            <p className="muted">Loading stocks...</p>
          </div>
        ) : (
          <div className="stocks-grid">
            {filteredStocks.length > 0 ? (
              filteredStocks.map((stock) => (
                <StockCard key={stock.id} stock={stock} />
              ))
            ) : (
              <div className="message-card">
                <p className="muted">No stocks found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StockList;
