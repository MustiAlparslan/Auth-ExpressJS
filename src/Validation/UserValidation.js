import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().min(5).max(50).trim().lowercase(),
  username: Joi.string().min(5).max(30).trim().lowercase(),
  email: Joi.string().trim().lowercase().email(),
  password: Joi.string().trim().min(5).max(30),
});

export const UserLoginSchema = Joi.object({
  username: Joi.alternatives().conditional("email", {
    is: Joi.exist(),
    then: Joi.optional(),
    otherwise: Joi.string().min(5).max(30).trim().lowercase(),
  }),
  email: Joi.alternatives().conditional("username", {
    is: Joi.exist(),
    then: Joi.optional(),
    otherwise: Joi.string().trim().lowercase().email(),
  }),
  password: Joi.string().trim().min(5).max(30).required(),
});

export const UserCreateValidation = schema.required();

export const UserUpdateValidation = schema;
