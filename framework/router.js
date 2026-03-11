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
    // Array to store all registered routes
    this.routes = [];
  }

  /**
   * Registers a new route.
   * @param {string} method - HTTP method (e.g., 'GET', 'POST')
   * @param {string} path - URL path (can include parameters prefixed with ':')
   * @param {function} handler - Callback function to handle the request
   */
  register(method, path, handler) {
    this.routes.push({
      method,
      path,
      handler,
    });
  }

  /**
   * Attempts to match a registered route path against an actual request path.
   * Supports dynamic route parameters (e.g., '/users/:id').
   * @param {string} routePath - The registered route path
   * @param {string} requestPath - The actual request path
   * @returns {object|null} - An object containing extracted parameters if match succeeds, otherwise null
   */
  matchRoute(routePath, requestPath) {
    // Split both paths into segments
    const routeParts = routePath.split('/');
    const requestParts = requestPath.split('/');

    // If segment counts differ, paths cannot match
    if (routeParts.length !== requestParts.length) {
      return null;
    }

    const params = {};

    // Compare each segment
    for (let i = 0; i < routeParts.length; i++) {
      const routePart = routeParts[i];
      const requestPart = requestParts[i];

      // If the route part starts with ':', treat it as a parameter
      if (routePart.startsWith(':')) {
        const paramName = routePart.slice(1); // Remove the ':'
        params[paramName] = requestPart; // Store the actual value
      } else if (routePart !== requestPart) {
        // Static segments must match exactly, otherwise fail
        return null;
      }
    }

    // Return the collected parameters on successful match
    return params;
  }

  /**
   * Handles an incoming HTTP request by finding and executing the matching route handler.
   * @param {http.IncomingMessage} req - The request object
   * @param {http.ServerResponse} res - The response object
   */
  handle(req, res) {
    const { method, path } = req;

    // Iterate through registered routes
    for (const route of this.routes) {
      // Skip routes with a different HTTP method
      if (route.method !== method) continue;

      // Attempt to match the path
      const params = this.matchRoute(route.path, path);

      if (params) {
        // If match succeeds, attach parameters to the request object
        req.params = params;
        // Execute the route handler
        route.handler(req, res);
        return; // Stop processing after first match
      }
    }

    // No matching route found; send a 404 response
    res.writeHead(404);
    res.end('Route not found');
  }
}

module.exports = Router;
