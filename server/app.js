const express = require("express");
const dbConnect = require("./src/config/db");
const redis = require("./src/config/redis");

const app = express();

dbConnect();

module.exports = app;
