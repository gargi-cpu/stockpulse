const express = require('express');
const { getPrice, getRSI } = require('../services/alphaVantage');

const router = express.Router();

router.get('/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();

    const [price, rsi] = await Promise.all([
      getPrice(symbol),
      getRSI(symbol)
    ]);

    let signal = 'HOLD';
    if (rsi.rsi < 30) signal = 'BUY';
    if (rsi.rsi > 70) signal = 'SELL';

    res.json({
      symbol,
      price: price.price,
      change: price.change,
      changePercent: price.changePercent,
      rsi: rsi.rsi,
      signal,
      updatedAt: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
