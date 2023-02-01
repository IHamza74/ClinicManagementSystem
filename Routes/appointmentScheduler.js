const express = require("express");
const controller = require("./../Controllers/appointmentScheduler");
const teacherValidationArray = require("./../validation/appointmentScheduler");
const router = express.Router();

router
  .route("/appointmentScheduler")
  .get(controller.getAllAppointments)
  .post(controller.addAppointment)
  .patch(controller.editAppointment);

router
  .route("/appointmentScheduler/:id")
  .get(controller.getOneAppointment)
  .delete(controller.deleteAppointment);
module.exports = router;
