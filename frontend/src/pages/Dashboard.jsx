import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { alpacaAPI } from '../services/alpaca';
import Card from '../components/Card';
import SectionHeader from '../components/SectionHeader';
import NewsCard from '../components/NewsCard';
import PriceChartCard from '../components/PriceChartCard';
import './Dashboard.css';

const indices = [
  { name: 'NIFTY 50', price: '22,184', change: 1.12 },
  { name: 'SENSEX', price: '73,610', change: 0.86 },
  { name: 'NIFTY BANK', price: '48,220', change: -0.34 },
  { name: 'NIFTY IT', price: '36,945', change: 1.48 },
];

const newsItems = [
  { title: 'Global equities steady ahead of inflation data', source: 'Reuters', time: '2h ago' },
  { title: 'Tech stocks lead gains as earnings optimism builds', source: 'Bloomberg', time: '4h ago' },
  { title: 'RBI keeps rates unchanged, signals data focus', source: 'Mint', time: '6h ago' },
];

const movers = [
  { name: 'Reliance Industries', change: 2.4 },
  { name: 'TCS', change: 1.9 },
  { name: 'ICICI Bank', change: -1.2 },
  { name: 'Infosys', change: -0.8 },
];

const Dashboard = () => {
  const [chartBars, setChartBars] = React.useState([]);
  const [chartError, setChartError] = React.useState('');
  const [alphaData, setAlphaData] = React.useState(null);
  const [alphaError, setAlphaError] = React.useState('');

  React.useEffect(() => {
    const load = async () => {
      try {
        const bars = await alpacaAPI.getBars('SPY');
        setChartBars(bars || []);
      } catch {
        setChartError('Unable to load market chart.');
      }
    };
    load();
  }, []);

  React.useEffect(() => {
    const loadAlpha = async () => {
      try {
        const baseUrl = import.meta.env.VITE_AUTH_API_BASE_URL || 'http://localhost:4000';
        const res = await fetch(`${baseUrl}/api/stocks/AAPL`);
        if (!res.ok) {
          throw new Error('Alpha Vantage fetch failed');
        }
        const data = await res.json();
        setAlphaData(data);
      } catch (err) {
        setAlphaError(err.message || 'Unable to load price chart.');
      }
    };
    loadAlpha();
  }, []);

  return (
    <div className="dashboard section">
      <div className="container">
        <SectionHeader
          eyebrow="Dashboard"
          title="Market overview at a glance"
          subtitle="A calm, read-only snapshot of the markets, charts, and movers."
        />

        <div className="indices-grid">
          {indices.map((item) => (
            <Card key={item.name} className="index-card">
              <div className="index-name">{item.name}</div>
              <div className="index-price">{item.price}</div>
              <span className={`tag ${item.change >= 0 ? 'positive' : 'negative'}`}>
                {item.change >= 0 ? '+' : '-'}
                {Math.abs(item.change).toFixed(2)}%
              </span>
            </Card>
          ))}
        </div>

        <Card className="chart-card">
          <div className="chart-header">
            <div>
              <h3>Market Overview</h3>
              <p className="muted">SPY index snapshot</p>
            </div>
            <div className="chart-filters">
              {['1D', '1M', '1Y', 'All'].map((filter) => (
                <button key={filter} className="btn btn-sm btn-outline">{filter}</button>
              ))}
            </div>
          </div>
          <div className="chart-wrap">
            {chartError ? (
              <div className="chart-error">{chartError}</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartBars}>
                  <XAxis dataKey="t" hide />
                  <YAxis hide />
                  <Tooltip />
                  <Line type="monotone" dataKey="c" stroke="#60a5fa" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>

        <div className="signal-grid">
          <Card className="signal-card">
            <div className="signal-header">
              <div>
                <h3>Signal Snapshot</h3>
                <p className="muted">AAPL · RSI + momentum</p>
              </div>
              {alphaData && (
                <span className={`tag ${alphaData.signal === 'BUY' ? 'positive' : alphaData.signal === 'SELL' ? 'negative' : ''}`}>
                  {alphaData.signal}
                </span>
              )}
            </div>
            {alphaError && <p className="muted">{alphaError}</p>}
            {alphaData && (
              <div className="signal-metrics">
                <div>
                  <div className="metric-label">Price</div>
                  <div className="metric-value">${alphaData.price?.toFixed(2)}</div>
                </div>
                <div>
                  <div className="metric-label">RSI (14)</div>
                  <div className="metric-value">{alphaData.rsi?.toFixed(2)}</div>
                </div>
                <div>
                  <div className="metric-label">Change</div>
                  <div className="metric-value">
                    {alphaData.change?.toFixed(2)} ({alphaData.changePercent})
                  </div>
                </div>
              </div>
            )}
          </Card>
          {alphaData ? (
            <PriceChartCard prices={alphaData.prices || []} />
          ) : (
            <Card className="price-chart-loading">
              <p className="muted">Loading price chart...</p>
            </Card>
          )}
        </div>

        <div className="bottom-grid">
          <div className="news-section">
            <div className="subsection-header">
              <div className="eyebrow">News</div>
              <h3>Latest headlines</h3>
              <p className="muted">Curated sources to keep you in the loop.</p>
            </div>
            <div className="news-list">
              {newsItems.map((item) => (
                <NewsCard key={item.title} {...item} />
              ))}
            </div>
          </div>
          <div className="movers-section">
            <div className="subsection-header">
              <div className="eyebrow">Movers</div>
              <h3>Top movers</h3>
              <p className="muted">Stocks with the biggest percentage moves today.</p>
            </div>
            <div className="movers-list">
              {movers.map((item) => (
                <Card key={item.name} className="mover-card">
                  <div>
                    <div className="mover-name">{item.name}</div>
                    <div className="muted">Large cap</div>
                  </div>
                  <span className={`tag ${item.change >= 0 ? 'positive' : 'negative'}`}>
                    {item.change >= 0 ? '+' : '-'}
                    {Math.abs(item.change).toFixed(2)}%
                  </span>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
