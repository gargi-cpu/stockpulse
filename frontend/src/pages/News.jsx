import React from 'react';
import { newsAPI } from '../services/news';
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
    <div className="news-page">
      <h1>Market News</h1>
      {error && <p className="news-error">{error}</p>}
      <div className="news-list">
        {items.map((n, i) => (
          <a key={`${n.title}-${i}`} href={n.url} target="_blank" rel="noreferrer" className="news-card">
            <h3>{n.title}</h3>
          </a>
        ))}
      </div>
    </div>
  );
};

export default News;
