const express = require("express");
const controller = require("./../Controllers/prescription");
const router = express.Router();

router
  .route("/prescription")
  .get(controller.getAllPrescriptions)
  .post(controller.addPrescription)
  .patch(controller.editPrescription)
  .delete(controller.deletePrescription);

module.exports = router;