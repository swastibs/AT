const { ValidationError } = require("express-validation");

const chalk = require("chalk");
const AppError = require("../utils/AppError");
const { NODE_ENV } = require("../config/envConfig");

const errorHandler = (err, req, res, next) => {
  if (NODE_ENV === "development") {
    console.error(chalk.red.bold("\n❌ Error:"));
    console.error(chalk.red(`  ${err.message || "Unknown error"}`));

    if (err instanceof ValidationError) {
      const messages = err.details?.body?.map((d) => d.message) || [];
      console.error(chalk.yellow("  Validation errors:"), messages);
    }
  } else {
    console.error(chalk.red(`❌ ${err.message || "Internal Server Error"}`));
  }

  const buildErrorResponse = (message, statusCode, errors = null) => {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
      pagination: null,
    });
  };

  if (err instanceof ValidationError) {
    const messages = err.details?.body?.map((detail) => detail.message) || [];
    return buildErrorResponse(
      "Validation Error",
      err.statusCode || 400,
      messages,
    );
  }

  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return buildErrorResponse("Validation Error", 400, errors);
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return buildErrorResponse(`${field} already exists`, 409);
  }

  if (err.name === "CastError") {
    return buildErrorResponse(`Invalid ${err.path}: ${err.value}`, 400);
  }

  if (err.name === "JsonWebTokenError") {
    return buildErrorResponse("Invalid token. Please log in again.", 401);
  }

  if (err.name === "TokenExpiredError") {
    return buildErrorResponse(
      "Your session has expired. Please log in again.",
      401,
    );
  }

  if (err instanceof AppError) {
    return buildErrorResponse(err.message, err.statusCode);
  }

  const statusCode = err.statusCode || 500;
  const message =
    NODE_ENV === "production"
      ? "Something went wrong on the server"
      : err.message || "Internal Server Error";

  return buildErrorResponse(message, statusCode);
};

module.exports = errorHandler;
