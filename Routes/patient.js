const express = require("express");

const controller = require("./../Controllers/patient");
const router = express.Router();
const whoIsValid = require("../Middlewares/AuthorizeRole")

router
  .route("/patient")
  .get(whoIsValid('employee','doctor','admin'),controller.getAllPatients)
  .post(whoIsValid('employee','doctor','admin'),controller.addPatient)
  .patch(whoIsValid('employee','doctor','patient'),controller.editPatient)
  .delete(whoIsValid('employee','admin','doctor'),controller.deletePatient);
  

module.exports = router;
