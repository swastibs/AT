const express = require("express");
const logger = require("morgan");
const { ValidationError } = require("express-validation");
const passport = require("passport");

const dbConnect = require("./src/config/db");
require("./src/config/redis");
const router = require("./src/routes/index.route");
const errorHandler = require("./src/middlewares/errorHandler");
require("./src/config/passport")(passport);

const app = express();
dbConnect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(passport.initialize());

app.use(router);

app.use(errorHandler);

module.exports = app;
