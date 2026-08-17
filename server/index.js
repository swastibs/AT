const http = require("http");
const chalk = require("chalk");

const { PORT } = require("./src/config/envConfig");

const app = require("./app");
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(chalk.blue.bold(`Server is running on http://localhost:${PORT}`));
});
