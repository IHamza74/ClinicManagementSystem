const express = require("express");
const controller = require("./../Controllers/appointmentScheduler");
const router = express.Router();

router
  .route("/appointmentScheduler")
  .get(controller.getAllAppointments)
  .post(controller.addAppointment)
  .patch(controller.editAppointment)
  .delete(controller.deleteAppointment);

module.exports = router;
