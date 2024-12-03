const express = require("express");
const miniUrlRouter = require("./miniUrl/miniUrl.route");
const router = express.Router();

// currently redundant root route
// but necessary for scaling
router.use(miniUrlRouter);

module.exports = router;
