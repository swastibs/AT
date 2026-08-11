const chalk = require("chalk");
const User = require("../model/User.model");
const { successResponse, errorResponse } = require("../utils/response");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 409, "Email already exists");
    }

    const user = await User.create({ name, email, password });

    const userResponse = user.toObject();
    delete userResponse.password;

    return successResponse(res, {
      statusCode: 201,
      message: "User created successfully",
      data: { user: userResponse },
    });
  } catch (error) {
    console.error(chalk.red("Error:", error.message));
    return errorResponse(res, 500, "Internal server error");
  }
};
