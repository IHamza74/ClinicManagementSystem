const express = require("express");
const controller = require("./../Controllers/prescription");
const router = express.Router();
const whoIsValid = require("../Middlewares/AuthorizeRole")

router
  .route("/prescription")
  .get(whoIsValid('doctor'),controller.getAllPrescriptions)
  .post(whoIsValid('doctor'),controller.addPrescription)
  .patch(whoIsValid('doctor'),controller.editPrescription)
  .delete(whoIsValid('doctor'),controller.deletePrescription);

router.route("/prescription/:id").get(controller.getPrescriptionsById);
module.exports = router;
