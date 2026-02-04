import React from 'react';
import { newsAPI } from '../services/news';
import SectionHeader from '../components/SectionHeader';
import NewsCard from '../components/NewsCard';
import './News.css';

const News = () => {
  const [items, setItems] = React.useState([]);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await newsAPI.getHeadlines(['AAPL', 'NVDA', 'GOOGL', 'AMZN']);
        setItems(res.items || []);
      } catch {
        setError('Unable to load news right now.');
      }
    };
    load();
  }, []);

  return (
    <div className="news-page section">
      <div className="container">
        <SectionHeader
          eyebrow="News"
          title="Market news"
          subtitle="Headlines from trusted sources, curated for quick scanning."
        />

        {error && <p className="news-error">{error}</p>}

        <div className="news-list">
          {items.map((n, i) => (
            <a
              key={`${n.title}-${i}`}
              href={n.url}
              target="_blank"
              rel="noreferrer"
              className="news-link"
            >
              <NewsCard
                title={n.title}
                source={n.source || 'Market'}
                time={n.time || 'Just now'}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
