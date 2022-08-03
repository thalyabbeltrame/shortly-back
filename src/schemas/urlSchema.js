import Joi from "joi";

const urlSchema = Joi.object().keys({
  url: Joi.string().uri().required(),
});

export { urlSchema };
