/**
 * Factory for creating a lightweight router handler.
 *
 * This module provides a thin wrapper around the internal `Router` class.
 * The returned object is actually a function that delegates to the router's
 * `.handle()` method, but also exposes convenience methods (`.get`, `.post`)
 * for registering routes using a familiar syntax.
 *
 * @module framework/createRouter
 * @author Aynon Bhuiyan <aynoncse@gmail.com>
 * @created 2026-03-12
 */

const Router = require('./router');

function createRouter() {
    // create an instance of the internal Router
    const router = new Router();

    // the main handler function that will be exposed to the caller
    function handler(req, res) {
        router.handle(req, res);
    }

    // add shorthand for registering GET routes
    handler.get = function (path, handler) {
        router.register('GET', path, handler);
    };

    // add shorthand for registering POST routes
    handler.post = function (path, handler) {
        router.register('POST', path, handler);
    };

    return handler;
}

module.exports = createRouter;