import React from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import SectionHeader from '../components/SectionHeader';
import './Home.css';

const marketCards = [
  {
    name: 'NIFTY 50',
    value: '22,184.3',
    change: 1.12,
    low: 21940,
    high: 22210,
    icon: 'N50',
  },
  {
    name: 'SENSEX',
    value: '73,610.1',
    change: 0.74,
    low: 73210,
    high: 73680,
    icon: 'SNSX',
  },
  {
    name: 'NASDAQ',
    value: '15,482.8',
    change: -0.36,
    low: 15420,
    high: 15630,
    icon: 'NDQ',
  },
  {
    name: 'S&P 500',
    value: '4,912.6',
    change: 0.28,
    low: 4890,
    high: 4942,
    icon: 'SPX',
  },
];

const ipoCards = [
  {
    name: 'Aether Mobility',
    type: 'Electric Mobility',
    status: 'Upcoming',
    opensIn: 'Opens in 3 days',
    progress: 20,
    logo: 'AM',
  },
  {
    name: 'Northbridge Fintech',
    type: 'Financial Services',
    status: 'Open',
    opensIn: 'Closes in 2 days',
    progress: 65,
    logo: 'NF',
  },
  {
    name: 'GreenLeaf Energy',
    type: 'Renewables',
    status: 'Closed',
    opensIn: 'Closed yesterday',
    progress: 100,
    logo: 'GE',
  },
];

const newsItems = [
  { title: 'RBI keeps rates steady, signals data-driven stance', ticker: 'RBI', time: '2h ago' },
  { title: 'Tech megacaps lead global market breadth', ticker: 'TECH', time: '3h ago' },
  { title: 'Banking sector flows turn positive in early trade', ticker: 'BANK', time: '5h ago' },
];

const movers = [
  { name: 'Reliance Industries', change: 2.4 },
  { name: 'TCS', change: 1.9 },
  { name: 'ICICI Bank', change: -1.2 },
];

const sentiment = [
  { label: 'Large Caps', mood: 'Bullish', confidence: 72 },
  { label: 'Mid Caps', mood: 'Neutral', confidence: 48 },
  { label: 'Small Caps', mood: 'Bearish', confidence: 36 },
];

const Home = () => {
  return (
    <div className="home">
      <section className="home-hero section">
        <div className="container hero-grid">
          <div className="hero-text">
            <div className="eyebrow">Market terminal</div>
            <h1>Calm, data-first intelligence for serious investors.</h1>
            <p>
              StockPulse gives you a clear market pulse in seconds — with clean
              visuals, trustworthy context, and zero trading noise.
            </p>
            <div className="hero-actions">
              <Button to="/" variant="primary">Open dashboard</Button>
              <Button to="/markets" variant="outline">Explore stocks</Button>
            </div>
          </div>
          <div className="hero-panel">
            <Card className="hero-card">
              <div className="hero-card-header">
                <span className="tag">Today</span>
                <span className="muted">Market pulse</span>
              </div>
              <div className="hero-card-value">+1.24%</div>
              <div className="hero-card-grid">
                <div>
                  <p className="muted">NIFTY 50</p>
                  <h3>22,184</h3>
                </div>
                <div>
                  <p className="muted">SENSEX</p>
                  <h3>73,610</h3>
                </div>
                <div>
                  <p className="muted">NASDAQ</p>
                  <h3>15,482</h3>
                </div>
                <div>
                  <p className="muted">S&P 500</p>
                  <h3>4,912</h3>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Markets snapshot"
            title="A quick read of major indices"
            subtitle="At-a-glance pulse of indices, sector performance, and daily ranges."
          />
          <div className="market-grid">
            {marketCards.map((item) => {
              const range = item.high - item.low;
              const pos = range ? ((parseFloat(item.value.replace(/,/g, '')) - item.low) / range) * 100 : 50;
              return (
                <Card key={item.name} className="market-card">
                  <div className="market-card-top">
                    <div className="badge-circle">{item.icon}</div>
                    <div className="market-name">{item.name}</div>
                    <span className={`tag ${item.change >= 0 ? 'positive' : 'negative'}`}>
                      {item.change >= 0 ? '▲' : '▼'} {Math.abs(item.change).toFixed(2)}%
                    </span>
                  </div>
                  <div className="market-value">{item.value}</div>
                  <div className="range-meta">
                    <span>{item.low.toLocaleString()}</span>
                    <span>{item.high.toLocaleString()}</span>
                  </div>
                  <div className="range-bar">
                    <span style={{ width: `${Math.min(100, Math.max(8, pos))}%` }} />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Advanced charts"
            title="Clean charts built for focus"
            subtitle="Timeframes, overlays, and pattern cues without visual noise."
          />
          <Card className="chart-terminal">
            <div className="chart-controls">
              <div className="pill-group">
                {['1D', '1W', '1M', '1Y', 'MAX'].map((t) => (
                  <button key={t} className="pill">{t}</button>
                ))}
              </div>
              <div className="pill-group">
                {['Moving Average', 'Volume', 'Patterns'].map((t) => (
                  <button key={t} className="pill pill-outline">{t}</button>
                ))}
              </div>
            </div>
            <div className="chart-canvas">
              <svg viewBox="0 0 600 220" preserveAspectRatio="none">
                <polyline
                  points="0,160 80,140 140,150 220,110 300,120 380,80 460,90 540,60 600,70"
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="2"
                />
                <polyline
                  points="0,180 90,170 150,175 230,145 300,150 380,120 460,130 540,100 600,110"
                  fill="none"
                  stroke="#7dd3fc"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                />
                <rect x="320" y="40" width="140" height="80" fill="rgba(250, 204, 21, 0.08)" />
              </svg>
              <div className="chart-legend">
                <span>SPX · Intraday</span>
                <span className="muted">Data as of 10:42 AM</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="IPOs at fingertips"
            title="Track upcoming listings with clarity"
            subtitle="Compact cards with dates, status, and timeline progress."
          />
          <div className="ipo-grid">
            {ipoCards.map((item) => (
              <Card key={item.name} className="ipo-card">
                <div className="ipo-top">
                  <div className="logo-badge">{item.logo}</div>
                  <div>
                    <div className="ipo-name">{item.name}</div>
                    <div className="muted">{item.type}</div>
                  </div>
                  <span className={`tag ${item.status === 'Open' ? 'positive' : item.status === 'Closed' ? 'negative' : ''}`}>
                    {item.status}
                  </span>
                </div>
                <div className="ipo-meta">
                  <span className="date-badge">{item.opensIn}</span>
                  <span className="muted">Documented</span>
                </div>
                <div className="progress-bar">
                  <span style={{ width: `${item.progress}%` }} />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Fast insights"
            title="News, movers, and sentiment"
            subtitle="Calm, text-first summaries with clear direction signals."
          />
          <div className="insights-grid">
            <div className="insights-left">
              {newsItems.map((item) => (
                <Card key={item.title} className="news-card-row">
                  <div className="news-icon" />
                  <div>
                    <div className="news-title">{item.title}</div>
                    <div className="news-meta">
                      <span className="tag">{item.ticker}</span>
                      <span className="muted">{item.time}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="insights-right">
              <Card className="movers-card">
                <div className="card-title">Top Movers</div>
                <div className="movers-list">
                  {movers.map((item) => (
                    <div key={item.name} className="mover-row">
                      <span>{item.name}</span>
                      <span className={`tag ${item.change >= 0 ? 'positive' : 'negative'}`}>
                        {item.change >= 0 ? '▲' : '▼'} {Math.abs(item.change).toFixed(2)}%
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="sentiment-card">
                <div className="card-title">Sentiment</div>
                <div className="sentiment-list">
                  {sentiment.map((item) => (
                    <div key={item.label} className="sentiment-row">
                      <div>
                        <div className="sentiment-label">{item.label}</div>
                        <div className="muted">{item.mood}</div>
                      </div>
                      <div className="confidence-bar">
                        <span style={{ width: `${item.confidence}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
