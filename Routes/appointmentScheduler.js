const express = require("express");
const controller = require("./../Controllers/appointmentScheduler");
const teacherValidationArray = require("./../validation/appointmentScheduler");
const router = express.Router();
const whoIsValid = require("../Middlewares/AuthorizeRole");

router
  .route("/appointmentScheduler")
  .get(whoIsValid("employee"), controller.getAllAppointments)
  .post(whoIsValid("employee"), controller.addAppointment)
  .patch(whoIsValid("employee"), controller.editAppointment)
  .delete(whoIsValid("employee"), controller.deleteAppointment)

  .get(controller.getAllAppointments)
  .post(controller.addAppointment)
  .patch(controller.editAppointment);

router
  .route("/appointmentScheduler/:id")
  .get(controller.getOneAppointment)
  .delete(controller.deleteAppointment);
module.exports = router;
