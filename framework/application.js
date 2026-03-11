/**
 * Express-like application factory.
 * Creates an HTTP server with middleware and routing support.
 *
 * @module Router
 * @author Aynon Bhuiyan <aynoncse@gmail.com>
 * @created 2026-03-11
 */

const http = require('http');
const Router = require('./router');
const enhanceResponse = require('./response');
const enhanceRequest = require('./request');
/**
 * Creates an Express-like application with middleware and routing support.
 * @returns {function} The app request handler with attached methods (.use, .get, .post, .listen)
 */

function createApp() {
  const router = new Router(); // Handles route registration and matching
  const middlewares = []; // Stack of normal middleware functions (req, res, next)
  const errorMiddlewares = []; // Stack of error-handling middleware functions (err, req, res, next)

  /**
   * The app request handler with attached methods (.use, .get, .post, .listen)
   * @description
   * This function is the main entry point for the Express-like application.
   * It takes an incoming HTTP request and response objects, and iterates through the middleware stack.
   * If an error occurs, it will attempt to call the next error-handling middleware in the stack.
   * If no error middleware is available, it will send a 500 response with an "Internal Server Error" message.
   * @param {http.IncomingMessage} req - The incoming request object
   * @param {http.ServerResponse} res - The response object
   */
  function app(req, res) {
    // Attach helper methods to response (e.g., res.json, res.send)
    enhanceResponse(res);

    // Attach helper methods to request (e.g., req.params, req.query) and start the chain
    enhanceRequest(req, () => {
      let i = 0; // Index for normal middlewares
      let errorIndex = 0; // Index for error middlewares

      /**
       * Middleware chain processor. Calls the next middleware or route handler.
       * If an error occurs, jumps to the next error-handling middleware.
       * @param {Error} [err] - Optional error passed from previous middleware
       * @returns {void}
       */
      function next(err) {
        if (err) {
          // Error occurred: invoke the next error middleware
          const errorMiddleware = errorMiddlewares[errorIndex++];

          if (errorMiddleware) {
            return errorMiddleware(err, req, res, next);
          }

          // No error middleware left: send 500
          res.statusCode = 500;
          return res.end('Internal Server Error');
        }

        // No error: invoke the next normal middleware
        const middleware = middlewares[i++];

        if (middleware) {
          return middleware(req, res, next);
        }

        // All normal middlewares executed; hand over to the router
        try {
          router.handle(req, res);
        } catch (error) {
          // Catch synchronous errors thrown in route handlers and pass to error chain
          next(error);
        }
      }

      next(); // Start the middleware chain
    });
  }

  /**
   * Registers a middleware function.
   * If the function has arity 4 (err, req, res, next), it is treated as error-handling middleware.
   * @param {function} middleware - The middleware function
   */
  app.use = function (middleware) {
    if (middleware.length === 4) {
      errorMiddlewares.push(middleware);
    } else {
      middlewares.push(middleware);
    }
  };

  /**
   * Registers a GET route.
   * @param {string} path - The route path (e.g., '/users/:id')
   * @param {function} handler - The route handler function (req, res)
   */
  app.get = (path, handler) => router.register('GET', path, handler);

  /**
   * Registers a POST route.
   * @param {string} path - The route path
   * @param {function} handler - The route handler function (req, res)
   */
  app.post = function (path, handler) {
    router.register('POST', path, handler);
  };

  /**
   * Starts an HTTP server using this app as the request listener.
   * @param {number} port - The port to listen on
   * @param {function} [callback] - Optional callback once server starts
   * @returns {http.Server} The created server instance
   */
  app.listen = (port, callback) => {
    const server = http.createServer(app);
    server.listen(port, callback);
  };

  return app;
}

module.exports = createApp;
