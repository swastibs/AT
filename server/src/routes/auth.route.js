const authRouter = require("express").Router();
const { validate } = require("express-validation");
const { signup } = require("../controllers/auth.controller.js");
const { signupSchema } = require("../validations/auth.validation");

authRouter.post(
  "/signup",
  validate(signupSchema, {}, { abortEarly: false }),
  signup,
);

module.exports = authRouter;
