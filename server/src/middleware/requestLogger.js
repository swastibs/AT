const logger = require("../utils/logger");
const crypto = require("crypto");

const generateRequestId = () => crypto.randomBytes(8).toString("hex");

const requestLogger = (req, res, next) => {
  req.requestId = req.headers["x-request-id"] || generateRequestId();
  res.setHeader("X-Request-Id", req.requestId);

  const start = Date.now();

  logger.info(`➡️ ${req.method} ${req.url}`, {
    requestId: req.requestId,
    ip: req.ip || req.connection?.remoteAddress,
  });

  res.on("finish", () => {
    const duration = Date.now() - start;
    const level =
      res.statusCode >= 500 ? "error" : res.statusCode >= 400 ? "warn" : "info";

    logger.log(
      level,
      `⬅️ ${req.method} ${req.url} → ${res.statusCode} (${duration}ms)`,
      {
        requestId: req.requestId,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
      },
    );
  });

  next();
};

module.exports = requestLogger;
