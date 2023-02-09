const { response } = require("express");
const mongoose = require("mongoose");
require("../Models/sharedData");
const mailschema = mongoose.model("SharedData");

const checkMail = (req, res, next) => {
  if (req.body.email) {
    let addmail = new mailschema({
      email: req.body.email,
    });
    addmail
      .save()
      .then((result) => next())
      .catch((error) => {
        res.status(200).json({ message: "this email exists" });
        next(error);
      });
  } else {
    next();
  }
};

module.exports = checkMail;
