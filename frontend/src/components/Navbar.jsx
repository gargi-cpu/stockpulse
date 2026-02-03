import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch {
    user = null;
  }
  const userEmail = user && user.email ? user.email : null;

  const handleLogout = () => {
    const confirmed = window.confirm('Log out of StockPulse?');
    if (!confirmed) return;
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('user');
    navigate('/');
  };

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
              <Link to="/" className="navbar-link">Home</Link>
            </li>
            <li className="navbar-item">
              <Link to="/stocks" className="navbar-link">All Stocks</Link>
            </li>
            <li className="navbar-item">
              <Link to="/trending" className="navbar-link">Trending</Link>
            </li>
          </ul>
          {userEmail && (
            <span className="navbar-user">Hi, {userEmail}</span>
          )}
          <button className="navbar-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
