/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig = {
  // Remove external packages since we're not using Genkit anymore
};

module.exports = withNextIntl(nextConfig);
