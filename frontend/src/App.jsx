import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SplashScreen from './components/SplashScreen';
import Home from './pages/Home';
import Auth from './pages/Auth';
import StockList from './pages/StockList';
import TrendingStocks from './pages/TrendingStocks';
import StockDetails from './pages/StockDetails';
import ProtectedRoute from './routes/ProtectedRoute';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/stocks"
            element={<ProtectedRoute><StockList /></ProtectedRoute>}
          />
          <Route
            path="/trending"
            element={<ProtectedRoute><TrendingStocks /></ProtectedRoute>}
          />
          <Route
            path="/stock/:id"
            element={<ProtectedRoute><StockDetails /></ProtectedRoute>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
