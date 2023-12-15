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
    domains: [
      "lh3.googleusercontent.com",
      "localhost",
      "avatar.vercel.sh",
      "https://avatar.vercel.sh/leerob",
    ],
  },
};

module.exports = nextConfig;
