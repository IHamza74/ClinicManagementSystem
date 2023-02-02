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
  let resultedObj = PrescriptionSchema.find(ObjStr);

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
  PrescriptionSchema.find({ _id: request.params.id })
    /* .populate({
      path: "appointmentId",
      select: { _id: 1, doctorID: 1, patientID: 1, clinicID: 1, employeeID: 1, date: 1 },
    }) */
    /* .populate({ path: "medicineID", select: { _id: 0, Name: 1, Dose: 1 } }) */
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

/****DELETE DATA USING FILTER****/
exports.deleteFilteredPrescription = (req, res, next) => {
  const Obj = { ...req.query };
  let ObjStr = JSON.stringify(Obj);
  ObjStr = ObjStr.replace(/\b(gte|gt|lte|lt)\b/g, (matched) => `$${matched}`);
  ObjStr = JSON.parse(ObjStr);

  PrescriptionSchema.deleteMany(ObjStr)
    .then((result) => {
      if (result != null) res.status(200).json(result);
      else next(new Error("Data is not found!"));
    })
    .catch((error) => {
      next(error);
    });
};
