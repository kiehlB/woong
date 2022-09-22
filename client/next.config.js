/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    REACT_APP_API_HOST: process.env.REACT_APP_API_HOST,
  },
};

module.exports = nextConfig;
