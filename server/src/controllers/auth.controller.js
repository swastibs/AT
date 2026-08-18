const catchAsync = require("../utils/catchAsync");
const { successResponse, createdResponse } = require("../utils/response");
const User = require("../models/User.model");
const AppError = require("../utils/AppError");

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new AppError("Email already registered", 409);

  const user = await User.create({ name, email, password });
  // user.password = undefined;

  return createdResponse(res, "User registered successfully", user);
});
