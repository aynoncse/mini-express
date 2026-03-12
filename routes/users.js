/**
 * Defines the `users` router and its associated routes.
 *
 * This module demonstrates how to build a simple router using the
 * framework's `createRouter` helper. Two GET routes are provided:
 * The exported `router` can be mounted by the main application with
 * `app.use('/users', require('./routes/users'))` or a similar mechanism.
 *
 * @module routes/users
 * @author Aynon Bhuiyan <aynoncse@gmail.com>
 * @created 2026-03-12
 */

const createRouter = require("../framework/createRouter");
const router = createRouter();

// respond with a static list placeholder
router.get("/", (req, res) => {
    res.send("users list");
});

// return the ID provided in the route as JSON
router.get('/:id', (req, res) => {
  res.json({
    userId: req.params.id,
  });
});

module.exports = router;