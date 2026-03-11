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

function createApp() {
  const router = new Router();
  function app(req, res) {
    router.handle(req, res);
  }

  app.get = (path, handler) => {
    router.register('GET', path, handler);
  };

  app.listen = (port, callback) => {
    const server = http.createServer(app);
    server.listen(port, callback);
  };

  return app;
}

module.exports = createApp;