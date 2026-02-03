import React from 'react';
import { Link } from 'react-router-dom';
import useAuthUser from '../hooks/useAuthUser';
import './Home.css';

const Home = () => {
  const currentUser = useAuthUser();

  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="gradient-text">StockPulse</span>
          </h1>
          {currentUser?.email && (
            <div className="home-user-badge">Logged in as {currentUser.email}</div>
          )}
          <p className="hero-subtitle">
            Real-time stock market data and insights at your fingertips
          </p>
          <p className="hero-description">
            Track stocks, analyze trends, and make informed investment decisions
            with our powerful stock market platform.
          </p>
          
          <div className="hero-buttons">
            <Link to="/stocks" className="btn btn-primary">
              View All Stocks
            </Link>
            <Link to="/trending" className="btn btn-secondary">
              Trending Stocks
            </Link>
          </div>
        </div>
        
        <div className="hero-features">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Real-Time Data</h3>
            <p>Get live stock prices and market updates</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Smart Search</h3>
            <p>Find stocks instantly by symbol or name</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Trending Analysis</h3>
            <p>Discover the hottest stocks in the market</p>
          </div>
        </div>
      </div>
      
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-number">1000+</div>
          <div className="stat-label">Stocks Available</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">Real-Time</div>
          <div className="stat-label">Market Data</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">24/7</div>
          <div className="stat-label">Access</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
