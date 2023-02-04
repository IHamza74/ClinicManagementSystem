const mongoose = require("mongoose");
let jwt = require("jsonwebtoken");
const { request } = require("express");
require("./../Models/employeesModel");
const EmployeeSchema = mongoose.model("employees");



exports.login = (req, res, next) => {
  if (req.body.email == "turky@gmail.com" && req.body.password == "123") {
    let token = jwt.sign({ role: "admin" }, process.env.SECRET_KEY);
    res.status(200).json({ data: "Authorized Admin", token });
  } else {
    EmployeeSchema.findOne({
      email: req.body.email,
      password: req.body.password,
    }).then((employee) => {
      if (employee != null) {
        let token = jwt.sign({ role: "employee" }, process.env.SECRET_KEY, {
          expiresIn: "90d",
        });
        res.status(200).json({ data: "Authorized Employee", token });
      } else {
        res.status(200).json({ data: "not authorized" });
      }
    });
  }
};
