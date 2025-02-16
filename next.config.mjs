import 'dotenv/config'; // Load .env.local automatically

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // This enables static export (needed for Firebase Hosting)
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY, // Expose API Key to Next.js
  },
};

export default nextConfig;
