const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Missing MONGODB_URI environment variable.');
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.use(cors());
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
      return res.json({ message: 'logged in', user });
    }

    user = await User.create({ email, createdAt: now, lastLogin: now });
    return res.status(201).json({ message: 'user created', user });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Auth backend running on port ${PORT}`);
});
