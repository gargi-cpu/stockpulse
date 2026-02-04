import React from 'react';
import Card from '../components/Card';
import SectionHeader from '../components/SectionHeader';
import './TrendingStocks.css';

const sections = [
  {
    title: 'Most searched',
    subtitle: 'What investors are exploring today.',
    items: [
      { name: 'Reliance Industries', detail: 'Energy' },
      { name: 'HDFC Bank', detail: 'Banking' },
      { name: 'Tata Motors', detail: 'Auto' },
    ],
  },
  {
    title: 'Stocks in news',
    subtitle: 'Names trending across headlines.',
    items: [
      { name: 'Infosys', detail: 'Tech services' },
      { name: 'Adani Ports', detail: 'Logistics' },
      { name: 'Larsen & Toubro', detail: 'Infrastructure' },
    ],
  },
  {
    title: 'Most bought',
    subtitle: 'Top names on watchlists this week.',
    items: [
      { name: 'ICICI Bank', detail: 'Banking' },
      { name: 'Bharti Airtel', detail: 'Telecom' },
      { name: 'Asian Paints', detail: 'Consumer' },
    ],
  },
];

const TrendingStocks = () => {
  return (
    <div className="trending-page section">
      <div className="container">
        <SectionHeader
          eyebrow="Trending"
          title="Discover what the market is watching"
          subtitle="Simple lists of what investors search for, read about, and buy."
        />

        <div className="trending-grid">
          {sections.map((section) => (
            <Card key={section.title} className="trending-card">
              <div className="trending-card-header">
                <h3>{section.title}</h3>
                <p className="muted">{section.subtitle}</p>
              </div>
              <div className="trending-list">
                {section.items.map((item) => (
                  <div key={item.name} className="trending-item">
                    <div>
                      <div className="trending-name">{item.name}</div>
                      <div className="muted">{item.detail}</div>
                    </div>
                    <span className="tag">View</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingStocks;
