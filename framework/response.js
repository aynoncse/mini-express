/**
 * Enhances a Node.js HTTP response object with additional utility methods.
 * This function mutates the provided response object by attaching `send`, `json`, and `status` methods.
 *
 * @module enhanceResponse
 * @author Aynon Bhuiyan <aynoncse@gmail.com>
 * @created 2026-03-11
 *
 * @param {http.ServerResponse} res - The original response object to enhance.
 * @returns {void} The function modifies the object in place and does not return anything.
 */
function enhanceResponse(res) {
  /**
   * Sends a response. If the provided data is an object, it sets the Content-Type header to
   * 'application/json', stringifies the data, and ends the response.
   * For non‑object data, it ends the response with the data as plain text.
   *
   * @param {any} data - The data to send. Objects are stringified, others are sent as text.
   */
  res.send = (data) => {
    if (res.headersSent) return;
    if (typeof data === 'object') {
      res.setHeader('Content-Type', 'application/json');
      data = JSON.stringify(data);
    }
    if (data === undefined) data = '';
    res.end(data);
  };

  /**
   * Sends a JSON response. Sets the Content-Type header to 'application/json',
   * stringifies the provided data, and ends the response.
   *
   * @param {any} data - The data to be JSON‑encoded and sent.
   */
  res.json = (data) => {
    if (res.headersSent) return;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  };

  /**
   * Sets the HTTP status code for the response and returns the response object itself
   * to allow method chaining (e.g., `res.status(404).send('Not Found')`).
   *
   * @param {number} code - The HTTP status code to set.
   * @returns {http.ServerResponse} The enhanced response object (for chaining).
   */
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
}

module.exports = enhanceResponse;
