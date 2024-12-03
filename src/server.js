const app = require("./app");
const appConfig = require("./config/app.config");
const connectDB = require("./config/db.config");

const BASE_URL = appConfig.server.baseUrl;
const PORT = appConfig.server.port;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on ${BASE_URL}:${PORT}`);
  });
});
