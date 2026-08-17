const Redis = require("ioredis");

const { REDIS_HOST, REDIS_PORT } = require("./envConfig");
const chalk = require("chalk");

const redis = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT,
});

redis.on("error", (error) => {
  console.log(chalk.red.bold("Redis connection failed"), error);
  process.exit(1);
});

redis.on("connect", () => {
  console.log(chalk.green("Redis connected"));
});

module.exports = redis;
