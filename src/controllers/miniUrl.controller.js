const miniUrlService = require("../services/miniUrl.service");
const { validOriginalUrl } = require("../utils/regex");
const {
  standardErrorMessage,
  standardSuccessMessage,
} = require("../utils/responseMessage");

const miniUrlController = {
  getOriginal: async (req, res) => {
    console.log(req.params);
    try {
      const url = miniUrlService.getOriginalUrl(req.params.miniUrl);
      console.log(url);
      if (url) {
        return res.status(301).redirect(url);
      } else {
        throw Error("Internal Server Error");
      }
    } catch (error) {
      return standardErrorMessage(res, 400, "Internal Server Error!");
    }
  },

  getMinified: async (req, res) => {
    console.log(req.body);
    try {
      const { url } = req.body;
      console.log(url);
      if (!url) {
        console.log("Error");
        return standardErrorMessage(res, 400, "No Url Provided!");
      } else if (!validOriginalUrl(url)) {
        return standardErrorMessage(res, 400, "Invalid Url Provided!");
      }
      const minifiedUrl = await miniUrlService.getMinifiedUrl(url);
      console.log(minifiedUrl);
      return standardSuccessMessage(
        res,
        201,
        "URL Minification Successful!",
        minifiedUrl
      );
    } catch (error) {
      console.log(error);
      return standardErrorMessage(res, 500, "Internal Server Error!");
    }
  },
};
module.exports = miniUrlController;
