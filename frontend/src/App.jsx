import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import StockList from './pages/StockList';
import TrendingStocks from './pages/TrendingStocks';
import StockDetails from './pages/StockDetails';
import ProtectedRoute from './routes/ProtectedRoute';
import { getAuthMe } from './services/auth';
import AppLayout from './layouts/AppLayout';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    getAuthMe(token)
      .then((data) => {
        if (data?.user) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('user', JSON.stringify(data.user));
          window.dispatchEvent(new CustomEvent('auth-changed'));
        }
      })
      .catch(() => {
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.dispatchEvent(new CustomEvent('auth-changed'));
      });
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/stocks"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <StockList />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/trending"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <TrendingStocks />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/stock/:id"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <StockDetails />
                </AppLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
