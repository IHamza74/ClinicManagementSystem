const express = require("express");
const controller = require("./../Controllers/appointmentScheduler");
const teacherValidationArray = require("./../validation/appointmentScheduler");
const router = express.Router();
const whoIsValid = require("../Middlewares/AuthorizeRole");

const sendEmail = require("./../utils/email");

const customeMiddlewares = require("../Middlewares/customeFunctionalities");

const { body, param } = require("express-validator");
const validator = require("./../Middlewares/errorValidation");

let validationArray = [
  // id , patientID , doctorID , clinicID , employeeID , date
  body("id").isMongoId().withMessage("id should be Mongo Id"),
  body("patientID").isMongoId().withMessage("patientID should be Mongo Id"),
  body("doctorID").isMongoId().withMessage("doctorID should be Mongo Id"),
  body("clinicID").isMongoId().withMessage("clinicID should be Mongo Id"),
  body("employeeID").isMongoId().withMessage("employeeID should be Mongo Id"),
  body("date").isISO8601().toDate().withMessage("date should be date"),
];

router
  .route("/appointmentScheduler")
  .get(whoIsValid("admin", "employee"), controller.getAllAppointments)
  .post(
    whoIsValid("admin", "employee"),
    validationArray.slice(1),
    validator,
    customeMiddlewares.doesPatientExist,
    customeMiddlewares.doesDoctorExist,
    customeMiddlewares.isDoctorAvailable,
    customeMiddlewares.doesClinicExist,
    customeMiddlewares.doesEmployeeExist,
    sendEmail(),
    controller.addAppointment,
    customeMiddlewares.addAppointmentToPatientOrDoctor,
  )

  .patch(
    whoIsValid("admin", "employee"),
    validationArray,
    validator,
    customeMiddlewares.doesPatientExist,
    customeMiddlewares.doesDoctorExist,
    customeMiddlewares.isDoctorAvailable,
    customeMiddlewares.doesClinicExist,
    customeMiddlewares.doesEmployeeExist,
    controller.editAppointment
  )

  .delete(
    whoIsValid("admin", "employee"),
    controller.deleteFilteredAppointment
  );

router
  .route("/appointmentScheduler/:id")

  .get(
    param("id").isMongoId().withMessage("ID should be an Mongo ID"),
    validator,
    controller.getOneAppointment
  )
  .delete(
    param("id").isMongoId().withMessage("ID should be an Mongo ID"),
    validator,
    controller.deleteAppointment
  );
module.exports = router;

router
  .route("/appointmentScheduler//allreports")
  .get(whoIsValid('admin', 'employee'), controller.AllAppointmentsReports)

router
  .route("/appointmentScheduler//dailyreports")
  .get(whoIsValid('admin', 'employee'), controller.DailyAppointmentsReports)

router
  .route("/appointmentScheduler//doctorreports")
  .get(whoIsValid('admin', 'employee'), controller.DoctorAppointmentsReports)


router
  .route("/appointmentScheduler//patientreports")
  .get(whoIsValid('admin', 'employee'), controller.PatientAppointmentsReports)

