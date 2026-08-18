const express = require("express");
const logger = require("morgan");
const { ValidationError } = require("express-validation");

const dbConnect = require("./src/config/db");
require("./src/config/redis");
const router = require("./src/routes/index.route");
const errorHandler = require("./src/middlewares/errorHandler");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect();

app.use(logger("dev"));

app.use(router);

app.use(errorHandler);

module.exports = app;
