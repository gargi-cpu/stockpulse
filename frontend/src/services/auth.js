const AUTH_BASE_URL =
  import.meta.env.VITE_AUTH_API_BASE_URL || 'http://localhost:4000';

export async function loginWithEmail(email) {
  const response = await fetch(`${AUTH_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message = errorBody.message || 'Login failed';
    throw new Error(message);
  }

  return response.json();
}

export async function getAuthHealth() {
  const response = await fetch(`${AUTH_BASE_URL}/health`);
  if (!response.ok) {
    throw new Error('Auth service unavailable');
  }
  return response.json();
}

export async function getAuthMe(token) {
  const response = await fetch(`${AUTH_BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!response.ok) {
    throw new Error('Invalid token');
  }
  return response.json();
}
