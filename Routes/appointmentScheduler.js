const express = require("express");
const controller = require("./../Controllers/appointmentScheduler");
const teacherValidationArray = require("./../validation/appointmentScheduler");
const router = express.Router();
const whoIsValid = require("../Middlewares/AuthorizeRole");
<<<<<<< HEAD
const sendEmail = require("./../utils/email");
router
  .route("/appointmentScheduler")
  .get(whoIsValid("admin", "employee"), controller.getAllAppointments)
  .post(
    whoIsValid("admin", "employee"),
    sendEmail("example@example.com"),
    controller.addAppointment
  )
=======
const customeMiddlewares = require("../Middlewares/customeFunctionalities")

router
  .route("/appointmentScheduler")
  .get(whoIsValid("admin", "employee"), controller.getAllAppointments)
<<<<<<< HEAD
  .post(whoIsValid("admin", "employee"), customeMiddlewares.isDoctorAvailable, controller.addAppointment)
>>>>>>> 1491c772979955a4e078386301052b2163d02d91
  .patch(whoIsValid("admin", "employee"), controller.editAppointment);
=======
  .post(whoIsValid("admin", "employee"), controller.addAppointment)
  .patch(whoIsValid("admin", "employee"), controller.editAppointment)
  .delete(
    whoIsValid("admin", "employee"),
    controller.deleteFilteredAppointment
  );
>>>>>>> 77eec0247688cc39b48a97a7662c85d75f7f6041

router
  .route("/appointmentScheduler/:id")
  .get(controller.getOneAppointment)
  .delete(controller.deleteAppointment);
module.exports = router;

router 
.route("/appointmentScheduler//allreports")
.get(whoIsValid('admin','employee'),controller.AllAppointmentsReports)

router 
.route("/appointmentScheduler//dailyreports")
.get(whoIsValid('admin','employee'),controller.DailyAppointmentsReports)

router 
.route("/appointmentScheduler//doctorreports")
.get(whoIsValid('admin','employee'),controller.DoctorAppointmentsReports)


router 
.route("/appointmentScheduler//patientreports")
.get(whoIsValid('admin','employee'),controller.PatientAppointmentsReports)

