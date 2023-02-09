const mongoose = require("mongoose");
require("./../Models/prescriptionModel");
const PrescriptionSchema = mongoose.model("Prescriptions");

//get All Prescription
exports.getAllPrescriptions = (request, response, next) => {
  //FILTERING DATA
  const Obj = { ...request.query };
  delete Obj["sort"]; //if user enter sort in query string
  let ObjStr = JSON.stringify(Obj);
  ObjStr = ObjStr.replace(/\b(gte|gt|lte|lt)\b/g, (matched) => `$${matched}`);
  ObjStr = JSON.parse(ObjStr);

  //OBJECT RESULTED FROM QUERY
  let resultedObj = PrescriptionSchema.find(ObjStr)
    .populate({
      path: "appointmentID",
      populate: { path: "doctorID", select: { name: 1, _id: 0 } },
    })
    .populate({
      path: "appointmentID",
      populate: { path: "clinicID", select: { clinicName: 1, _id: 0 } },
    })
    .populate({
      path: "appointmentID",
      populate: { path: "patientID", select: { Name: 1, _id: 0 } },
    })
    .populate({
      path: "appointmentID",
      populate: { path: "employeeID", select: { name: 1, _id: 0 } },
    })
    .populate({
      path: "medicine.medicineID",
      select: { _id: 0, Name: 1, Dose: 1 },
    });

  //IF SORTING DATA
  if (request.query.sort) {
    let sortBy = request.query.sort.split(",").join(" ");
    resultedObj = resultedObj.sort(sortBy);
  }

  //TO RETRIEVE DATA
  resultedObj
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};

//get Prescription By Id
exports.getPrescriptionsById = (request, response, next) => {
  PrescriptionSchema.findOne({ _id: request.params.id })
    .populate({
      path: "appointmentID",
      populate: { path: "doctorID", select: { name: 1, _id: 0 } },
    })
    .populate({
      path: "appointmentID",
      populate: { path: "clinicID", select: { clinicName: 1, _id: 0 } },
    })
    .populate({
      path: "appointmentID",
      populate: { path: "patientID", select: { Name: 1, _id: 0 } },
    })
    .populate({
      path: "appointmentID",
      populate: { path: "employeeID", select: { name: 1, _id: 0 } },
    })

    .populate({
      path: "medicine.medicineID",
      select: { _id: 0, Name: 1, Dose: 1 },
    })
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};
//post Prescription
exports.addPrescription = (req, res, next) => {
  let newPrescription = new PrescriptionSchema({
    medicine: req.body.medicine,
    appointmentID: req.body.appointmentId,
  });
  newPrescription
    .save()
    .then((data) => {
      res.status(201).json({ message: "prescription has been recieved" });
    })
    .catch((error) => next(error));
};

//update Prescription
exports.editPrescription = (req, res, next) => {
  PrescriptionSchema.updateOne(
    { _id: req.body.id },
    {
      $set: {
        medicine: req.body.medicine,
        appointmentID: req.body.appointmentId,
      },
    }
  )
    .then((data) => {
      res.status(201).json({ status: "updated ", data });
    })
    .catch((error) => next(error));
};

//delete Prescription

exports.deletePrescriptionById = (req, res, next) => {
  PrescriptionSchema.deleteOne({ _id: req.params.id })
    .then((data) => {
      res.status(201).json({ status: "Prescription is Deleted " });
    })
    .catch((error) => next(error));
};
