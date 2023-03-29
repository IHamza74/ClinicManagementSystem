const { request, response, json } = require("express");
let jwt = require("jsonwebtoken");
const appointmentScheduler = require("../Controllers/appointmentScheduler");
const mongoose = require("mongoose");
const { Result } = require("express-validator");
const colors = require("colors");
require("../Models/doctorModel");
require("../Models/PatientModel");
require("../Models/clinicModel");
require("../Models/employeesModel");
require("../Models/medecineModel");
require("../Models/prescriptionModel");

const medicineSchema = mongoose.model("Medicine");
const employeeSchema = mongoose.model("employees");
const clinicSchema = mongoose.model("clinic");
const patientSchema = mongoose.model("Patients");
const doctorSchema = mongoose.model("doctor");
const AppointmentSchema = mongoose.model("appointmentScheduler");
const PrescriptionSchema = mongoose.model("Prescriptions");
require("../Models/invoiceModel");
const InvoiceSchema = mongoose.model("invoices");

////////////////////////////////////////////////////////////////////////////////////////////////
//APPOINTMENTS Checking MWs//
////////////////////////////////////////////////////////////////////////////////////////////////

//preventing conflicts of appointments for one doctor
module.exports.isDoctorAvailable = async (request, response, next) => {
  if (request.body.doctorID != null) {
    try {
      let appointmentDate = new Date(request.body.date).getTime();
      let currentDate = new Date().getTime();

      if (currentDate > appointmentDate && request.method == "POST") {
        return response.status(406).json({ message: "You can not make an appointment in the past" });
      } else {
        let token = jwt.sign({ role: "admin" }, process.env.SECRET_KEY, {
          expiresIn: process.env.TOKEN_DURAITION,
        });

        let appointsRes = await fetch(`http://localhost:3000/appointmentScheduler?doctorID=${request.body.doctorID}`, {
          headers: { Authorization: "Bearer " + token },
        });

        let DrAppointments = await appointsRes.json();
        let flag = 0;
        DrAppointments.forEach((appointment) => {
          if (Math.abs(new Date(appointment.date) - new Date(request.body.date)) < 30 * 60000) {
            flag = 1;
            return response.status(406).json({ message: "the doctor is busy at this time" });
          }
        });
        if (flag == 0) next();
      }
    } catch (error) {
      next(error);
    }
  } else next();
};

module.exports.isDoctorAvailablePost = async (request, response, next) => {
  try {
    let appointmentDate = new Date(request.body.Date).getTime();
    let currentDate = new Date().getTime();
    if (currentDate > appointmentDate) {
      return response.status(406).json({ message: "You can not make an appointment in the past" });
    } else {
      let token = jwt.sign({ role: "admin" }, process.env.SECRET_KEY, {
        expiresIn: process.env.TOKEN_DURAITION,
      });
      let appointsRes = await fetch(`http://localhost:3000/appointmentScheduler?doctorID=${request.body.doctorID}`, {
        headers: { Authorization: "Bearer " + token },
      });

      let DrAppointments = await appointsRes.json();
      DrAppointments.forEach((appointment) => {
        if (Math.abs(new Date(appointment.date) - new Date(request.body.date)) < 30 * 60000) {
          return response.status(406).json({ message: "the doctor is busy at this time" });
        }
      });
      next();
    }
  } catch (error) {
    next(error);
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////
//Prescription Checking MWs//
////////////////////////////////////////////////////////////////////////////////////////////////
//checking of medicine wheather if it exists
module.exports.DoMedicineExist = async (request, response, next) => {
  if (request.body.medicine != null) {
    try {
      let token = jwt.sign({ role: "admin" }, process.env.SECRET_KEY, {
        expiresIn: process.env.TOKEN_DURAITION,
      });
      let medicinesAsJson = await fetch(`http://localhost:3000/medicine`, {
        headers: { Authorization: "Bearer " + token },
      });
      let allDBMedicines = await medicinesAsJson.json();

      if (request.body.medicine) {
        let requestMedicines = request.body.medicine;

        //getting All DB medicines ids
        let allDBmedicinesIDS = []; // contains all medicines' ids in DB
        let prescriptionMedicinesIDs = []; // contains all presicription's ids
        let notFoundMedicines = []; //not found medicines
        allDBMedicines.forEach((med) => {
          allDBmedicinesIDS.push(med._id);
        });

        //getting presicription medicines id
        requestMedicines.forEach((med) => {
          prescriptionMedicinesIDs.push(med.medicineID);
        });

        //checking existance of medicine in stock
        prescriptionMedicinesIDs.forEach((medID) => {
          let flag = allDBmedicinesIDS.indexOf(medID);
          if (flag == -1) {
            notFoundMedicines.push(medID);
          }
        });

        // checking overall medcines status
        if (notFoundMedicines.length == 0) {
          next();
        } else {
          return response.status(406).json({
            message: "some medicines are out of stock, prescription is cancelled",
            medicinesIDs: notFoundMedicines,
          });
        }
      } else {
        next();
      }
    } catch (error) {
      next(error);
    }
  } else next();
};

//checking existance of doctor
// module.exports.doesDoctorExist = async (request, response, next) => {
//   let appointment;
//   if (!request.body.doctorID || !request.body.date) {
//     appointment = await AppointmentSchema.findOne({ _id: request.body.id });
//     if (appointment == null) response.status(406).json({ meassge: "Wrong appointmentID ID, process was cancelled" });
//   }
//   if (!request.body.date) {
//     request.body.date = appointment.date;
//   }
//   if (request.body.doctorID) {
//     let doctor = await doctorSchema.findOne({ _id: request.body.doctorID });
//     if (doctor == null) response.status(406).json({ meassge: "Wrong doctorID ID, process was cancelled" });
//     else {
//       next();
//     }
//   } else {
//     request.body.doctorID = appointment.doctorID.toString();
//     next();
//   }
// };
module.exports.doesDoctorExist = async (request, response, next) => {
  if (request.method == "PATCH") {
    let appointment;
    if (!request.body.doctorID || !request.body.date) {
      appointment = await AppointmentSchema.findOne({ _id: request.body.id });
      if (appointment == null) response.status(406).json({ meassge: "Wrong appointmentID ID, process was cancelled" });
    }
    // if (!request.body.date) {
    //   request.body.date = appointment.date;
    // }
    if (!request.body.doctorID) {
      request.body.doctorID = appointment.doctorID.toString();
    }
  }
  let doctor = await doctorSchema.findOne({ _id: request.body.doctorID });
  if (doctor == null) response.status(406).json({ meassge: "Wrong doctorID ID, process was cancelled" });
  else {
    next();
  }
};

//checking existance of clinic
module.exports.doesClinicExist = async (request, response, next) => {
  if (request.body.clinicID != null) {

    let clinic = await clinicSchema.findOne({ _id: request.body.clinicID });
    if (clinic == null)
     response.status(406).json({ meassge: "Wrong clinic ID, process was cancelled" });
    else {
      next();
    }
  }
 
};

//checking existance of employee ID
module.exports.doesEmployeeExist = async (request, response, next) => {
  if (request.body.employeeID != null) {
    let employee = await employeeSchema.findOne({ _id: request.body.employeeID });
    if (employee == null) response.status(406).json({ meassge: "Wrong employee ID, process was cancelled" });
    else {
      next();
    }
  }
  next();
};

//checking existance of patient ID
module.exports.doesPatientExist = async (request, response, next) => {
  if (request.body.patientID != null) {
    if (!request.body.patientID) {
      let invoice = await InvoiceSchema.findOne({ _id: request.body.id });
      request.body.patientID = invoice.patientID.toString();
    }

    let patient = await patientSchema.findOne({ _id: request.body.patientID });
    if (patient == null) response.status(406).json({ meassge: "Wrong patient ID, process was cancelled" });
    else {
      next();
    }
  } else next();
};

//checking of prescription appointment wheather if it exists or not
module.exports.doesAppointmentExist = async (request, response, next) => {
  if (request.body.appointmentId) {
    try {
      let token = jwt.sign({ role: "admin" }, process.env.SECRET_KEY, {
        expiresIn: process.env.TOKEN_DURAITION,
      });
      //fetching appointment
      let appointmentStream = await fetch(`http://localhost:3000/appointmentScheduler/${request.body.appointmentId}`, {
        headers: { Authorization: "Bearer " + token },
      });
      // checking overall medcines status
      let AppointmentResult = await appointmentStream.json();

      //defining path to check existance of previous invoice or prescription
      let fullPath = request.url.substring(1);

      let path = fullPath.split("/")[0];
      // let path = fullPath.substring(0, fullPath.indexOf("/"));

      // checking appointment if exist
      if (AppointmentResult._id != request.body.appointmentId) {
        return response.status(406).json({ message: "Appointment Id is not valid, process is cancelled" });
      } else {
        //checking existance of previous prescription or invoice
        let prescORinvoiceRES = await fetch(
          `http://localhost:3000/${path}?appointmentID=${request.body.appointmentId}`,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );

        let prescORinvoice = await prescORinvoiceRES.json();
        if (prescORinvoice.length == 0) next();
        else {
          if (request.body.id && request.body.id == prescORinvoice[0]._id) next();
          else
            return response.status(406).json({
              message: `this appointment id has a previous ${path},Process was cancelled`,
            });
        }
      }
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
};

module.exports.addAppointmentToPatientOrDoctor = async (request, response, next) => {
  try {
    await doctorSchema
      .findOneAndUpdate({ _id: request.body.doctorID }, { $push: { appointmentNo: request.body.appID } })
      .then((result) => {
        console.log("appointment ID was added to Doctor successfully");
      })
      .catch((err) => {
        next(err);
      });
    await patientSchema
      .findOneAndUpdate({ _id: request.body.patientID }, { $push: { Apointments: request.body.appID } })
      .then((result) => {
        console.log("appointment ID was added to patient successfully");
      })
      .catch((error) => {
        next(error);
      });
    return response.status(201).json({ message: "Appointment was Added successfully " });
  } catch (error) {
    console.log("Error Adding appointments to doctor or patient, process was cancelled");
    next(error);
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////
//medicine Checking MWs//
////////////////////////////////////////////////////////////////////////////////////////////////

module.exports.medicineStockMangement = async (request, response, next) => {
  if (request.body.medicine) {
    let price = 0;
    try {
      let medicine_array = request.body.medicine;
      for (let medicine of medicine_array) {
        let med = await medicineSchema.findOneAndUpdate(
          { _id: medicine.medicineID },
          { $inc: { Stock: -medicine.quantity } }
        );
        price += med.Price * medicine.quantity;
        if (med.Stock < 1000) {
          console.log(`low stock of medicine ${med.Name}`.bgRed);
        }
      }
      //request.body.money = price;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
};

module.exports.resetMedicineStock = async (request, next) => {
  if (request.body.medicine) {
    try {
      let medicine_array = request.body.medicine;
      for (let medicine of medicine_array) {
        let med = await medicineSchema.findOneAndUpdate(
          { _id: medicine.medicineID },
          { $inc: { Stock: +medicine.quantity } }
        );
        if (med.Stock < 1000) {
          console.log(`low stock of medicine ${med.Name}`.bgRed);
        }
      }
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
};

module.exports.restoreMedicineStock = async (request, response, next) => {
  // if (request.body.medicine) {
  try {
    let invoice = await InvoiceSchema.findOne({ _id: request.body.id });
    let medicine_array = invoice.medicine;
    for (let medicine of medicine_array) {
      let med = await medicineSchema.findOneAndUpdate(
        { _id: medicine.medicineID },
        { $inc: { Stock: +medicine.quantity } }
      );
      if (med.Stock < 1000) {
        console.log(`low stock of medicine ${med.Name}`.bgRed);
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};

/////////////////////  check the if   the doctor work at this clinic or not

module.exports.doesDoctorWorkInClinic = async (request, response, next) => {
  const clinicData = await clinicSchema.findOne({ _id: request.body.clinicID });

  let flag = clinicData.doctorsID.includes(request.body.doctorID);
  if (flag) {
    next();
  } else next(new Error("this doctor doesn`t work at this clinic at this time "));
};
