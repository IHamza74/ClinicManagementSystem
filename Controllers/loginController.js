const mongoose = require("mongoose");
// require("../Model/teacherModel");
let jwt = require("jsonwebtoken");
const { request } = require("express");

exports.login = (req, res, next) => {
  if (req.body.username == "turky" && req.body.password == "123") {
    let token = jwt.sign({ role: "admin" }, "AhmedTurky", { expiresIn: "1h" });

    res.status(200).json({ data: "Authorized Admin", token });
  } else {
    response.status(200).json({ data: "not authorized" });
  }
};
