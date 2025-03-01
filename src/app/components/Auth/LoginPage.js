'use client';

import { useState } from 'react';
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from '../../firebase/firebase';
import GoogleSignIn from './GoogleSignIn';
import { Mail, Lock, UserPlus, LogIn, ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center bg-violet-50 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-lg border-4 border-black bg-violet-400 flex-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover-rotate">
            {isLogin ? (
              <LogIn size={32} className="text-black" />
            ) : (
              <UserPlus size={32} className="text-black" />
            )}
          </div>
        </div>

        <div className="neu-card bg-white">
          <h2 className="h2 text-center mb-8 bg-gradient-to-r from-violet-500 via-pink-500 to-yellow-500 text-transparent bg-clip-text">
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </h2>

          {error && (
            <div className="mb-6 p-4 border-4 border-red-400 bg-red-50 rounded-lg">
              <p className="font-bold text-red-600">{error}</p>
            </div>
          )}
          
          {successMessage && (
            <div className="mb-6 p-4 border-4 border-green-400 bg-green-50 rounded-lg">
              <p className="font-bold text-green-600">✓ {successMessage}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleEmailAuth}>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="neu-input pl-12"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={20} />
            </div>

            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                required
                className="neu-input pl-12"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={20} />
            </div>

            <button
              type="submit"
              className="neu-button w-full bg-violet-400 hover:bg-violet-300 flex-center gap-2"
            >
              <span>{isLogin ? 'Sign In' : 'Sign Up'}</span>
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-violet-600 font-bold hover:text-violet-500 underline-offset-4 hover:underline"
            >
              {isLogin ? 'Create a new account' : 'Already have an account? Sign in'}
            </button>
          </div>

          <div className="mt-8 relative flex items-center">
            <div className="flex-grow border-t-4 border-black"></div>
            <span className="mx-4 font-bold text-gray-600">Or continue with</span>
            <div className="flex-grow border-t-4 border-black"></div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => {}} // Replace with your Google sign-in handler
              className="neu-button w-full bg-pink-400 hover:bg-pink-300 flex-center gap-3"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google Logo"
                className="w-6 h-6"
              />
              <span>Continue with Google</span>
            </button>
          </div>

          {isLogin && (
            <div className="mt-6 text-center">
              <button 
                onClick={handleForgotPassword} 
                className="text-violet-600 font-bold hover:text-violet-500 underline-offset-4 hover:underline"
              >
                Forgot your password?
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
