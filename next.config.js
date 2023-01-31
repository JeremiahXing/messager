/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      '1000logos.net',
      'i.pravatar.cc'
    ],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
