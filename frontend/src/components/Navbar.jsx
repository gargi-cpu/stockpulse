import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">📈</span>
          <span className="logo-text">StockPulse</span>
        </Link>
        
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/stocks" className="navbar-link">All Stocks</Link>
          </li>
          <li className="navbar-item">
            <Link to="/trending" className="navbar-link">Trending</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
