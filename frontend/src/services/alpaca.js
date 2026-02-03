const AUTH_BASE_URL =
  import.meta.env.VITE_AUTH_API_BASE_URL || 'http://localhost:4000';

export const alpacaAPI = {
  getBars: async (symbol) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${AUTH_BASE_URL}/api/alpaca/bars/${symbol}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) {
      throw new Error('Failed to load market data');
    }
    const data = await response.json();
    return data?.bars || [];
  }
};
