const crypto = require("crypto");
// const config = require("../config/app.config");

// const saltRounds = parseInt(config.vars.salt) || 10;

// A-Za-z0-9
function toBase62(num) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  while (num > 0n) {
    result = chars[Number(num % 62n)] + result;
    num = num / 62n;
  }
  return result;
}

function minifyStrategy(input, length = 6) {
  const hash = crypto.createHash("sha256").update(input).digest("hex");
  const num = BigInt(`0x${hash}`);
  const base62Key = toBase62(num);
  return base62Key.slice(0, length);
}

// Strategy full discussion in readme.md (Section 1 & 4)
// should use a document database for persistant storage
// map for better performance for entry instead of objects
const miniToOriginalMap = new Map();

const miniUrlService = {
  getOriginalUrl: (minifiedUrl) => {
    return miniToOriginalMap.get(minifiedUrl);
  },

  getMinifiedUrl: async (originalUrl) => {
    let strategyUrl = originalUrl;
    let minifiedUrl;
    while (true) {
      minifiedUrl = await minifyStrategy(strategyUrl, 6);
      if (
        minifiedUrl.length === 6 ||
        !miniToOriginalMap.has(minifiedUrl) ||
        miniToOriginalMap.get(minifiedUrl) === originalUrl
      ) {
        // the key is unique or the originalUrl was again inputted
        // in both cases just return the values
        break;
      }
      console.log("looping");
      const timestamp = Date.now().toString();
      strategyUrl = originalUrl + timestamp;
    }
    miniToOriginalMap.set(minifiedUrl, originalUrl);
    return minifiedUrl;
  },
};

module.exports = miniUrlService;
