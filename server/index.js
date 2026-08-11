const http = require("http");
const app = require("./app");
const { PORT } = require("./src/config/configEnv");
const chalk = require("chalk");

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(chalk.blue.bold(`Server is running on http://localhost:${PORT}`));
});
