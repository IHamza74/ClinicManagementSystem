const express = require("express");
const controller = require("./../Controllers/prescription");
const router = express.Router();
const whoIsValid = require("../Middlewares/AuthorizeRole");

router
  .route("/prescription")
  .get(whoIsValid("admin"), controller.getAllPrescriptions)
  .post(whoIsValid("admin"), controller.addPrescription)
  .patch(whoIsValid("doctor"), controller.editPrescription)
  .delete(whoIsValid("doctor"), controller.deletePrescription);

router.route("/prescription/:id").get(whoIsValid("admin"), controller.getPrescriptionsById);
module.exports = router;
