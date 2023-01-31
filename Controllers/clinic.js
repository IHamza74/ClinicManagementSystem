const mongoose = require("mongoose");
require("../Models/clinicModel")
const clinicSchema = mongoose.model("clinic");


exports.getAllClinics = (request, response, next) => {
  clinicSchema.find()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};

exports.addClinic = (req, res, next) => {
  let newClinic = new clinicSchema({
    _id: req.body.id,
    clinicName: req.body.name,
    clinicAddress: req.body.address
  }).save()
    .then((result) => {
      res.status(201).json({ status: "clinic added successfully" });
    })
    .catch((err) => next(err))
};

exports.editClinic = (req, res, next) => {
  clinicSchema.updateOne(
    { _id: req.body.id },
    {
      $set: {
        _id: req.body.id,
        clinicName: req.body.name,
        clinicAddress: req.body.address
      }
    }
  )
    .then((result) => {
      res.status(200).json({ status: "Clinic updated successfully" });
    })
    .catch((error) => next(error));
};

exports.deleteClinic = (req, res, next) => {
  clinicSchema.deleteOne(
    { _id: req.body.id }
  )
    .then((result) => {
      res.status(200).json({ status: "Clinic deleted successfully" });
    })
    .catch((error) => next(error))

};
