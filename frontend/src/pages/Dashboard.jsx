import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import useAuthUser from '../hooks/useAuthUser';
import { alpacaAPI } from '../services/alpaca';
import { stockAPI } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const user = useAuthUser();
  const userEmail = user?.email || '';
  const displayName = userEmail
    ? userEmail.split('@')[0].replace(/\W+/g, ' ').trim()
    : '';
  const nameTitle = displayName
    ? displayName.charAt(0).toUpperCase() + displayName.slice(1)
    : '';
  const initials = displayName
    ? displayName
        .split(' ')
        .filter(Boolean)
        .map((part) => part[0].toUpperCase())
        .slice(0, 2)
        .join('')
    : userEmail
      ? userEmail[0].toUpperCase()
      : '';

  const [bars, setBars] = React.useState([]);
  const [stocks, setStocks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const [barsData, allStocks] = await Promise.all([
          alpacaAPI.getBars('AAPL'),
          stockAPI.getAllStocks()
        ]);
        setBars(barsData);
        setStocks(allStocks.slice(0, 6));
      } catch (err) {
        setError('Unable to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Hi, {nameTitle || userEmail}</h1>
          <p>Read‑only market overview and analysis.</p>
        </div>
        <div className="dashboard-user">
          <div className="avatar">{initials}</div>
          <div className="user-meta">
            <span>{userEmail}</span>
          </div>
        </div>
      </div>

      <div className="market-cards">
        <div className="market-card">
          <h3>Market Overview</h3>
          <p>Historical trend (AAPL, 1D bars)</p>
          <div className="chart-wrap">
            {loading ? (
              <div className="chart-loading">Loading chart...</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bars}>
                  <XAxis dataKey="t" hide />
                  <YAxis hide />
                  <Tooltip />
                  <Line type="monotone" dataKey="c" stroke="#7c9cff" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
        <div className="market-card">
          <h3>Portfolio Insight</h3>
          <p>No trading actions enabled.</p>
          <div className="market-stat">
            <span>Risk Level</span>
            <strong>Moderate</strong>
          </div>
          <div className="market-stat">
            <span>Coverage</span>
            <strong>Read‑only</strong>
          </div>
        </div>
        <div className="market-card">
          <h3>Signals</h3>
          <p>Analysis only. No execution.</p>
          <div className="market-stat">
            <span>Momentum</span>
            <strong>Stable</strong>
          </div>
          <div className="market-stat">
            <span>Volatility</span>
            <strong>Normal</strong>
          </div>
        </div>
      </div>

      <div className="stock-grid">
        <div className="stock-grid-header">
          <h2>Stock Summary</h2>
          <Link to="/stocks">View all</Link>
        </div>
        {error && <div className="dashboard-error">{error}</div>}
        <div className="stock-cards">
          {stocks.map((s) => (
            <div className="stock-card" key={s.id}>
              <div className="stock-symbol">{s.symbol}</div>
              <div className="stock-name">{s.name}</div>
              <div className="stock-meta">
                <span>${s.price ? s.price.toFixed(2) : 'N/A'}</span>
                <span>Cap: {s.marketCap ? `$${(s.marketCap / 1e9).toFixed(1)}B` : 'N/A'}</span>
              </div>
              <Link to={`/stock/${s.id}`} className="stock-link">Details</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
