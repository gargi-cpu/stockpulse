import React from 'react';
import { newsAPI } from '../../services/news';

const MarketNews = () => {
  const [news, setNews] = React.useState([
    { title: 'Tech stocks lead early gains', url: '#' },
    { title: 'Inflation data eases market pressure', url: '#' },
    { title: 'Analysts raise growth outlook', url: '#' }
  ]);

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await newsAPI.getHeadlines(['AAPL', 'NVDA', 'GOOGL', 'AMZN']);
        if (res?.items?.length) {
          setNews(res.items.map((i) => ({ title: i.title, url: i.url || '#' })));
        }
      } catch {
        // keep fallback
      }
    };
    load();
  }, []);

  return (
    <div className="card">
      <h3>Market News</h3>
      <ul className="news-list">
        {news.map((n) => (
          <li key={n.title}>
            <a href={n.url} target="_blank" rel="noreferrer">{n.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarketNews;
