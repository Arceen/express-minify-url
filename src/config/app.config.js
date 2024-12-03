const dotenv = require("dotenv");

dotenv.config();

const DEFAULT_PORT = 8000;

const config = {
  server: {
    port: process.env.PORT || DEFAULT_PORT,
    environment: process.env.NODE_ENV || "development",
    baseUrl: process.env.BASE_URL || `http://localhost`,
  },
  database: {
    mongoDbConnectionString:
      process.env.MONGO_URI || "mongodb://localhost:27017/url-shortener",
  },
  vars: {
    // should always get the salt from .env
    salt: process.env.SALT_ROUNDES || 12,
  },
};

module.exports = config;
