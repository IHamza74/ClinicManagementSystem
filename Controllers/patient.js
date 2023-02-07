require("../Models/PatientModel");
require("../Models/pendingAppointment");
const multer = require("multer");
const { response } = require("express");

const mongoose = require("mongoose");

require("./../Models/sharedData");

const pendingSchema = mongoose.model("PendingAppointment");

const patinetSchmea = mongoose.model("Patients");

//creating img file
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "img");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `patient-${req.body.id}-${Date.now()}.${ext}`);
  },
});

//checking the uploaded file
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image!"), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
/**** UPLOAD IMAGE ****/
exports.uploadPatientImg = upload.single("photo");

exports.getAllPatients = (request, response, next) => {
  //FILTERING DATA
  const Obj = { ...request.query };
  delete Obj["sort"]; //if user enter sort in query string
  let ObjStr = JSON.stringify(Obj);
  ObjStr = ObjStr.replace(/\b(gte|gt|lte|lt)\b/g, (matched) => `$${matched}`);
  ObjStr = JSON.parse(ObjStr);

  //OBJECT RESULTED FROM QUERY
  let resultedObj = patinetSchmea.find(ObjStr);

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

exports.addPatient = (request, response, next) => {
  let addPatient = new patinetSchmea({
    Name: request.body.Name,
    Age: request.body.Age,
    Address: request.body.Address,
    Apointments: request.body.Apointments,
    Section: request.body.Section,
    Disease: request.body.Disease,
    Password: request.body.Password,
    Email: request.body.email,
  })

    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((error) => {
      next(error);
    });
};

exports.editPatient = (request, res, next) => {
  patinetSchmea
    .updateOne(
      {
        _id: request.body.id,
        //  Email: request.body.Email
      },
      {
        $set: {
          Name: request.body.Name,
          Age: request.body.Age,
          Address: request.body.Address,
          Apointments: request.body.Apointments,
          Disease: request.body.Disease,
          Password: request.body.Password,
          Email: request.body.Email,
          photo: request.file.filename,
        },
      }
    )
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      next(error);
    });
};

exports.deletePatient = (request, response, next) => {
  patinetSchmea
    .deleteOne({ Email: request.body.Email })
    .then((result) => {
      response.status(201).json({ message: "patinet deleted" });
    })
    .catch((error) => next(error));
};

/****DELETE DATA USING FILTER****/
exports.deleteFilteredPatient = (req, res, next) => {
  const Obj = { ...req.query };
  let ObjStr = JSON.stringify(Obj);
  ObjStr = ObjStr.replace(/\b(gte|gt|lte|lt)\b/g, (matched) => `$${matched}`);
  ObjStr = JSON.parse(ObjStr);

  patinetSchmea
    .deleteMany(ObjStr)
    .then((result) => {
      if (result != null) res.status(200).json(result);
      else next(new Error("Data is not found!"));
    })
    .catch((error) => {
      next(error);
    });
};

/* get patient profile  */
exports.getpatientProfile = (req, res, next) => {
  patinetSchmea
    .findById(req.params.id)
    .populate({
      path: "Apointments",
      populate: { path: "patientID", select: { _id: 0, Password: 0 } },
      populate: {
        path: "doctorID",
        select: { _id: 0, appointmentNo: 0, workingHours: 0 },
      },
      populate: { path: "clinicID", select: { _id: 0 } },
    })
    .then((result) => {
      if (result != null) res.status(201).json(result);
      else next(new Error("this patient doesnt exists"));
    })
    .catch((error) => next(error));
};

/**  request an appointment  */
exports.reserveAppointment = (req, res, next) => {
  console.log(req.params.id);
  let addpending = new pendingSchema({
    patientID: req.params.id,
    clinicID: req.body.clinicID,
    date: req.body.date,
    painDescription: req.body.painDescription,
  })
    .save()
    .then((data) => {
      res.status(201).json({ message: "Reservation done successfuly " });
    })
    .catch((error) => next(error));
};
