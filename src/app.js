const express = require("express");
const rootRoute = require("./routes/root.route");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();

app.use(express.json());

app.use("/", rootRoute);

app.use(errorMiddleware);

module.exports = app;
