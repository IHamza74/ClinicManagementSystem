const express = require("express");
const controller = require("./../Controllers/appointmentScheduler");
const teacherValidationArray = require("./../validation/appointmentScheduler");
const router = express.Router();
const whoIsValid = require("../Middlewares/AuthorizeRole");
const customeMiddlewares = require("../Middlewares/customeFunctionalities")

router
  .route("/appointmentScheduler")
  .get(whoIsValid("admin", "employee"), controller.getAllAppointments)
  .post(whoIsValid("admin", "employee"), customeMiddlewares.isDoctorAvailable, controller.addAppointment)
  .patch(whoIsValid("admin", "employee"), controller.editAppointment);

router
  .route("/appointmentScheduler/:id")
  .get(controller.getOneAppointment)
  .delete(controller.deleteAppointment);
module.exports = router;
