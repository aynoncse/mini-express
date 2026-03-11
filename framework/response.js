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
  res.send = (data) => {
    if (typeof data === 'object') {
      res.setHeader('Content-Type', 'application/json');
      data = JSON.stringify(data);
    } else {
      res.end(data);
    }
  };

  res.json = (data) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  };

  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
}

module.exports = enhanceResponse;