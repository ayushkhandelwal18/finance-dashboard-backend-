const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().required().trim(),
  email: Joi.string().email().required().trim(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("viewer", "analyst", "admin").optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().trim(),
  password: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
