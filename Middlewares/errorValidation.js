
const mongoose = require("mongoose");
require("../Models/sharedData")
const { validationResult } = require("express-validator");
const sharedMail = mongoose.model("SharedData")


module.exports = (request, response, next) => {
  let result = validationResult(request);
  //  console.log(result);
  if (result.errors.length != 0) {
    let message = result.errors.reduce((previous, current) => {
      return previous + current.msg + ", ";
    }, "");
    let error = new Error("validation Error : " + message);
    error.status = 422;
    sharedMail.deleteOne({email:request.body.email}).then((data)=>{console.log("mail deleted from data shared")})
    next(error);
  } else {
    next();
  }
};
