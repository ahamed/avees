/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'bn'],
    defaultLocale: 'bn',
  },
  trailingSlash: true,
};

module.exports = nextConfig;
