const express = require("express");
const controller = require("./../Controllers/appointmentScheduler");
const router = express.Router();
const whoIsValid = require("../Middlewares/AuthorizeRole")

router
  .route("/appointmentScheduler")
  .get(whoIsValid('employee'),controller.getAllAppointments)
  .post(whoIsValid('employee'),controller.addAppointment)
  .patch(whoIsValid('employee'),controller.editAppointment)
  .delete(whoIsValid('employee'),controller.deleteAppointment);

module.exports = router;
