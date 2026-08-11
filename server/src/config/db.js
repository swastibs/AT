const mongoose = require("mongoose");
const { MONGO_URI } = require("./configEnv");
const chalk = require("chalk");

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(chalk.blueBright("MongoDB connected successfully."));
  } catch (error) {
    console.error(chalk.red.bold("MongoDB connection failed:", error.message));
    process.exit(1);
  }
};

module.exports = connectDB;
