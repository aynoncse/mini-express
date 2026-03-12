/**
 * Main application entry point.
 * This file demonstrates the usage of the custom framework (createApp)
 * by setting up middleware, defining routes, and starting the server.
 *
 * @module app
 * @author Aynon Bhuiyan <aynoncse@gmail.com>
 * @created 2026-03-11
 */
const createApp = require('./framework/application');

// Import routes
const usersRouter = require('./routes/users');

// Create an instance of the application
const app = createApp();

app.static('./public');

/**
 * Regular middleware 1.
 * Executes for every request, logs a message, and passes control to the next middleware.
 */
app.use((req, res, next) => {
  console.log('Middleware 1');
  next();
});

/**
 * Regular middleware 2.
 * Also logs a message and continues the middleware chain.
 */
app.use((req, res, next) => {
  console.log('Middleware 2');
  next();
});

// ==================== Route Definitions ====================

/**
 * GET /
 * Responds with a simple text message for the home page.
 */
app.get('/', (req, res) => {
  res.send('Home Page');
});

/**
 * GET /about
 * Responds with a simple text message for the about page.
 */
app.get('/about', (req, res) => {
  res.send('About Page');
});

app.use('/users', usersRouter);

/**
 * GET /api
 * Returns a JSON object with developer information.
 */
app.get('/api', (req, res) => {
  res.json({
    name: 'Aynon',
    role: 'Backend Developer',
  });
});


/**
 * GET /posts/:postId/comments/:commentId
 * Demonstrates multiple dynamic parameters.
 * Responds with the extracted parameters object.
 */
app.get('/posts/:postId/comments/:commentId', (req, res) => {
  res.json(req.params);
});

/**
 * GET /error
 * Intentionally throws an error to test error-handling middleware.
 * This error will be caught by the error-handling middleware registered below.
 */
app.get('/error', (req, res) => {
  throw new Error('Something went wrong');
});

/**
 * Error-handling middleware.
 * Registered after all routes and regular middleware.
 * Catches any errors that occur during request processing (thrown or passed via next(error)).
 * Sends a 500 response with the error message in JSON format.
 */
app.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Server error',
    error: err.message,
  });
});

// ==================== Start Server ====================

/**
 * Starts the HTTP server on port 3000 and logs a message when ready.
 */
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
