const { json } = require("express");
const mongoose = require("mongoose");
require("./../Models/doctorModel");
const multer = require("multer");
const DoctorSchema = mongoose.model("doctor");
require("./../Models/sharedData");
const sharedMail = mongoose.model("SharedData");
require("../Models/sharedData");

//creating img file
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "img");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `doctor-${req.body.id}-${Date.now()}.${ext}`);
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
exports.uploadDoctorImg = upload.single("photo");
/****GET ALL DATA AS FILTERED****/
exports.getAllDoctors = (request, response, next) => {
  //FILTERING DATA
  const Obj = { ...request.query };
  delete Obj["sort"]; //if user enter sort in query string
  let ObjStr = JSON.stringify(Obj);
  ObjStr = ObjStr.replace(/\b(gte|gt|lte|lt)\b/g, (matched) => `$${matched}`);
  ObjStr = JSON.parse(ObjStr);

  //OBJECT RESULTED FROM QUERY
  let resultedObj = DoctorSchema.find(ObjStr);

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

/****GET ONE DATA****/
exports.getOneDoctor = (req, res, next) => {
  DoctorSchema.findOne({ _id: req.params.id })
    .then((result) => {
      if (result != null) res.status(200).json(result);
      else next(new Error("Doctor is not found!"));
    })
    .catch((error) => {
      next(error);
    });
};

/****POST DATA****/
exports.addDoctor = (req, res, next) => {
  let newAppointment = new DoctorSchema({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    age: req.body.age,
    speciality: req.body.speciality,
    email: req.body.email,
    workingHours: req.body.workingHours,
    appointmentNo: req.body.appointmentNo,
    password: req.body.password,
  });
  newAppointment
    .save()
    .then((result) => {
      res.status(201).json({ message: "doctor added" });
    })
    .catch((error) => {
      sharedMail
        .deleteOne({ email: req.body.email })
        .then((data) => {})
        .catch((error) => next(error));
      next(error);
    });
};

/****PATCH DATA****/
exports.editDoctor = (req, res, next) => {
  DoctorSchema.updateOne(
    { _id: req.body.id },
    {
      $set: {
        name: req.body.name,
        age: req.body.age,
        speciality: req.body.speciality,
        email: req.body.email,
        workingHours: req.body.workingHours,
        appointmentNo: req.body.appointmentNo,
        password: req.body.password,
      },
    }
  )
    .then((result) => {
      res.status(200).json({ message: "doctor updated" });
    })
    .catch((error) => {
      next(error);
    });
};

/****UPLOAD PHOTO ****/
exports.patchPhoto = (req, res, next) => {
  DoctorSchema.updateOne(
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

/****DELETE DATA BY ID****/
exports.deleteDoctor = (req, res, next) => {
  DoctorSchema.deleteOne({ _id: req.params.id })
    .then((result) => {
      if (result != null) res.status(200).json(result);
      else next(new Error("Doctor is not found!"));
    })
    .catch((error) => {
      next(error);
    });
};
