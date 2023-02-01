const express = require("express");
const controller = require("./../Controllers/doctor");
const router = express.Router();

router
  .route("/doctor")
  .get(controller.getAllDoctors)
  .post(controller.addDoctor)
  .patch(controller.editDoctor);

router
  .route("/doctor/:id")
  .get(controller.getOneDoctor)
  .delete(controller.deleteDoctor);

module.exports = router;
