import Joi from 'joi'

export const ConfigSchema = Joi.object({
  PORT: Joi.number().optional().default(2000),
  NODE_ENV: Joi.string().optional().default('development'),
  
  DB_NAME: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().optional(),
  
}).required()
