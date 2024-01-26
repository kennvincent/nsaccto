// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    'https://api.vincentsabelao.com', // the endpoint you want to proxy
    createProxyMiddleware({
      target: 'https://api.vincentsabelao.com/api/budget/view', // the domain you want to proxy to
      changeOrigin: true,
    })
  );
};
