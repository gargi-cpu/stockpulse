import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import SearchInput from './SearchInput';
import logo from '../assets/logo/stockpulse-logo.png';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <Link to="/home" className="navbar-logo">
          <img src={logo} alt="StockPulse logo" className="logo-image" />
          <span className="logo-text">StockPulse</span>
        </Link>

        <div className="navbar-center">
          <Link to="/markets" className="navbar-link">Stocks</Link>
          <Link to="/trending" className="navbar-link">F&O</Link>
          <Link to="/news" className="navbar-link">Mutual Funds</Link>
          <Link to="/home" className="navbar-link">More</Link>
        </div>

        <div className="navbar-right">
          <SearchInput placeholder="Search stocks, indices, ETFs" />
          <Button to="/auth" variant="outline">Login / Sign up</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
