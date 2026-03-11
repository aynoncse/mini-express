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
function enhanceRequest(req, callback) {
  const url = new URL(req.url, `http://${req.headers.host}`);

  req.path = url.pathname;

  req.query = Object.fromEntries(url.searchParams.entries());

  // parse body
  let chunks = [];

  req.on('data', (chunk) => {
    chunks.push(chunk);
  });

  req.on('end', () => {
    if (chunks.length > 0) {
      const raw = Buffer.concat(chunks).toString();

      try {
        req.body = JSON.parse(raw);
      } catch {
        req.body = raw;
      }
    } else {
      req.body = {};
    }

    callback();
  });
}

module.exports = enhanceRequest;
