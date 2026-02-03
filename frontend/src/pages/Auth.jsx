import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithEmail } from '../services/auth';
import './Auth.css';

function Auth() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleAuth = async () => {
    setError('');
    if (!email.trim()) {
      setError('Please enter an email address.');
      return;
    }

    try {
      setIsLoading(true);
      await loginWithEmail(email.trim());
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Welcome to StockPulse</h1>
        <p>Log in to continue or create a new account.</p>
        <label className="auth-label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="auth-input"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <p className="auth-error">{error}</p>}
        <div className="auth-actions">
          <button className="primary" onClick={handleAuth} disabled={isLoading}>
            {isLoading ? 'Working...' : 'Login'}
          </button>
          <button className="secondary" onClick={handleAuth} disabled={isLoading}>
            {isLoading ? 'Working...' : 'Create Account'}
          </button>
        </div>
        <p className="auth-hint">Placeholder screen. Auth wiring coming next.</p>
      </div>
    </div>
  );
}

export default Auth;
