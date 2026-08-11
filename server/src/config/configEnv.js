require("dotenv").config();
const envalid = require("envalid");
const { str, port, bool, makeValidator } = envalid;

const mongoUri = makeValidator((value) => {
  const regex =
    /^(mongodb:\/\/|mongodb\+srv:\/\/)([^:]+:[^@]+@)?([^\/?]+)(\/[^?]*)?(\?.*)?$/;
  if (!regex.test(value)) {
    throw new Error("Invalid MongoDB URI format");
  }
  return value;
});

const env = envalid.cleanEnv(process.env, {
  PORT: port({ default: 8080 }),

  MONGO_URI: mongoUri({
    default: "mongodb://localhost:27017/at",
    desc: "MongoDB connection string",
  }),

  NODE_ENV: str({
    choices: ["development", "production", "test"],
    default: "development",
    desc: "Runtime environment",
  }),

  JWT_SECRET: str({
    desc: "JWT signing secret (required in production)",
    default: undefined,
  }),

  LOG_LEVEL: str({
    choices: ["error", "warn", "info", "debug"],
    default: process.env.NODE_ENV === "production" ? "info" : "debug",
    desc: "Logging level",
  }),

  ENABLE_LOGGING: bool({ default: true }),
});

module.exports = env;
