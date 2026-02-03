import StocksInNews from './StocksInNews';
import MarketNews from './MarketNews';

const RightSidebar = () => {
  return (
    <aside className="right-sidebar">
      <StocksInNews />
      <MarketNews />
    </aside>
  );
};

export default RightSidebar;
