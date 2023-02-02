const express = require("express");
const controller = require("./../Controllers/appointmentScheduler");
const teacherValidationArray = require("./../validation/appointmentScheduler");
const router = express.Router();
const whoIsValid = require("../Middlewares/AuthorizeRole");

router
  .route("/appointmentScheduler")
  .get(whoIsValid("admin", "employee"), controller.getAllAppointments)
  .post(whoIsValid("admin", "employee"), controller.addAppointment)
  .patch(whoIsValid("admin", "employee"), controller.editAppointment)
  .delete(
    whoIsValid("admin", "employee"),
    controller.deleteFilteredAppointment
  );

router
  .route("/appointmentScheduler/:id")
  .get(controller.getOneAppointment)
  .delete(controller.deleteAppointment);
module.exports = router;
