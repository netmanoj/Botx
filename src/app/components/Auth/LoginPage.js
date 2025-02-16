// src/app/components/Auth/LoginPage.js
'use client';

import { useState } from 'react';
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../../firebase/firebase';
import GoogleSignIn from './GoogleSignIn';
import PhoneSign from './PhoneSign';
import { Mail, Lock, User } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Sign in with email and password
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in successfully');
      } else {
        // Create a new user with email and password
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('User created successfully');
      }
    } catch (error) {
      console.error('Email Auth Error:', error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-sm w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          {isLogin ? 'Welcome Back!' : 'Create an Account'}
        </h2>
        <form className="space-y-6" onSubmit={handleEmailAuth}>
          {/* Email Input */}
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

          {/* Password Input */}
          <div className="relative">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent placeholder-gray-400"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Lock className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 transition-all"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        {/* Toggle Between Sign In and Sign Up */}
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            {isLogin ? 'Create a new account' : 'Already have an account? Sign in'}
          </button>
        </div>

        {/* Divider */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
        </div>

        {/* Social Auth Buttons */}
        <div className="mt-6 space-y-4">
          <GoogleSignIn />
          <PhoneSign />
        </div>

        {/* Forgot Password Link */}
        {isLogin && (
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
              Forgot your password?
            </a>
          </div>
        )}
      </div>
    </div>
  );
}