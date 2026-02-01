import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, placeholder = "Search stocks by symbol..." }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim().toUpperCase());
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className="search-button">
        🔍 Search
      </button>
    </form>
  );
};

export default SearchBar;
