const createRouter = require("../framework/createRouter");
const router = createRouter();

router.get("/", (req, res) => {
    res.send("users list");
});

router.get('/:id', (req, res) => {
  res.json({
    userId: req.params.id,
  });
});

module.exports = router;