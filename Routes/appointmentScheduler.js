const express = require("express");
const controller = require("./../Controllers/appointmentScheduler");
const teacherValidationArray = require("./../validation/appointmentScheduler");
const router = express.Router();
const whoIsValid = require("../Middlewares/AuthorizeRole");

const sendEmail = require("./../utils/email");

const customeMiddlewares = require("../Middlewares/customeFunctionalities");

router
  .route("/appointmentScheduler")
  .get(whoIsValid("admin", "employee"), controller.getAllAppointments)

  .post(
    whoIsValid("admin", "employee"),
    customeMiddlewares.isDoctorAvailable,
    sendEmail(),
    controller.addAppointment
  )

  .patch(whoIsValid("admin", "employee"), controller.editAppointment)

  .delete(whoIsValid("admin", "employee"), controller.deleteFilteredAppointment);

router
  .route("/appointmentScheduler/:id")
  .get(controller.getOneAppointment)
  .delete(controller.deleteAppointment);
module.exports = router;

router
  .route("/appointmentScheduler//allreports")
  .get(whoIsValid("admin", "employee"), controller.AllAppointmentsReports);

router
  .route("/appointmentScheduler//dailyreports")
  .get(whoIsValid("admin", "employee"), controller.DailyAppointmentsReports);

router
  .route("/appointmentScheduler//doctorreports")
  .get(whoIsValid("admin", "employee"), controller.DoctorAppointmentsReports);

router
  .route("/appointmentScheduler//patientreports")
  .get(whoIsValid("admin", "employee"), controller.PatientAppointmentsReports);
