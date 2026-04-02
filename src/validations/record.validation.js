const Joi = require("joi");

const createRecordSchema = Joi.object({
  amount: Joi.number().required(),
  type: Joi.string().valid("income", "expense").required(),
  category: Joi.string().required().trim(),
  date: Joi.date().iso().required(),
  notes: Joi.string().optional().allow(""),
});

const updateRecordSchema = Joi.object({
  amount: Joi.number().optional(),
  type: Joi.string().valid("income", "expense").optional(),
  category: Joi.string().optional().trim(),
  date: Joi.date().iso().optional(),
  notes: Joi.string().optional().allow(""),
});

module.exports = {
  createRecordSchema,
  updateRecordSchema,
};
