require("dotenv").config();

const PORT = process.env.PORT || 8080;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/at";
const REDIS_HOST = process.env.REDIS_HOST || "127.0.0.1";
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const NODE_ENV = process.env.NODE_ENV || "development";

module.exports = { PORT, MONGO_URI, REDIS_HOST, REDIS_PORT, NODE_ENV };
