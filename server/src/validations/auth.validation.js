const { Joi } = require("express-validation");

const signupSchema = {
  body: Joi.object({
    name: Joi.string().trim().required().messages({
      "string.empty": "Name is required",
      "any.required": "Name is required",
    }),
    email: Joi.string().trim().email().lowercase().required().messages({
      "string.empty": "Email is required",
      "string.email": "Please provide a valid email address",
    }),
    password: Joi.string().min(4).max(16).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 4 characters long",
      "string.max": "Password must be at most 16 characters long",
    }),
  }).default({}),
};

module.exports = { signupSchema };
