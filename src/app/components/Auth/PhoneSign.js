// src/app/components/Auth/PhoneSign.js
'use client';

import { useState } from 'react';
import { auth, signInWithPhoneNumber, RecaptchaVerifier } from '../../firebase/firebase';

const PhoneSign = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [showOtpField, setShowOtpField] = useState(false);

  const handleSendOtp = async () => {
    try {
      const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible', // or 'normal' for visible reCAPTCHA
      });
      const result = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      setConfirmationResult(result);
      setShowOtpField(true);
      console.log('OTP Sent');
    } catch (error) {
      console.error('OTP Send Error:', error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;
      console.log('Phone Sign-In Success:', user);
    } catch (error) {
      console.error('OTP Verification Error:', error);
    }
  };

  return (
    <div className="space-y-4">
      {!showOtpField ? (
        <>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter Phone Number"
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