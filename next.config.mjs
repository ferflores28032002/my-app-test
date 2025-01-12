/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'hiresprintcanvas.dreamhosters.com',
            pathname: '/products/**',
          },
        ],
      },
};

export default nextConfig;
