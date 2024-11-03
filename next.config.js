/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate-plugin');

const nextConfig =  nextTranslate({
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  i18n: {
    localeDetection: false,
  }
});

module.exports = nextConfig;
