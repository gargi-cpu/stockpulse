import React from 'react';
import Button from '../components/Button';
import SectionHeader from '../components/SectionHeader';
import Card from '../components/Card';
import './Home.css';

const features = [
  {
    title: 'Markets snapshot',
    description: 'A quick read of major indices, sector performance, and daily ranges.',
    tint: 'green',
  },
  {
    title: 'Advanced charts',
    description: 'Clean charts with timeframes, overlays, and pattern cues built for focus.',
    tint: 'blue',
  },
  {
    title: 'IPOs at fingertips',
    description: 'Track upcoming listings, key dates, and company summaries without noise.',
    tint: 'green',
  },
  {
    title: 'Fast insights',
    description: 'News, movers, and sentiment summaries delivered in a calm layout.',
    tint: 'blue',
  },
];

const Home = () => {
  return (
    <div className="home">
      <section className="home-hero section">
        <div className="container hero-grid">
          <div className="hero-text">
            <div className="eyebrow">Read-only market intelligence</div>
            <h1>Calm, trustworthy insights for every market move.</h1>
            <p>
              StockPulse keeps you focused on what matters: clean data, clear context, and a
              simple path from beginner to expert.
            </p>
            <Button to="/markets" variant="primary">Get started</Button>
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
                  <p className="muted">NIFTY BANK</p>
                  <h3>48,220</h3>
                </div>
                <div>
                  <p className="muted">VIX</p>
                  <h3>13.2</h3>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Why StockPulse"
            title="A dashboard that feels like a real investment platform"
            subtitle="Designed for clarity, not clutter. Every section gives you direction without shouting for attention."
          />
          <div className="feature-stack">
            {features.map((item) => (
              <Card
                key={item.title}
                className={`feature-card feature-${item.tint}`}
              >
                <div>
                  <h3>{item.title}</h3>
                  <p className="muted">{item.description}</p>
                </div>
                <div className="feature-visual">
                  <div className="feature-lines" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <div className="container">
          <p className="muted">StockPulse is a read-only market intelligence platform.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
