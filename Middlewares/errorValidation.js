const { validationResult } = require("express-validator");

module.exports = (request, response, next) => {
  let result = validationResult(request);
  //  console.log(result);
  if (result.errors.length != 0) {
    let message = result.errors.reduce((previous, current) => {
      return previous + current.msg + ", ";
    }, "");
    let error = new Error("validation Error : " + message);
    error.status = 422;
    next(error);
  } else {
    next();
  }
};
