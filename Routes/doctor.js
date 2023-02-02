const express = require("express");
const controller = require("./../Controllers/doctor");
const router = express.Router();
const whoIsValid = require("../Middlewares/AuthorizeRole");

router
  .route("/doctor")
  .get(whoIsValid("admin", "employee"), controller.getAllDoctors)
  .post(whoIsValid("admin", "employee"), controller.addDoctor)
  .patch(whoIsValid("admin"), controller.editDoctor)
  .delete(whoIsValid("admin"), controller.deleteFilteredDoctor);

router
  .route("/doctor/:id")
  .get(controller.getOneDoctor)
  .delete(whoIsValid("admin"), controller.deleteDoctor);

module.exports = router;
