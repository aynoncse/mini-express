/**
 * Express-like application factory.
 * Creates an HTTP server.
 *
 * @module createApp
 * @author Aynon Bhuiyan <aynoncse@gmail.com>
 * @created 2026-03-11
 */
const http = require('http');
const Router = require('./router');
const enhanceResponse = require('./response');
const enhanceRequest = require('./request');

function createApp() {
  const router = new Router();
  const middlewares = [];

  function app(req, res) {
    // Add helpers to req and res
    enhanceRequest(req);
    enhanceResponse(res);

    let i = 0;
    function next() {
      const middleware = middlewares[i++];

      if (middleware) {
        middleware(req, res, next);
      } else {
        router.handle(req, res);
      }
    }

    next();
  }

  app.use = (middleware) => middlewares.push(middleware);

  app.get = (path, handler) => router.register('GET', path, handler);

  app.listen = (port, callback) => {
    const server = http.createServer(app);
    server.listen(port, callback);
  };

  return app;
}

module.exports = createApp;