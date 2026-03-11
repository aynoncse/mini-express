/**
 * Enhances an HTTP request object by parsing the URL and body.
 * Adds `path`, `query`, and `body` properties to the request object.
 *
 * @module enhanceRequest
 * @author Aynon Bhuiyan <aynoncse@gmail.com>
 * @created 2026-03-11
 *
 * @param {http.IncomingMessage} req - The original request object.
 */

function enhanceRequest(req) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  req.path = url.pathname;
  req.query = Object.fromEntries(url.searchParams.entries());
  return req;
}

module.exports = enhanceRequest;
