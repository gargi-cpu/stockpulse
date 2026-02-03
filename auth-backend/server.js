require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';
const ALPACA_API_KEY = process.env.ALPACA_API_KEY;
const ALPACA_API_SECRET = process.env.ALPACA_API_SECRET;
const ALPACA_DATA_BASE_URL = process.env.ALPACA_DATA_BASE_URL || 'https://data.alpaca.markets';

if (!MONGODB_URI) {
  console.error('Missing MONGODB_URI environment variable.');
  process.exit(1);
}
if (!JWT_SECRET) {
  console.error('Missing JWT_SECRET environment variable.');
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/auth/login', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'email is required' });
  }

  try {
    let user = await User.findOne({ email });
    const now = new Date();

    if (user) {
      user.lastLogin = now;
      await user.save();
      const token = jwt.sign({ email: user.email, userId: user._id }, JWT_SECRET, {
        expiresIn: '7d'
      });
      return res.json({
        token,
        user: { email: user.email, createdAt: user.createdAt }
      });
    }

    user = await User.create({ email, createdAt: now, lastLogin: now });
    const token = jwt.sign({ email: user.email, userId: user._id }, JWT_SECRET, {
      expiresIn: '7d'
    });
    return res.status(201).json({
      token,
      user: { email: user.email, createdAt: user.createdAt }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'server error' });
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'missing token' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'invalid token' });
  }
}

app.get('/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'user not found' });
    return res.json({ user: { email: user.email, createdAt: user.createdAt } });
  } catch (err) {
    return res.status(500).json({ message: 'server error' });
  }
});

app.get('/api/alpaca/bars/:symbol', authenticateToken, async (req, res) => {
  const { symbol } = req.params;
  if (!ALPACA_API_KEY || !ALPACA_API_SECRET) {
    return res.status(500).json({ message: 'Alpaca credentials missing' });
  }

  try {
    const url = `${ALPACA_DATA_BASE_URL}/v2/stocks/${symbol}/bars?timeframe=1Day&limit=30`;
    const alpacaRes = await fetch(url, {
      headers: {
        'APCA-API-KEY-ID': ALPACA_API_KEY,
        'APCA-API-SECRET-KEY': ALPACA_API_SECRET
      }
    });
    if (!alpacaRes.ok) {
      return res.status(502).json({ message: 'Alpaca data fetch failed' });
    }
    const payload = await alpacaRes.json();
    return res.json({ bars: payload?.bars || [] });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Auth backend running on port ${PORT}`);
});
