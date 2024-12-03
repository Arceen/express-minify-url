const { standardErrorMessage } = require("../utils/responseMessage");
const { validMiniUrl } = require("../utils/regex");

// Put this before any mini urls logic to see if it matches our agreed pattern
const validationMiddlware = (req, res, next) => {
  const url = req.params.miniUrl;
  if (!validMiniUrl(url)) {
    return standardErrorMessage(res, 400, "Invalid Mini URL!");
  }
  next();
};
module.exports = validationMiddlware;
