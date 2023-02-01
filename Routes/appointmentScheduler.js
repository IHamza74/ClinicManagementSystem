const express = require("express");
const controller = require("./../Controllers/appointmentScheduler");
const teacherValidationArray = require("./../validation/appointmentScheduler");
const router = express.Router();
const whoIsValid = require("../Middlewares/AuthorizeRole");

router
  .route("/appointmentScheduler")
<<<<<<< HEAD
  .get(whoIsValid("employee"), controller.getAllAppointments)
  .post(whoIsValid("employee"), controller.addAppointment)
  .patch(whoIsValid("employee"), controller.editAppointment)
  .delete(whoIsValid("employee"), controller.deleteAppointment)

  .get(controller.getAllAppointments)
  .post(controller.addAppointment)
  .patch(controller.editAppointment);
=======
  .get(whoIsValid("admin", "employee"), controller.getAllAppointments)
  .post(whoIsValid("admin", "employee"), controller.addAppointment)
  .patch(whoIsValid("admin", "employee"), controller.editAppointment);
>>>>>>> 51f0b873c0271c3f2c0afdfdee47d64ade447ce1

router
  .route("/appointmentScheduler/:id")
  .get(controller.getOneAppointment)
  .delete(controller.deleteAppointment);
module.exports = router;
