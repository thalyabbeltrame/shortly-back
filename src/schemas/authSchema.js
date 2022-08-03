import Joi from "joi";

const passwordRegex = /^[a-zA-Z0-9]{6,30}$/;

const signUpSchema = Joi.object().keys({
  name: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(passwordRegex).required(),
  confirmPassword: Joi.valid(Joi.ref("password")),
});

export { signUpSchema };
