// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    'https://api.nsaccto.com', // the endpoint you want to proxy
    createProxyMiddleware({
      target: 'https://api.nsaccto.com/api', // the domain you want to proxy to
      changeOrigin: true,
    })
  );
};
