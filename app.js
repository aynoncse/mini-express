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

const app = createApp();

app.use((err, req, res, next) => {
  console.error(err.message);

  res.status(500).json({
    message: 'Server error',
    error: err.message,
  });
});

app.use((req, res, next) => {
  console.log('Middleware 1');
  next();
});

app.use((err, req, res, next) => {
  console.error(err.message);

  res.status(500).json({
    message: 'Server error',
    error: err.message,
  });
});

app.use((req, res, next) => {
  console.log('Middleware 2');
  next();
});

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.get('/about', (req, res) => {
  res.send('About Page');
});

app.get('/users', (req, res) => {
  console.log(req.query);

  res.json({
    message: 'Users endpoint',
    query: req.query,
  });
});

app.get('/api', (req, res) => {
  res.json({
    name: 'Aynon',
    role: 'Backend Developer',
  });
});

app.post('/users', (req, res) => {
  console.log(req.body);

  res.json({
    message: 'User received',
    body: req.body,
  });
});

app.get('/users/:id', (req, res) => {
  res.json({
    message: 'User details',
    params: req.params,
  });
});

app.get('/posts/:postId/comments/:commentId', (req, res) => {
  res.json(req.params);
});

app.get('/error', (req, res) => {
  throw new Error('Something went wrong');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
