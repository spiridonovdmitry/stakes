const ForbiddenError = require("../error/ForbiddenError");
const jwt = require("jsonwebtoken")
module.exports = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    const decoded = jwt.verify(token, '123');
  if (decoded.role == 2) {

    next();

  } else {

    next(new ForbiddenError("Not enough rights"));
    
  }
};
