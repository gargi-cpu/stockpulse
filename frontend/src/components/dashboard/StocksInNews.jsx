import React from 'react';
import { newsAPI } from '../../services/news';

const StocksInNews = () => {
  const [symbols, setSymbols] = React.useState(['AAPL', 'NVDA', 'GOOGL', 'AMZN']);

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await newsAPI.getHeadlines(symbols);
        const inferred = Array.from(new Set(res.items.map((i) => i.symbol))).slice(0, 5);
        if (inferred.length) setSymbols(inferred);
      } catch {
        // keep fallback
      }
    };
    load();
  }, []);

  return (
    <div className="card">
      <h3>Stocks In News</h3>
      <div className="chips">
        {symbols.map((s) => (
          <span className="chip" key={s}>{s}</span>
        ))}
      </div>
    </div>
  );
};

export default StocksInNews;
