import React from 'react';
import { alpacaAPI } from '../../services/alpaca';

const MostBought = () => {
  const seed = [
    { symbol: 'AAPL', qty: '1.2M', mock: { price: 182.4, pct: 1.4 } },
    { symbol: 'MSFT', qty: '980K', mock: { price: 412.1, pct: 0.9 } },
    { symbol: 'TSLA', qty: '760K', mock: { price: 224.7, pct: -0.6 } }
  ];

  const [items, setItems] = React.useState(
    seed.map((s) => ({ ...s, price: s.mock.price, pct: s.mock.pct }))
  );

  React.useEffect(() => {
    const load = async () => {
      try {
        const updated = await Promise.all(
          seed.map(async (s) => {
            const bars = await alpacaAPI.getBars(s.symbol);
            const last = bars?.[bars.length - 1];
            const prev = bars?.[bars.length - 2];
            if (!last || !prev) throw new Error('No bars');
            const pct = ((last.c - prev.c) / prev.c) * 100;
            return { ...s, price: last.c, pct };
          })
        );
        setItems(updated);
      } catch {
        // keep mock fallback
      }
    };
    load();
  }, []);

  return (
    <div className="card">
      <h3>Most Bought</h3>
      <div className="table">
        {items.map((i) => (
          <div className="row" key={i.symbol}>
            <span>{i.symbol}</span>
            <span className="muted">{i.qty}</span>
            <span className={i.pct < 0 ? 'down' : 'up'}>
              {i.pct < 0 ? '▼' : '▲'} {Math.abs(i.pct).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostBought;
