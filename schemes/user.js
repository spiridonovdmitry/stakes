const Joi = require("joi");

const UserScheme = {
    registration: Joi.object().keys({
      email: Joi.string()
        .email()
        .max(50)
        .required(),
      password: Joi.string()
        .min(2)
        .max(20)
        .required(),
      login: Joi.string()
        .max(50)
        .required(),
      role: Joi.number()
        .min(1)
        .max(2)
    }),

    login: Joi.object().keys({
      login: Joi.string()
        .required(),
      password: Joi.string()
        .min(4)
        .max(20)
        .required()
    }),

    update: Joi.object().keys({
        email: Joi.string()
        .email()
        .max(50),
      password: Joi.string()
        .min(2)
        .max(20),
      login: Joi.string()
        .max(50),
      role: Joi.number()
        .min(1)
        .max(2)
    })
}

module.exports = UserScheme;