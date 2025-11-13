/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false
  },
  // Desativa completamente o Turbopack
  webpack: (config) => {
    return config;
  }
}

module.exports = nextConfig