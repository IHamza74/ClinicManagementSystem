require("../Models/PatientModel");
const { response } = require("express");
const mongoose = require("mongoose");

const patinetSchmea = mongoose.model("Patients");
require("../Models/sharedData");
const mailschema = mongoose.model("SharedData");

exports.addPatient = (request, response, next) => {
   
        let addPatient = new patinetSchmea({
          Name: request.body.Name,
          Age: request.body.Age,
          Address: request.body.Address,
          Apointments: request.body.Apointments,
          Section: request.body.Section,
          Disease: request.body.Disease,
          Password: request.body.Password,
          Email: request.body.Email,
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