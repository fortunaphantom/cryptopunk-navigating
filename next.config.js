/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

const path = require('path')

module.exports = nextConfig

module.exports = {
  /* Add Your Scss File Folder Path Here */
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles'), path.join(__dirname, 'components')],
  },
}

const withImages = require('next-images')
module.exports = withImages()