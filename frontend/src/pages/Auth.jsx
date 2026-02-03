import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthStatus, loginWithEmail } from '../services/auth';
import './Auth.css';

function Auth() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [status, setStatus] = React.useState('checking');
  const [toast, setToast] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState(null);

  React.useEffect(() => {
    let isActive = true;
    getAuthStatus()
      .then(() => {
        if (isActive) setStatus('online');
      })
      .catch(() => {
        if (isActive) setStatus('offline');
      });

    return () => {
      isActive = false;
    };
  }, []);

  React.useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('user'));
      if (stored && stored.email) {
        setCurrentUser(stored);
      }
    } catch {
      setCurrentUser(null);
    }
  }, []);

  React.useEffect(() => {
    const message = sessionStorage.getItem('logoutToast');
    if (message) {
      setToast(message);
      sessionStorage.removeItem('logoutToast');
      const timer = setTimeout(() => setToast(''), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAuth = async () => {
    setError('');
    if (!email.trim()) {
      setError('Please enter an email address.');
      return;
    }

    try {
      setIsLoading(true);
      const result = await loginWithEmail(email.trim());
      const user = result && result.user ? result.user : result;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(user));
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
        {currentUser?.email && (
          <div className="auth-user-badge">Logged in as {currentUser.email}</div>
        )}
        {toast && <div className="auth-toast">{toast}</div>}
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
        <p className={`auth-status auth-status-${status}`}>
          Auth service: {status}
        </p>
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
