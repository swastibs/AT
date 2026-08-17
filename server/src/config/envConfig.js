require("dotenv").config();

const PORT = process.env.PORT || 8080;
MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/atomictask";
REDIS_HOST = process.env.REDIS_HOST || "127.0.0.1";
REDIS_PORT = process.env.REDIS_PORT || 6379;

module.exports = { PORT, MONGO_URI };
