const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
})

module.exports = withPWA({
  // config
  output: 'export',
  assetPrefix: isProd ? 'https://praypal.codehospital.com/' : undefined,
})
