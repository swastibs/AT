const winston = require("winston");
const path = require("path");
const fs = require("fs");

const logDir = path.join(__dirname, "../../logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

const consoleFormat = winston.format.printf(
  ({ timestamp, level, message, requestId, ...meta }) => {
    let logLine = `${timestamp} ${level}:`;
    if (requestId) logLine += ` [${requestId.substring(0, 8)}]`;

    logLine += ` ${message}`;

    const metaKeys = Object.keys(meta);
    if (metaKeys.length) {
      if (meta.service) delete meta.service;

      const metaStr = metaKeys
        .map((key) => {
          let value = meta[key];
          if (typeof value === "object") {
            value = JSON.stringify(value, null, 2);
          }
          return `  ${key}: ${value}`;
        })
        .join("\n");
      logLine += "\n" + metaStr;
    }
    return logLine;
  },
);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
  ),
  defaultMeta: { service: "my-api" },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        consoleFormat,
      ),
    }),

    new winston.transports.File({
      filename: path.join(logDir, "combined.log"),
      format: winston.format.json(),
      maxsize: 10 * 1024 * 1024,
      maxFiles: 5,
    }),

    new winston.transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
      format: winston.format.json(),
      maxsize: 10 * 1024 * 1024,
      maxFiles: 5,
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(logDir, "exceptions.log"),
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(logDir, "rejections.log"),
    }),
  ],
});

module.exports = logger;
