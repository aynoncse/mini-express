# Mini Express Framework – Concept Overview

This project is a **lightweight, educational implementation** of a web framework inspired by Express.js. It is built from scratch using only Node.js core modules to demonstrate the fundamental principles behind modern web frameworks.

## 🎯 Purpose

The goal is to demystify how frameworks like Express work internally by recreating their core features:

- Handling HTTP requests and responses
- Routing based on HTTP methods and URL paths
- Middleware pipeline for request processing
- Convenience methods for sending responses

By understanding this minimal implementation, you gain insight into the **request-response lifecycle**, **middleware chaining**, and the **design patterns** used in production-grade frameworks.

## ✨ Features Implemented

- **HTTP Server** – Built with Node.js native `http` module.
- **Routing Table** – Routes are registered with method, path, and handler.
- **Dynamic Route Parameters** – URL segments like `:id` are extracted and made available via `req.params`.
- **Middleware Support** – Functions can be registered to process requests in sequence; error-handling middleware with signature `(err, req, res, next)` is also supported.
- **Response Helpers** – Enhanced response object with `.send()`, `.json()`, and `.status()` methods.
- **Request Helpers** – Parsed `req.query` and `req.body` (JSON or raw) are attached to the request object.

## 🧠 Core Concepts Learned

### 1. Request Lifecycle
When a request arrives, it flows through:
- Registered middleware (in order)
- Route matching (if no middleware terminates early)
- Error handling (if an error occurs)

This is managed by a simple `next()` function that controls the flow.

### 2. Middleware Chaining
Middleware functions are stored in arrays. The `next()` function advances the index and invokes the next middleware. Error-handling middleware are stored separately and only triggered when `next(err)` is called.

### 3. Routing Table
Routes are stored as objects containing `method`, `path`, and `handler`. On each request, the router iterates through the table, matches the path (including parameters), and executes the corresponding handler.

### 4. Response Abstraction
Native `http.ServerResponse` is augmented with chainable helper methods to simplify common tasks like sending JSON or setting status codes.

## 🏗️ Architecture Overview
    Client Request
            │
            ▼
    HTTP Server (http.createServer)
            │
            ▼
    Request Enhancer (parse URL, query, body)
            │
            ▼
    Middleware Chain (normal & error handlers)
            │
            ▼
    Router (match route → execute handler)
            │
            ▼
    Response Helpers (send, json, status)

## 📦 Core Node.js Modules Used

- `http` – Create the server and handle raw requests/responses.
- `url` – Parse request URLs and extract query parameters.
- `buffer` – Assemble request body chunks.

## 🚀 How to Use

```javascript
const createApp = require('./framework/application');
const app = createApp();

// Middleware
app.use((req, res, next) => {
  console.log('Middleware 1');
  next();
});

// Routes
app.get('/', (req, res) => res.send('Home Page'));
app.get('/users/:id', (req, res) => res.json({ userId: req.params.id }));

// Error handling
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(3000, () => console.log('Server running'));