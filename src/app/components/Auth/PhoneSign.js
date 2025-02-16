// src/app/components/Auth/PhoneSign.js

/*


This service is not currently being used 
-Manoj
|
|
|
|
|
|
|
|




'use client';

import { useState } from 'react';
import { auth, signInWithPhoneNumber, RecaptchaVerifier } from '../../firebase/firebase';

const PhoneSign = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [showOtpField, setShowOtpField] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = async () => {
    setError('');

    // Validate phone number format
    if (!phoneNumber.startsWith('+')) {
      setError('Phone number must start with a country code (e.g., +91XXXXXXXXXX)');
      return;
    }

    try {
      const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });

      const result = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      setConfirmationResult(result);
      setShowOtpField(true);
      console.log('OTP Sent');
    } catch (error) {
      console.error('OTP Send Error:', error);
      setError('Failed to send OTP. Please check the phone number format.');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;
      console.log('Phone Sign-In Success:', user);
      setError('');
    } catch (error) {
      console.error('OTP Verification Error:', error);
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {!showOtpField ? (
        <>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter Phone Number (e.g., +911234567890)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent placeholder-gray-400"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">+</span>
          </div>
          <button
            onClick={handleSendOtp}
            className="w-full py-2 px-4 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 transition-all"
          >
            Send OTP
          </button>
        </>
      ) : (
        <>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent placeholder-gray-400"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">OTP</span>
          </div>
          <button
            onClick={handleVerifyOtp}
            className="w-full py-2 px-4 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 transition-all"
          >
            Verify OTP
          </button>
        </>
      )}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default PhoneSign;

*/