// src/app/components/Auth/AuthWrapper.js
'use client';

import { useEffect, useState } from 'react';
import { auth } from '../../firebase/firebase';
import LoginPage from './LoginPage';
import Loader from '../Loader';

export default function AuthWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loader />; // Show a loading spinner while checking auth state
  }

  return (
    <div>
      {!user ? (
        <LoginPage />
      ) : (
        children // Render the Chat component when authenticated
      )}
    </div>
  );
}