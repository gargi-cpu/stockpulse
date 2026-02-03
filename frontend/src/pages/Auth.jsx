import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthHealth, loginWithEmail } from '../services/auth';
import useAuthUser from '../hooks/useAuthUser';
import './Auth.css';

function Auth() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [status, setStatus] = React.useState('checking');
  const [statusError, setStatusError] = React.useState('');
  const [toast, setToast] = React.useState('');
  const currentUser = useAuthUser();

  React.useEffect(() => {
    let isActive = true;
    getAuthHealth()
      .then(() => {
        if (isActive) {
          setStatus('online');
          setStatusError('');
        }
      })
      .catch((err) => {
        if (isActive) {
          setStatus('offline');
          setStatusError(err.message || 'Auth service unavailable');
        }
      });

    return () => {
      isActive = false;
    };
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
      localStorage.setItem('token', result.token);
      window.dispatchEvent(new Event('auth-change'));
      window.dispatchEvent(new CustomEvent('auth-changed'));
      navigate('/dashboard');
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
        {status === 'offline' && (
          <p className="auth-error">{statusError}</p>
        )}
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
