const express = require("express");

const apiRouter = require("./src/routes/index.route");
const connectDB = require("./src/config/db");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api", apiRouter);

module.exports = app;
