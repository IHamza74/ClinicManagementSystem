const mongoose = require("mongoose");
require("../Models/employeesModel");
const employeesSchema = mongoose.model("employees");

exports.getAllEmployees = (request, response, next) => {
  employeesSchema.find()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error))
};

exports.addEmployee = (req, res, next) => {
  let newEmp = new employeesSchema({
    _id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    age: req.body.age,
    address: req.body.address
  }).save()
    .then((data) => {
      res.status(201).json({ status: "employee added successfully" });
    })
    .catch((error) => next(error))
};

exports.editEmployee = (req, res, next) => {
  employeesSchema.updateOne(
    { _id: req.body.id },
    {
      $set: {
        _id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        address: req.body.address
      }
    }
  )
    .then((data) => {
      res.status(200).json({ status: "Employee updated successfully" });
    })
    .catch((error) => next(error))
}

exports.deleteEmployee = (req, res, next) => {
  employeesSchema.deleteOne({
    _id: req.body.id
  })
    .then((data) => {
      res.status(200).json({ status: "Employee deleted successfully" });
    })
    .catch((error) => next(error))
}

