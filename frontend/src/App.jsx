import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import StockList from './pages/StockList';
import TrendingStocks from './pages/TrendingStocks';
import StockDetails from './pages/StockDetails';
import News from './pages/News';
import AppLayout from './layouts/AppLayout';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <AppLayout>
                <Dashboard />
              </AppLayout>
            }
          />
          <Route
            path="/home"
            element={
              <AppLayout>
                <Home />
              </AppLayout>
            }
          />
          <Route
            path="/markets"
            element={
              <AppLayout>
                <StockList />
              </AppLayout>
            }
          />
          <Route
            path="/trending"
            element={
              <AppLayout>
                <TrendingStocks />
              </AppLayout>
            }
          />
          <Route
            path="/news"
            element={
              <AppLayout>
                <News />
              </AppLayout>
            }
          />
          <Route
            path="/stock/:id"
            element={
              <AppLayout>
                <StockDetails />
              </AppLayout>
            }
          />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
