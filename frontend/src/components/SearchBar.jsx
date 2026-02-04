import React, { useState } from 'react';
import Button from './Button';
import './SearchBar.css';

const SearchBar = ({ onSearch, placeholder = 'Search stocks by symbol...' }) => {
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
        className="input"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button type="submit" variant="outline">Search</Button>
    </form>
  );
};

export default SearchBar;
