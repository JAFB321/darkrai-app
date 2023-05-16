const nodeIP = require('ip')

module.exports = {
  experimental: {
    newNextLinkBehavior: true,
    nextScriptWorkers: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true
  },
  env: {
    SERVER_API_IP: nodeIP.address(),
  },
};
