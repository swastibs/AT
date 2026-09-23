import http from "http";
import app from "./src/app.js";
import { PORT } from "./src/shared/config/envConfig.js";
import connectDB from "./src/shared/config/db.js";
import chalk from "chalk";

function main() {
  const server = http.createServer(app);

  connectDB();

  server.listen(PORT, () => {
    console.log(
      chalk.blueBright.bold(`Server is running on http://localhost:${PORT}`),
    );
    chalk;
  });
}

main();
