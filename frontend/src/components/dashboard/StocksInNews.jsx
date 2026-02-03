const StocksInNews = () => {
  const items = ['AAPL', 'NVDA', 'GOOGL', 'AMZN'];
  return (
    <div className="card">
      <h3>Stocks In News</h3>
      <div className="chips">
        {items.map((s) => (
          <span className="chip" key={s}>{s}</span>
        ))}
      </div>
    </div>
  );
};

export default StocksInNews;
