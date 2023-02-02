const mongoose = require("mongoose");
require("./../Models/prescriptionModel");
const PrescriptionSchema = mongoose.model("Prescriptions");

//get All Prescription
exports.getAllPrescriptions = (request, response, next) => {
  PrescriptionSchema.find()
    .populate({
      path: "appointmentId",
      populate: { path: "doctorID", select: { name: 1, _id: 0 } },
    })
    .populate({
      path: "appointmentId",
      populate: { path: "clinicID", select: { clinicName: 1, _id: 0 } },
    })
    .populate({
      path: "appointmentId",
      populate: { path: "patientID", select: { Name: 1, _id: 0 } },
    })
    .populate({
      path: "appointmentId",
      populate: { path: "employeeID", select: { name: 1, _id: 0 } },
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
      populate: { path: "doctorID", select: { name: 1, _id: 0 } },
    })
    .populate({
      path: "appointmentId",
      populate: { path: "clinicID", select: { clinicName: 1, _id: 0 } },
    })
    .populate({
      path: "appointmentId",
      populate: { path: "patientID", select: { Name: 1, _id: 0 } },
    })
    .populate({
      path: "appointmentId",
      populate: { path: "employeeID", select: { name: 1, _id: 0 } },
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
    doctorId: req.body.doctorId,
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
      doctorId: req.body.doctorId,
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
