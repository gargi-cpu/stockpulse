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
