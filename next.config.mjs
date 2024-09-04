/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['flagcdn.com','upload.wikimedia.org'],// Add the domain of the image
  },
};

export default nextConfig;
