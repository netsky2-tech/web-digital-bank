/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api-sandbox.lafise.com/:path*",
      },
    ];
  },
};

export default nextConfig;
