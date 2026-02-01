import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import StockList from './pages/StockList';
import TrendingStocks from './pages/TrendingStocks';
import StockDetails from './pages/StockDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stocks" element={<StockList />} />
          <Route path="/trending" element={<TrendingStocks />} />
          <Route path="/stock/:id" element={<StockDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
