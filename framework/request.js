/**
 * Enhances an HTTP request object by parsing the URL and body.
 * Adds `path`, `query`, and `body` properties to the request object.
 * The `callback` is invoked once the request body has been fully processed.
 *
 * @module enhanceRequest
 * @author Aynon Bhuiyan <aynoncse@gmail.com>
 * @created 2026-03-11
 *
 * @param {http.IncomingMessage} req - The original request object.
 * @param {function} callback - Function to call after body parsing is complete.
 */
function enhanceRequest(req, callback) {
  // Construct full URL using the request URL and host header to support query parsing
  const url = new URL(req.url, `http://${req.headers.host}`);

  // Attach the pathname (without query string) to the request object
  req.path = url.pathname;

  // Convert URLSearchParams to a plain object and attach as req.query
  req.query = Object.fromEntries(url.searchParams.entries());

  // --- Body parsing ---
  // Accumulate raw data chunks
  let chunks = [];

  req.on('data', (chunk) => {
    chunks.push(chunk);
  });

  req.on('end', () => {
    if (chunks.length > 0) {
      // Concatenate all chunks into a single buffer and convert to string
      const raw = Buffer.concat(chunks).toString();

      // Attempt to parse the body as JSON; fallback to raw string on failure
      try {
        req.body = JSON.parse(raw);
      } catch {
        req.body = raw;
      }
    } else {
      // No body data – default to an empty object
      req.body = {};
    }

    // Continue processing the request (next middleware / route handler)
    callback();
  });
}

module.exports = enhanceRequest;
