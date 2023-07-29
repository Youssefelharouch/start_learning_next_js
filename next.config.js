/** @type {import('next').NextConfig} */
module.exports = {
  // output: 'export',
  images : {
    remotePatterns: [
      {
        protocol:'http',
        port: '1337',
        hostname:'localhost',
        pathname:'/uploads/**',

      },
    ],
  },
};