const Joi = require("joi");
const StakeScheme = {
    create: Joi.object().keys({
      stake_name: Joi.string()
        .max(50)
        .required(),
      category: Joi.string()
        .max(20)
        .required(),
      user_count: Joi.number()
        .min(0),
      date_end: Joi.date()
        .required(),
      date_event: Joi.date()
        .required(),
    }),

    create_review: Joi.object().keys({
      review: Joi.string()
        .min(1)
        .required(),
      review_date: Joi.date()
        .required()
    }),

    update: Joi.object().keys({
        stake_name: Joi.string()
        .max(50)
        .required(),
      category: Joi.string()
        .max(20)
        .required(),
      user_count: Joi.number()
        .min(0),
      date_end: Joi.date()
        .required(),
      date_event: Joi.date()
    })
}

module.exports = StakeScheme;