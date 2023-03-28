require("../Models/PatientModel");
require("../Models/pendingAppointment");
const multer = require("multer");
const { response } = require("express");

const mongoose = require("mongoose");

require("./../Models/sharedData");
const sharedMail = mongoose.model("SharedData");

const pendingSchema = mongoose.model("PendingAppointment");

const patinetSchmea = mongoose.model("Patients");

//creating img file
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.IMAGE_PATH);
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    // cb(null, `patient-${req.body.id}-${Date.now()}.${ext}`);
    cb(null, `patient-${req.body.id}.${ext}`);
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
      sharedMail.deleteOne({ email: request.body.email }).then((data) => {
        console.log("mail deleted from data shared");
      });
      next(error);
    });
};

exports.editPatient = (request, response, next) => {
  patinetSchmea
    .updateOne(
      {
        _id: request.body.id,
        //  Email: request.body.Email
      },
      {
        $set: {
          Name: request.body.name,
          Age: request.body.age,
          Address: request.body.address,
          Apointments: request.body.apointments,
          Disease: request.body.disease,
          Password: request.body.password,
          Email: request.body.email,
        },
      }
    )
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((error) => {
      next(error);
    });
};

/****UPLOAD PHOTO ****/
exports.patchPhoto = (req, res, next) => {
  patinetSchmea
    .updateOne(
      { _id: req.body.id },
      {
        $set: {
          photo: req.file.filename,
        },
      }
    )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      next(error);
    });
};

exports.deletePatient = (request, response, next) => {
  patinetSchmea
    .deleteOne({ id: request.body.id })
    .then((result) => {
      response.status(201).json({ message: "patinet deleted" });
    })
    .catch((error) => next(error));
};

exports.deletePatientByID = (req, res, next) => {
  patinetSchmea
    .deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(201).json({ message: "patinet deleted" });
    })
    .catch((error) => next(error));
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

exports.getPatientsCount = (req, res, next) => {
  patinetSchmea.countDocuments({}).then((data) => {
    res.status(200).json(data);
  }).catch((err) => {
    console.log(err);
  })
}
