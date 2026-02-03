import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout (for free tier wake-up)
});

// Stock API endpoints
const parseNumberFromText = (value) => {
  if (value === null || value === undefined) return null;
  const text = String(value).replace(/,/g, '');
  const match = text.match(/-?\d+(\.\d+)?/);
  if (!match) return null;
  const num = Number(match[0]);
  return Number.isFinite(num) ? num : null;
};

const normalizeStock = (item) => {
  const currentPrice = parseNumberFromText(item?.currentPrice);
  const marketCap = parseNumberFromText(item?.marketCap);
  return {
    id: item?.symbol ?? '',
    symbol: item?.symbol ?? '',
    name: item?.name ?? '',
    price: currentPrice,
    marketCap,
    volume: null,
    change: null,
    percentChange: null,
    raw: item,
  };
};

const normalizeStocksResponse = (payload) => {
  const items = payload?.data?.items;
  if (!Array.isArray(items)) return [];
  return items.map(normalizeStock);
};

export const stockAPI = {
  // Get all stocks
  getAllStocks: async () => {
    try {
      const response = await api.get('/stocks');
      return normalizeStocksResponse(response.data);
    } catch (error) {
      console.error('Error fetching stocks:', error);
      throw error;
    }
  },

  // Search stocks by symbol (client-side)
  searchStocks: async (symbol) => {
    const all = await stockAPI.getAllStocks();
    const query = symbol?.trim()?.toUpperCase();
    if (!query) return all;
    return all.filter((stock) => stock.symbol === query);
  },

  // Get trending stocks (client-side for now)
  getTrendingStocks: async () => {
    const all = await stockAPI.getAllStocks();
    return all.slice(0, 10);
  },

  // Get stock by ID (client-side)
  getStockById: async (id) => {
    const all = await stockAPI.getAllStocks();
    return all.find((stock) => stock.id === id) || null;
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }
};

export default api;
