const Joi = require("joi");

const NotAcceptableError = require("../error/NotAcceptableError");

module.exports = schema => {
  return (req, res, next) => {
      
    const isNotValid = schema.validate(req.body).error;

    if (isNotValid) {
      next(new NotAcceptableError(isNotValid.message));
    }
    next();
  };
};
