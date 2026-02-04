import React from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import './Auth.css';

const Auth = () => {
  return (
    <div className="auth-page section">
      <div className="container">
        <Card className="auth-card">
          <div className="auth-left">
            <div className="eyebrow">Welcome back</div>
            <h2>Log in to StockPulse</h2>
            <p className="muted">
              Secure, read-only access to your market dashboard. No trading. No noise.
            </p>
            <div className="auth-highlight">
              <div>
                <h4>Calm analytics</h4>
                <p className="muted">A focused dashboard for daily market context.</p>
              </div>
              <div>
                <h4>Beginner-friendly</h4>
                <p className="muted">Clear labels and gentle guidance.</p>
              </div>
            </div>
          </div>
          <div className="auth-right">
            <div className="auth-form">
              <Button variant="outline" className="auth-google">Continue with Google</Button>
              <div className="auth-divider">
                <span className="muted">or continue with email</span>
              </div>
              <label className="auth-label" htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="you@company.com"
                className="input"
              />
              <Button variant="primary" className="auth-submit">Continue</Button>
              <p className="muted auth-terms">
                By continuing, you agree to our Terms and Privacy Policy.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
