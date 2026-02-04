const BASE_URL = 'https://www.alphavantage.co/query';

function getApiKey() {
  const key = process.env.ALPHA_VANTAGE_API_KEY;
  if (!key) {
    throw new Error('ALPHA_VANTAGE_API_KEY not set');
  }
  return key;
}

async function fetchAlphaVantage(params) {
  const url = `${BASE_URL}?${new URLSearchParams(params).toString()}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Alpha Vantage request failed');
  }
  return res.json();
}

async function getPrice(symbol) {
  const data = await fetchAlphaVantage({
    function: 'GLOBAL_QUOTE',
    symbol,
    apikey: getApiKey()
  });

  const quote = data['Global Quote'];
  if (!quote) {
    throw new Error('Invalid price response');
  }

  return {
    symbol,
    price: Number(quote['05. price']),
    change: Number(quote['09. change']),
    changePercent: quote['10. change percent']
  };
}

async function getRSI(symbol) {
  const data = await fetchAlphaVantage({
    function: 'RSI',
    symbol,
    interval: 'daily',
    time_period: '14',
    series_type: 'close',
    apikey: getApiKey()
  });

  const rsiData = data['Technical Analysis: RSI'];
  if (!rsiData) {
    throw new Error('Invalid RSI response');
  }

  const latestDate = Object.keys(rsiData).sort().pop();
  if (!latestDate) {
    throw new Error('RSI data missing');
  }

  return {
    rsi: Number(rsiData[latestDate].RSI),
    date: latestDate
  };
}

module.exports = {
  getPrice,
  getRSI
};
