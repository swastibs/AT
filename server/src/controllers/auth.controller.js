const jwt = require("jsonwebtoken");

const catchAsync = require("../utils/catchAsync");
const { successResponse, createdResponse } = require("../utils/response");
const User = require("../models/User.model");
const AppError = require("../utils/AppError");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../config/envConfig");

const signToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new AppError("Email already registered", 409);

  const user = await User.create({ name, email, password });
  user.password = undefined;

  const token = signToken(user._id);

  return createdResponse(res, "User registered successfully", { user, token });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password)))
    throw new AppError("Invalid email or password", 401);

  user.password = undefined;

  const token = signToken(user._id);

  return successResponse(res, "User logged in successfully", { user, token });
});
