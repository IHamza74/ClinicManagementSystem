const express = require("express");

const controller = require("./../Controllers/patient");
const router = express.Router();
const whoIsValid = require("../Middlewares/AuthorizeRole");

router
  .route("/patient")
  .get( whoIsValid("employee", "admin", "doctor"),controller.getAllPatients)
  .post( whoIsValid("employee", "admin", "doctor"),controller.addPatient)
  .patch(whoIsValid("employee", "doctor", "patient"), controller.editPatient)
  .delete(
    whoIsValid("employee", "admin", "doctor"),
    controller.deleteFilteredPatient
  );

module.exports = router;
