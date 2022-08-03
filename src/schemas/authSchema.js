import Joi from "joi";

const passwordRegex = /^[a-zA-Z0-9]{6,30}$/;

const signUpSchema = Joi.object().keys({
  name: Joi.string().trim().required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().pattern(passwordRegex).required(),
  confirmPassword: Joi.valid(Joi.ref("password")),
});

const signInSchema = Joi.object().keys({
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().pattern(passwordRegex).required(),
});

export { signUpSchema, signInSchema };
