require("../Models/PatientModel");
const { response } = require("express");
const mongoose = require("mongoose");

const patinetSchmea = mongoose.model("Patients");
require("../Models/sharedData");
const mailschema = mongoose.model("SharedData");

exports.addPatient = (request, response, next) => {
  const defaultAppointment = [];
  const defaultDisease = "headeche";
  const defaultSection = "Ophthalmology";
  let addPatient = new patinetSchmea({
    Name: request.body.Name,
    Age: request.body.Age,
    Address: request.body.Address,
    Apointments: request.body.Apointments || defaultAppointment,
    Section: request.body.Section || defaultSection,
    Disease: request.body.Disease || defaultDisease,
    Password: request.body.Password,
    Email: request.body.Email,
  })

    .save()
    .then((result) => {
      response.status(201).json({ data: "Signned Up Successfully" });
    })
    .catch((error) => {
      mailschema.deleteOne({ email: request.body.Email }).then((data) => {});
      next(error);
    });
};
