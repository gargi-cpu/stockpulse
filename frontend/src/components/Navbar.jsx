import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthUser from '../hooks/useAuthUser';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const user = useAuthUser();
  const userEmail = user && user.email ? user.email : null;
  const displayName = userEmail
    ? userEmail.split('@')[0].replace(/\W+/g, ' ').trim()
    : '';
  const nameTitle = displayName
    ? displayName.charAt(0).toUpperCase() + displayName.slice(1)
    : '';
  const initials = displayName
    ? displayName
        .split(' ')
        .filter(Boolean)
        .map((part) => part[0].toUpperCase())
        .slice(0, 2)
        .join('')
    : userEmail
      ? userEmail[0].toUpperCase()
      : '';

  const handleLogout = () => {
    sessionStorage.setItem('logoutToast', 'You have been logged out.');
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('auth-change'));
    window.dispatchEvent(new CustomEvent('auth-changed'));
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
            {userEmail && (
              <>
                <li className="navbar-item">
                  <Link to="/dashboard" className="navbar-link">Dashboard</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/stocks" className="navbar-link">Stocks</Link>
                </li>
              </>
            )}
          </ul>
          {userEmail && (
            <div className="navbar-user">
              <span className="navbar-avatar">{initials}</span>
              <span>Hi, {nameTitle || userEmail}</span>
            </div>
          )}
          {userEmail && (
            <button className="navbar-button" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
