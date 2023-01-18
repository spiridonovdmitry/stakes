const Joi = require("joi");
const ResultScheme = {
    create: Joi.object().keys({
      result_name: Joi.string()
        .max(50)
        .required(),
      coefficient: Joi.number()
        .min(1)
        .max(20)
        .required(),

    }),



    update: Joi.object().keys({
        result_name: Joi.string()
        .max(50)
        .required(),
      coefficient: Joi.number()
        .min(1)
        .max(20)
        .required(),
    })
}

module.exports = ResultScheme;