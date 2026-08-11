const express = require("express");
const apiRouter = require("./src/routes/index.route");
const connectDB = require("./src/config/db");
const { errorResponse } = require("./src/utils/response");
const requestLogger = require("./src/middleware/requestLogger");
const logger = require("./src/utils/logger");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

connectDB();

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  logger.error("Global error:", {
    requestId: req.requestId,
    error: err.message,
    stack: err.stack,
    statusCode: err.statusCode,
  });

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";
  let errors = null;

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
    errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }

  if (err.code === 11000) {
    statusCode = 409;
    message = "Duplicate key error";
    const field = Object.keys(err.keyPattern)[0];
    errors = [{ field, message: `${field} already exists` }];
  }

  return errorResponse(res, statusCode, message, errors);
});

module.exports = app;
