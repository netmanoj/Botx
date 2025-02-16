'use client';

import { useState } from 'react';
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from '../../firebase/firebase';
import GoogleSignIn from './GoogleSignIn';
import { Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle email/password authentication
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!isLogin && password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in successfully');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('User created successfully');
      }
    } catch (error) {
      console.error('Email Auth Error:', error.code);
      switch (error.code) {
        case 'auth/invalid-credential':
          setError('Invalid email or password. Please try again.');
          break;
        case 'auth/user-not-found':
          setError('No user found with this email address.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password. Please try again.');
          break;
        case 'auth/email-already-in-use':
          setError('This email is already in use. Please sign in instead.');
          break;
        default:
          setError('An error occurred. Please try again.');
      }
    }
  };

  const handleForgotPassword = async () => {
    setError('');
    setSuccessMessage('');
    if (!email) {
      setError('Please enter your email address first.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage('Password reset email sent. Check your inbox.');
    } catch (error) {
      console.error('Password Reset Error:', error.message);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-sm w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          {isLogin ? 'Welcome Back!' : 'Create an Account'}
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm mb-4">✅ {successMessage}</p>}

        <form className="space-y-6" onSubmit={handleEmailAuth}>
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent placeholder-gray-400"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Mail className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>

          <div className="relative">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={isLogin ? "current-password" : "new-password"}
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent placeholder-gray-400"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Lock className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 transition-all"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button onClick={() => setIsLogin(!isLogin)} className="text-sm text-blue-600 hover:text-blue-500">
            {isLogin ? 'Create a new account' : 'Already have an account? Sign in'}
          </button>
        </div>

        <div className="mt-6 relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>

        <div className="mt-6 space-y-4">
          <GoogleSignIn />
        </div>

        {isLogin && (
          <div className="mt-4 text-center">
            <button onClick={handleForgotPassword} className="text-sm text-blue-600 hover:text-blue-500">
              Forgot your password?
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
