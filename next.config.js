const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
})

module.exports = withPWA({
  // config
  output: 'export',
  fallback: "blocking",
  assetPrefix: isProd ? 'https://maysam.github.io/praypal/' : undefined,
})
