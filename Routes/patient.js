const express = require("express");
const controller = require("./../Controllers/patient");
const router = express.Router();

router
  .route("/patient")
  .get(controller.getAllPatients)
  .post(controller.addPatient)
  .patch(controller.editPatient)
  .delete(controller.deletePatient);
  

module.exports = router;
