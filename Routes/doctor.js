const express = require("express");
const controller = require("./../Controllers/doctor");
const router = express.Router();

router
  .route("/doctor")
  .get(controller.getAllDoctors)
  .post(controller.addDoctor)
  .patch(controller.editDoctor)
  .delete(controller.deleteDoctor);

module.exports = router;
