require("../Models/PatientModel");
const { response } = require("express");
const mongoose = require("mongoose");

const patinetSchmea = mongoose.model("Patients");
require("../Models/sharedData");
const mailschema = mongoose.model("SharedData");

exports.addPatient = (request, response, next) => {
   
        let addPatient = new patinetSchmea({
          Name: request.body.name,
          Age: request.body.age,
          Address: request.body.address,
          Apointments: request.body.apointments,
          Section: request.body.section,
          Disease: request.body.disease,
          Password: request.body.password,
          Email: request.body.email,
        })
  
          .save()
          .then((result) => {
            response.status(201).json(result);
          })
          .catch((error) => {
               mailschema.deleteOne({email:request.body.Email}).then((data)=>{
              //  response.status(201).json(data);
               })
              next(error)
          });
      
      
      
  };