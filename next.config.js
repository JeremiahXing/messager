/** @type {import('next').NextConfig} */
const nextConfig = {
  future: {
    webpack5: false, // by default, if you customize webpack config, they switch back to version 4. 
      // Looks like backward compatibility approach.
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
        // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
    };
    return config;
  },
  reactStrictMode: true,
  images: {
    domains: [
      '1000logos.net',
      'i.pravatar.cc',
      'gravatar.com',
    ],
  },
  experimental: {
    appDir: true,
  },
  env: {
    UPSTASH_REDIS_URL: process.env.UPSTASH_REDIS_URL,
    PUSHER_CLIENT_KEY: process.env.PUSHER_CLIENT_KEY,
    PUSHER_SERVER_APPID: process.env.PUSHER_SERVER_APPID,
    PUSHER_SERVER_KEY: process.env.PUSHER_SERVER_KEY,
    PUSHER_SERVER_SECRET: process.env.PUSHER_SERVER_SECRET,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
}

module.exports = nextConfig
