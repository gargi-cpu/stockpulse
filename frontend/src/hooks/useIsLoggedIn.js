import React from 'react';

function readIsLoggedIn() {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.email) return true;
  } catch {
    // ignore parse errors
  }
  return localStorage.getItem('isLoggedIn') === 'true';
}

export default function useIsLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(readIsLoggedIn);

  React.useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === 'user' || event.key === 'isLoggedIn') {
        setIsLoggedIn(readIsLoggedIn());
      }
    };

    const handleAuthChange = () => {
      setIsLoggedIn(readIsLoggedIn());
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('auth-change', handleAuthChange);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, []);

  return isLoggedIn;
}
