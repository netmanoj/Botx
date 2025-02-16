// src/app/components/Auth/GoogleSignIn.js
'use client';

import { auth, googleProvider, signInWithPopup } from '../../firebase/firebase';

const GoogleSignIn = () => {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('Google Sign-In Success:', user);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full py-2 px-4 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 flex items-center justify-center transition-all"
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google Logo"
        className="w-5 h-5 mr-2"
      />
      Sign in with Google
    </button>
  );
};

export default GoogleSignIn;