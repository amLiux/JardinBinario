/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['swiper', 'ssr-window', 'dom7'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
  },
};

export default nextConfig;

