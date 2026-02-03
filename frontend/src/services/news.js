const AUTH_BASE_URL =
  import.meta.env.VITE_AUTH_API_BASE_URL || 'http://localhost:4000';

export const newsAPI = {
  getHeadlines: async (symbols) => {
    const token = localStorage.getItem('token');
    const query = symbols.join(',');
    const response = await fetch(`${AUTH_BASE_URL}/api/news?symbols=${encodeURIComponent(query)}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) {
      throw new Error('Failed to load news');
    }
    return response.json();
  }
};
