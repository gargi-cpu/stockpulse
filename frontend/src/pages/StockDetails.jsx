import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { alpacaAPI } from '../services/alpaca';
import Button from '../components/Button';
import Card from '../components/Card';
import SectionHeader from '../components/SectionHeader';
import './StockDetails.css';

const StockDetails = () => {
  const { id } = useParams();
  const [stock, setStock] = useState(null);
  const [bars, setBars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStockDetails();
  }, [id]);

  const fetchStockDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const barsData = await alpacaAPI.getBars(id);
      const last = barsData?.[barsData.length - 1];
      const prev = barsData?.[barsData.length - 2];
      if (!last || !prev) throw new Error('No data');
      setStock({
        id,
        symbol: id,
        name: id,
        price: last.c,
        change: ((last.c - prev.c) / prev.c) * 100,
        volume: last.v,
        marketCap: null,
      });
      setBars(barsData);
    } catch (err) {
      setError('Failed to fetch stock details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="stock-details-page section">
        <div className="container">
          <p className="muted">Loading stock details...</p>
        </div>
      </div>
    );
  }

  if (error || !stock) {
    return (
      <div className="stock-details-page section">
        <div className="container">
          <div className="message-card">
            <div>
              <h3>Stock not found</h3>
              <p className="muted">{error || 'The requested stock could not be found.'}</p>
            </div>
            <Button to="/markets" variant="outline">Back to Stocks</Button>
          </div>
        </div>
      </div>
    );
  }

  const priceChange = stock.change || 0;
  const isPositive = priceChange >= 0;

  return (
    <div className="stock-details-page section">
      <div className="container">
        <div className="stock-details-top">
          <Button to="/markets" variant="outline">Back to Stocks</Button>
        </div>

        <SectionHeader
          eyebrow="Stock"
          title={`${stock.symbol} overview`}
          subtitle="Price history and key metrics."
        />

        <div className="stock-summary">
          <Card className="summary-card">
            <div className="summary-name">{stock.name}</div>
            <div className="summary-price">${stock.price ? stock.price.toFixed(2) : 'N/A'}</div>
            <span className={`tag ${isPositive ? 'positive' : 'negative'}`}>
              {isPositive ? '+' : '-'}
              {Math.abs(priceChange).toFixed(2)}%
            </span>
          </Card>
          <Card className="chart-card">
            <div className="chart-header">
              <h3>Price History</h3>
              <p className="muted">1D bars</p>
            </div>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bars}>
                  <XAxis dataKey="t" hide />
                  <YAxis hide />
                  <Tooltip />
                  <Line type="monotone" dataKey="c" stroke="#2f6f7a" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="details-grid">
          <Card className="detail-card">
            <div className="detail-label">Volume</div>
            <div className="detail-value">{stock.volume ? stock.volume.toLocaleString() : 'N/A'}</div>
          </Card>
          <Card className="detail-card">
            <div className="detail-label">Market Cap</div>
            <div className="detail-value">{stock.marketCap ? `$${(stock.marketCap / 1e9).toFixed(2)}B` : 'N/A'}</div>
          </Card>
          <Card className="detail-card">
            <div className="detail-label">52 Week High</div>
            <div className="detail-value">{stock.high52Week ? `$${stock.high52Week.toFixed(2)}` : 'N/A'}</div>
          </Card>
          <Card className="detail-card">
            <div className="detail-label">52 Week Low</div>
            <div className="detail-value">{stock.low52Week ? `$${stock.low52Week.toFixed(2)}` : 'N/A'}</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StockDetails;
