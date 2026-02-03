const IndicesRow = () => {
  const indices = [
    { name: 'NIFTY', value: '22,540', change: '+0.62%' },
    { name: 'BANKNIFTY', value: '48,210', change: '-0.18%' },
    { name: 'SENSEX', value: '74,320', change: '+0.41%' }
  ];

  return (
    <div className="indices-row">
      {indices.map((i) => (
        <div className="card index-card" key={i.name}>
          <div className="index-title">{i.name}</div>
          <div className="index-value">{i.value}</div>
          <div className={`index-change ${i.change.startsWith('-') ? 'down' : 'up'}`}>
            {i.change}
          </div>
        </div>
      ))}
    </div>
  );
};

export default IndicesRow;
