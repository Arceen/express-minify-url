const mongoose = require("mongoose");
const config = require("./app.config");
const connectDB = async () => {
  try {
    await mongoose.connect(config.database.mongoDbConnectionString);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

module.exports = connectDB;
