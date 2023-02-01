
require("../Models/PatientModel")
const { response } = require("express");
const mongoose = require("mongoose");

const patinetSchmea = mongoose.model("Patients")


exports.getAllPatients = (request, response, next) => {
 console.log(request.role);
  patinetSchmea.find().then((res) => {
    response.status(201).json(res)
  }).catch((error) => {
    next(error)
  })

};

exports.addPatient = (request, response, next) => {

  let addPatient = new patinetSchmea({
    Name: request.body.Name,
    Age: request.body.Age,
    Address: request.body.Address,
    Apointments: request.body.Apointments,
    Section:request.body.Section,
    Disease: request.body.Disease,
    Password: request.body.Password,
    Email: request.body.Email

  })
  addPatient.save().then((result) => {
    response.status(201).json(result);
  }).catch((error) => { next(error) })


};

exports.editPatient = (request, res, next) => {
 
  patinetSchmea.updateOne({ Email: request.body.Email },
    {
      $set: {
        Name: request.body.Name,
        Age: request.body.Age,
        Address: request.body.Address,
        Apointments: request.body.Apointments,
        Disease: request.body.Disease,
        Password: request.body.Password,
        Email: request.body.Email

      }
    }
  ).then((result) => {
    res.status(201).json(result)
  }).catch((error) => {
    next(error)
  })

};

exports.deletePatient = (request, response, next) => {
  patinetSchmea.deleteOne({ Email: request.body.Email }).then((result) => {
    response.status(201).json({ message: "patinet deleted" })
  }).catch((error) => next(error))


};
