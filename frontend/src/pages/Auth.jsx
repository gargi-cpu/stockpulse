import React from 'react';
import './Auth.css';

function Auth() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Welcome to StockPulse</h1>
        <p>Log in to continue or create a new account.</p>
        <div className="auth-actions">
          <button className="primary">Login</button>
          <button className="secondary">Create Account</button>
        </div>
        <p className="auth-hint">Placeholder screen. Auth wiring coming next.</p>
      </div>
    </div>
  );
}

export default Auth;
