/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@game-portal/constants", "@game-portal/types"],
  reactStrictMode: true,
};

module.exports = nextConfig;
