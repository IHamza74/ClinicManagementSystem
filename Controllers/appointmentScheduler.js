const { json } = require("express");
const mongoose = require("mongoose");
require("./../Models/appointmentModel");
require("../Models/pendingAppointment");
const pendingSchema = mongoose.model("PendingAppointment");

const AppointmentSchema = mongoose.model("appointmentScheduler");

/****GET ALL DATA****/
exports.getAllAppointments = (request, response, next) => {
  AppointmentSchema.find();

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
      //req.body.appID = newAppointment._id;
      res.status(200).json({ result });
    })
    .catch((error) => {
      console.log(error);
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

/* apointments Reports */
exports.AllAppointmentsReports = (req, res, next) => {
  const today =new Date();
  AppointmentSchema.find({date:{$gt:new Date()}})
    .populate({ path: "patientID", select: { _id: 0, Password: 0 } })
    .populate({
      path: "doctorID",
      select: { _id: 0, appointmentNo: 0, workingHours: 0 },
    })
    .populate({ path: "clinicID", select: { _id: 0 } })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) =>{
      console.log(error);
      next(error);
    });
};

/* Dialy apointments reports  */

exports.DailyAppointmentsReports = (req, res, next) => {
  let date = new Date();
  date.setHours(0, 0, 0);
  let day = 60 * 60 * 24 * 1000;
  let nextday = new Date(date.getTime() + day);

  AppointmentSchema.find()
    .where("date")
    .gt(date)
    .lt(nextday)
    .populate({ path: "patientID", select: { _id: 0, Password: 0 } })
    .populate({
      path: "doctorID",
      select: { _id: 0, appointmentNo: 0, workingHours: 0 },
    })
    .populate({ path: "clinicID", select: { _id: 0 } })

    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => next(error));
};
/* doctors appointments */

exports.DoctorAppointmentsReports = (req, res, next) => {
  AppointmentSchema.find({ doctorID: req.params.id })
    .populate({ path: "patientID", select: { _id: 0, Password: 0 } })
    .populate({
      path: "doctorID",
      select: { _id: 0, appointmentNo: 0, workingHours: 0 },
    })
    .populate({ path: "clinicID", select: { _id: 0 } })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => next(error));
};

/*  patient appointments */

exports.PatientAppointmentsReports = (req, res, next) => {
  
  AppointmentSchema.find({ patientID: req.params.id })
    .populate({ path: "patientID", select: { _id: 0, Password: 0 } })
    .populate({
      path: "doctorID",
      select: { _id: 0, appointmentNo: 0, workingHours: 0 },
    })
    .populate({ path: "clinicID", select: { _id: 0 } })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => next(error));
};

/** add pending appointment to appointment scheduler */
// exports.addPendingToAppointment = (req, res, next) => {
//   let newAppointment = new AppointmentSchema({
//     _id: mongoose.Types.ObjectId(),
//     patientID: req.body.patientID,
//     doctorID: req.body.doctorID,
//     clinicID: req.body.clinicID,
//     employeeID: req.params.id,
//     date: req.body.date,

//   });

//   newAppointment
//     .save()
//     .then((result) => {

//       req.body.appID = newAppointment._id;
//       next();
//     })
//     .catch((error) => {
//       next(error);
//     });
// };

exports.getAllPending = (req, res, next) => {
  pendingSchema
    .find()
    .populate({ path: "patientID" })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => next(error));
};
