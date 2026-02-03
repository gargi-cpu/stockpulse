import React from 'react';
import { alpacaAPI } from '../../services/alpaca';

const IndicesRow = () => {
  const config = [
    { label: 'NIFTY', symbol: 'SPY', mock: { price: 22540, change: 140, pct: 0.62 } },
    { label: 'BANKNIFTY', symbol: 'XLF', mock: { price: 48210, change: -86, pct: -0.18 } },
    { label: 'SENSEX', symbol: 'DIA', mock: { price: 74320, change: 305, pct: 0.41 } }
  ];

  const [indices, setIndices] = React.useState(
    config.map((c) => ({
      name: c.label,
      price: c.mock.price,
      change: c.mock.change,
      pct: c.mock.pct
    }))
  );

  React.useEffect(() => {
    const load = async () => {
      try {
        const results = await Promise.all(
          config.map(async (c) => {
            const bars = await alpacaAPI.getBars(c.symbol);
            const last = bars?.[bars.length - 1];
            const prev = bars?.[bars.length - 2];
            if (!last || !prev) throw new Error('No bars');
            const price = last.c;
            const change = last.c - prev.c;
            const pct = (change / prev.c) * 100;
            return { name: c.label, price, change, pct };
          })
        );
        setIndices(results);
      } catch {
        // keep mock fallback
      }
    };
    load();
  }, []);

  return (
    <div className="indices-row">
      {indices.map((i) => (
        <div className="card index-card" key={i.name}>
          <div className="index-title">{i.name}</div>
          <div className="index-value">{i.price.toLocaleString()}</div>
          <div className={`index-change ${i.change < 0 ? 'down' : 'up'}`}>
            {i.change < 0 ? '▼' : '▲'} {Math.abs(i.change).toFixed(2)} ({i.pct.toFixed(2)}%)
          </div>
        </div>
      ))}
    </div>
  );
};

export default IndicesRow;
