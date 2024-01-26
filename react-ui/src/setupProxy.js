// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    'https://api.nsacto.com', // the endpoint you want to proxy
    createProxyMiddleware({
      target: 'https://api.nssacto.com/api', // the domain you want to proxy to
      changeOrigin: true,
    })
  );
};
