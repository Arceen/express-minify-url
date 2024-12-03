const miniUrlRouter = require("express").Router();
const miniUrlController = require("../../controllers/miniUrl.controller");
const validationMiddlware = require("../../middleware/validation.middleware");

miniUrlRouter.get(
  "/:miniUrl",
  //   validationMiddlware,
  miniUrlController.getOriginal
);
miniUrlRouter.post("/", miniUrlController.getMinified);

module.exports = miniUrlRouter;
