const mongoose = require("mongoose");
require("./../Models/appointmentModel");

const AppointmentSchema = mongoose.model("appointmentScheduler");

/****GET ALL DATA****/
exports.getAllAppointments = (request, response, next) => {
  //FILTERING DATA
  const Obj = { ...request.query };
  delete Obj["sort"]; //if user enter sort in query string
  let ObjStr = JSON.stringify(Obj);
  ObjStr = ObjStr.replace(/\b(gte|gt|lte|lt)\b/g, (matched) => `$${matched}`);
  ObjStr = JSON.parse(ObjStr);

  //OBJECT RESULTED FROM QUERY
  let resultedObj = AppointmentSchema.find(ObjStr);

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
exports.getOneAppointment = (req, res, next) => {
  AppointmentSchema.findOne({ _id: req.params.id })
    .then((result) => {
      if (result != null) res.status(200).json(result);
      else next(new Error("Appointment is not found!"));
    })
    .catch((error) => {
      next(error);
    });
};

/****POST DATA****/
exports.addAppointment = (req, res, next) => {
  let newAppointment = new AppointmentSchema({
    _id: mongoose.Types.ObjectId(),
    patientID: req.body.patientID,
    doctorID: req.body.doctorID,
    clinicID: req.body.clinicID,
    employeeID: req.body.employeeID,
    date: req.body.date,
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
exports.editAppointment = (req, res, next) => {
  AppointmentSchema.updateOne(
    { _id: req.body.id },
    {
      $set: {
        patientID: req.body.patientID,
        doctorID: req.body.doctorID,
        clinicID: req.body.clinicID,
        employeeID: req.body.employeeID,
        date: req.body.date,
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
exports.deleteAppointment = (req, res, next) => {
  AppointmentSchema.deleteOne({ _id: req.params.id })
    .then((result) => {
      if (result != null) res.status(200).json(result);
      else next(new Error("Appointment is not found!"));
    })
    .catch((error) => {
      next(error);
    });
};

/****DELETE DATA USING FILTER****/
exports.deleteFilteredAppointment = (req, res, next) => {
  const Obj = { ...req.query };
  let ObjStr = JSON.stringify(Obj);
  ObjStr = ObjStr.replace(/\b(gte|gt|lte|lt)\b/g, (matched) => `$${matched}`);
  ObjStr = JSON.parse(ObjStr);

  AppointmentSchema.deleteMany(ObjStr)
    .then((result) => {
      if (result != null) res.status(200).json(result);
      else next(new Error("Data is not found!"));
    })
    .catch((error) => {
      next(error);
    });
};
