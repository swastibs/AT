import mongoose from "mongoose";
import { MONGO_URI } from "./envConfig.js";
import chalk from "chalk";

const connectDB = () => {
  try {
    const conn = mongoose.connect(MONGO_URI);
    console.log(chalk.blueBright(`DB Connected Successfully`));
  } catch (error) {
    console.error(chalk.red(`Error: ${error.message}`));
    process.exit(1);
  }
};

export default connectDB;
