const Redis = require("ioredis");
const { REDIS_HOST, REDIS_PORT } = require("./envConfig");
const chalk = require("chalk");

const redis = new Redis({
  host: REDIS_HOST,
  port: Number(REDIS_PORT),
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

redis.on("ready", () => {
  console.log(chalk.green("Redis connected"));
});

redis.on("error", (error) => {
  console.error(chalk.red.bold("Redis error:"), error);
});

module.exports = redis;
