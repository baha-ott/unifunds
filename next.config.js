/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/landing",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["lh3.googleusercontent.com", "localhost"],
  },
};

module.exports = nextConfig;
