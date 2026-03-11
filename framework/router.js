/**
 * A simple router class for handling HTTP requests.
 * It allows registering routes with specific HTTP methods and paths,
 * and matches incoming requests to the appropriate handler.
 *
 * @module Router
 * @author Aynon Bhuiyan <aynoncse@gmail.com>
 * @created 2026-03-11
 */
class Router {
  constructor() {
    this.routes = [];
  }

  register(method, path, handler) {
    this.routes.push({
      method,
      path,
      handler,
    });
  }

  handle(req, res) {
    const { method, path } = req;

    const route = this.routes.find(
      (route) => route.method === method && route.path === path,
    );

    if (route) {
      route.handler(req, res);
    } else {
      res.writeHead(404);
      res.end('Route not found');
    }
  }
}

module.exports = Router;