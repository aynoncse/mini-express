/**
 * Main application entry point.
 *
 * @module app
 * @author Aynon Bhuiyan <aynoncse@gmail.com>
 * @created 2026-03-11
 */

const createApp = require('./framework/application');

const app = createApp();

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
