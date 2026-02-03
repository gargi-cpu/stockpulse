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
        
        <div className="navbar-actions">
          <ul className="navbar-menu">
            <li className="navbar-item">
              <Link to="/home" className="navbar-link">Home</Link>
            </li>
            <li className="navbar-item"><Link to="/" className="navbar-link">Markets</Link></li>
            <li className="navbar-item"><Link to="/news" className="navbar-link">News</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
