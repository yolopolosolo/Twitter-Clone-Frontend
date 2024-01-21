/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"avatars.githubusercontent.com",
      },
      {
        protocol:"https",
        hostname:"lh3.googleusercontent.com",
      },
      {
        protocol:"https",
        hostname:"twitter--sarvesh-dev.s3.ap-south-1.amazonaws.com"
      }
  ],
  },
}

module.exports = nextConfig
