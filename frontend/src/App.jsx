import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SplashScreen from './components/SplashScreen';
import Home from './pages/Home';
import Auth from './pages/Auth';
import StockList from './pages/StockList';
import TrendingStocks from './pages/TrendingStocks';
import StockDetails from './pages/StockDetails';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <div className="App">
        {isLoggedIn && <Navbar />}
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Auth />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/stocks" element={<StockList />} />
          <Route path="/trending" element={<TrendingStocks />} />
          <Route path="/stock/:id" element={<StockDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
