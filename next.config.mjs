import 'dotenv/config'; // Load .env.local automatically

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY, // Expose API Key to Next.js
  },
};

export default nextConfig;
