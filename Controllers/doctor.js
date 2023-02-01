const mongoose = require("mongoose");
require("./../Models/doctor");

const DoctorSchema = mongoose.model("doctor");

/****GET ALL DATA****/
exports.getAllDoctors = (request, response, next) => {
  DoctorSchema.find()
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
      res.status(201).json(result);
    })
    .catch((error) => {
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
      res.status(200).json(result);
    })
    .catch((error) => {
      next(error);
    });
};

/****DELETE DATA****/
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
