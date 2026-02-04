import React from 'react';
import './SearchInput.css';

const SearchInput = ({
  placeholder = 'Search stocks, indices, ETFs',
  onSubmit,
  value,
  onChange,
}) => {
  const [term, setTerm] = React.useState('');
  const controlled = value !== undefined && onChange;
  const inputValue = controlled ? value : term;

  const handleChange = (event) => {
    if (controlled) {
      onChange(event);
      return;
    }
    setTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!onSubmit) {
      return;
    }
    const next = inputValue.trim();
    if (next) {
      onSubmit(next);
    }
  };

  return (
    <form className="search-input" onSubmit={handleSubmit}>
      <span className="search-icon">Search</span>
      <input
        className="input search-field"
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
      />
    </form>
  );
};

export default SearchInput;
