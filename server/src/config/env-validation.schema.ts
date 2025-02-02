import Joi from "joi";

export default Joi.object({
  PORT: Joi.number().port().default(5000),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
});
