const { response } = require("express");
const mongoose = require("mongoose");
require("../Models/sharedData");
const mailschema = mongoose.model("SharedData");

const checkMail = (req, res, next) => {
  if (req.body.Email != null || req.body.email != null) {
    let addmail = new mailschema({
      email: req.body.Email || req.body.email,
    });
    addmail
      .save()
      .then((result) => next())

      .catch((error) => {
        res.status(201).json({ data: "this email exists" });
        next(error);
      });
  } else next();
};

module.exports = checkMail;
