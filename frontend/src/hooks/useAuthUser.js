import React from 'react';

export default function useAuthUser() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('user'));
      setUser(stored && stored.email ? stored : null);
    } catch {
      setUser(null);
    }
  }, []);

  React.useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === 'user') {
        try {
          const nextUser = event.newValue ? JSON.parse(event.newValue) : null;
          setUser(nextUser && nextUser.email ? nextUser : null);
        } catch {
          setUser(null);
        }
      }
    };

    const handleAuthChange = () => {
      try {
        const stored = JSON.parse(localStorage.getItem('user'));
        setUser(stored && stored.email ? stored : null);
      } catch {
        setUser(null);
      }
    };

    const handleAuthChanged = () => handleAuthChange();

    window.addEventListener('storage', handleStorage);
    window.addEventListener('auth-change', handleAuthChange);
    window.addEventListener('auth-changed', handleAuthChanged);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('auth-change', handleAuthChange);
      window.removeEventListener('auth-changed', handleAuthChanged);
    };
  }, []);

  return user;
}
