import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  MONGODB: Joi.string(),
  PORT: Joi.number().default(3000),
  DEFAULT_LIMIT: Joi.number().default(10),
  SWAGGER_UPDATE: Joi.boolean().default(false),
});
