import axios from 'axios';

// Your live backend API
const API_BASE_URL = 'https://stockpulse-pxw3.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout (for free tier wake-up)
});

// Stock API endpoints
export const stockAPI = {
  // Get all stocks
  getAllStocks: async () => {
    try {
      const response = await api.get('/stocks');
      return response.data;
    } catch (error) {
      console.error('Error fetching stocks:', error);
      throw error;
    }
  },

  // Search stocks by symbol
  searchStocks: async (symbol) => {
    try {
      const response = await api.get(`/stocks/search`, {
        params: { symbol }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching stocks:', error);
      throw error;
    }
  },

  // Get trending stocks
  getTrendingStocks: async () => {
    try {
      const response = await api.get('/stocks/trending');
      return response.data;
    } catch (error) {
      console.error('Error fetching trending stocks:', error);
      throw error;
    }
  },

  // Get stock by ID
  getStockById: async (id) => {
    try {
      const response = await api.get(`/stocks/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching stock details:', error);
      throw error;
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await axios.get('https://stockpulse-pxw3.onrender.com/actuator/health');
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }
};

export default api;
