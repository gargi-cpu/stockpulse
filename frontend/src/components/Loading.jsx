import React from 'react';
import './Loading.css';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">{message}</p>
      <p className="loading-subtext">
        {message.includes('Waking') 
          ? 'Free tier instances sleep after inactivity. This may take up to 50 seconds.' 
          : ''}
      </p>
    </div>
  );
};

export default Loading;
