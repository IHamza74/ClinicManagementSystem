const mongoose = require("mongoose");
let jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { request } = require("express");
require("./../Models/employeesModel");
require("../Models/doctorModel");
require("./../Models/PatientModel");

const EmployeeSchema = mongoose.model("employees");
const DoctorSchema = mongoose.model("doctor");
const PatientSchmea = mongoose.model("Patients");

exports.login = (req, res, next) => {
  if (req.body.email == "admin@gmail.com" && req.body.password == "123456789") {
    let token = jwt.sign({ role: "admin" }, process.env.SECRET_KEY, {
      expiresIn: process.env.TOKEN_DURAITION,
    });
    res.status(200).json({ data: "Authorized Admin", token });
  } else {
    //nested one
    EmployeeSchema.findOne({
      email: req.body.email,
    }).then((employee) => {
      //checking if login user is employee
      if (employee != null) {
        let token = jwt.sign(
          { role: "employee", id: employee._id },
          process.env.SECRET_KEY,
          {
            expiresIn: process.env.TOKEN_DURAITION,
          }
        );
        checkAuthintication(employee, req, res, token);
      } //end of employee check
      else {
        //nested two

        DoctorSchema.findOne({ email: req.body.email }).then((doctor) => {
          if (doctor != null) {
            let token = jwt.sign(
              { role: "doctor", id: doctor._id },
              process.env.SECRET_KEY,
              {
                expiresIn: process.env.TOKEN_DURAITION,
              }
            );

            checkAuthintication(doctor, req, res, token);
          } //end of doctor check
          else {
            //nested three

            PatientSchmea.findOne({ Email: req.body.email }).then((patient) => {
              if (patient != null) {
                let token = jwt.sign(
                  { role: "patient", id: patient._id },
                  process.env.SECRET_KEY,
                  {
                    expiresIn: process.env.TOKEN_DURAITION,
                  }
                );
                bcrypt
                  .compare(req.body.password.toString(), patient.Password)
                  .then((result) => {
                    if (result)
                      res.status(200).json({ data: "Authorized", token });
                    else
                      res
                        .status(200)
                        .json({ data: "please provide correct password" });
                  });
              } else {
                res.status(200).json({ data: "not authorized" });
              }
            });
          }
        });
      }
    });
  }
};

function checkAuthintication(role, req, res, token) {
  bcrypt.compare(req.body.password.toString(), role.password).then((result) => {
    if (result) res.status(200).json({ data: "Authorized", token });
    else res.status(200).json({ data: "please provide correct password" });
  });
}
