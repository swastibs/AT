const mongoose = require("mongoose");
const { MONGO_URI } = require("./envConfig");
const chalk = require("chalk");

const dbConnect = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(chalk.blue("Database connected"));
  } catch (error) {
    console.log(chalk.red.bold("Database connection failed"), error);
    process.exit(1);
  }
};

module.exports = dbConnect;
