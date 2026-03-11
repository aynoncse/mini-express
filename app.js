/**
 * Main application entry point.
 *
 * @module app
 * @author Aynon Bhuiyan <aynoncse@gmail.com>
 * @created 2026-03-11
 */
const createApp = require('./framework/application');

const app = createApp();

app.use((req, res, next) => {
  console.log('Middleware 1');
  next();
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

app.get('/error', (req, res) => {
  res.status(404).send('Not Found');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});