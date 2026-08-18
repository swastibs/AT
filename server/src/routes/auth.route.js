const authRouter = require("express").Router();
const { validate } = require("express-validation");
const { signup, login, logout } = require("../controllers/auth.controller.js");
const { protect } = require("../middlewares/auth");
const { signupSchema, loginSchema } = require("../validations/auth.validation");

authRouter.post(
  "/signup",
  validate(signupSchema, {}, { abortEarly: false }),
  signup,
);

authRouter.post(
  "/login",
  validate(loginSchema, {}, { abortEarly: false }),
  login,
);

authRouter.post("/logout", protect, logout);

module.exports = authRouter;
