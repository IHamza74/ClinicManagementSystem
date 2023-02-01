const mongoose = require("mongoose");
require("./../Models/prescriptionModel");
const PrescriptionSchema = mongoose.model("Prescriptions");

//get All Prescription
exports.getAllPrescriptions = (request, response, next) => {
  PrescriptionSchema.find()
    .populate({
      path: "appointmentId",
      select: { _id: 1, doctorID: 1, patientID: 1, clinicID: 1, employeeID: 1, date: 1 },
    })
    .populate({ path: "medicine.medicineID", select: { _id: 0, Name: 1, Dose: 1 } })
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => next(error));
};

//get Prescription By Id
exports.getPrescriptionsById = (request, response, next) => {
  PrescriptionSchema.find({ _id: request.params.id })
    .populate({
      path: "appointmentId",
      select: { _id: 1, doctorID: 1, patientID: 1, clinicID: 1, employeeID: 1, date: 1 },
    })
    .populate({ path: "medicine.medicineID", select: { _id: 0, Name: 1, Dose: 1 } })
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => next(error));
};

//post Prescription
exports.addPrescription = (req, res, next) => {
  let newPrescription = new PrescriptionSchema({
    //_id: req.body.id,
    medicine: req.body.medicine,
    appointmentId: req.body.appointmentId,
  });
  newPrescription
    .save()
    .then((data) => {
      res.status(201).json({ data });
    })
    .catch((error) => next(error));
};

//update Prescription
exports.editPrescription = (req, res, next) => {
  PrescriptionSchema.updateOne({ _id: req.body.id }, req.body, {
    $set: {
      medicine: req.body.medicine,
      appointmentId: req.body.appointmentId,
    },
  })
    .then((data) => {
      res.status(201).json({ status: "updated ", data });
    })
    .catch((error) => next(error));
};

//delete Prescription
exports.deletePrescription = (req, res, next) => {
  PrescriptionSchema.deleteOne({ _id: req.body.id })
    .then((data) => {
      res.status(201).json({ status: "deleted", data });
    })
    .catch((error) => next(error));
};
