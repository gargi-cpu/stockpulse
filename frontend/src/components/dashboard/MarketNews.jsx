const MarketNews = () => {
  const news = [
    'Tech stocks lead early gains',
    'Inflation data eases market pressure',
    'Analysts raise growth outlook'
  ];

  return (
    <div className="card">
      <h3>Market News</h3>
      <ul className="news-list">
        {news.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    </div>
  );
};

export default MarketNews;
