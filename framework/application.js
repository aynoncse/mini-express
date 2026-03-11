/**
 * Express-like application factory.
 * Creates an HTTP server.
 *
 * @module Router
 * @author Aynon Bhuiyan <aynoncse@gmail.com>
 * @created 2026-03-11
 */

const http = require('http');

function createApp() {
  function app(req, res) {
    res.end('Server working');
  }

  app.listen = (port, callback) => {
    const server = http.createServer(app);

    server.listen(port, callback);
  };

  return app;
}

module.exports = createApp;
