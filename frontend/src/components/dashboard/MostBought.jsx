const MostBought = () => {
  const items = [
    { symbol: 'AAPL', qty: '1.2M', change: '+1.4%' },
    { symbol: 'MSFT', qty: '980K', change: '+0.9%' },
    { symbol: 'TSLA', qty: '760K', change: '-0.6%' }
  ];

  return (
    <div className="card">
      <h3>Most Bought</h3>
      <div className="table">
        {items.map((i) => (
          <div className="row" key={i.symbol}>
            <span>{i.symbol}</span>
            <span className="muted">{i.qty}</span>
            <span className={i.change.startsWith('-') ? 'down' : 'up'}>{i.change}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostBought;
