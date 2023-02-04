const express = require("express");
const controller = require("./../Controllers/prescription");
const router = express.Router();
const whoIsValid = require("../Middlewares/AuthorizeRole");
const CustomeMW = require("../Middlewares/customeFunctionalities")

router
  .route("/prescription")
  .get(whoIsValid("doctor", "admin"), controller.getAllPrescriptions)
  .post(whoIsValid("doctor", "admin"), CustomeMW.DoMedicineExist, CustomeMW.doesAppointmentExist, controller.addPrescription)
  .patch(whoIsValid("doctor", "admin"), controller.editPrescription)
  .delete(whoIsValid("doctor", "admin"), controller.deleteFilteredPrescription);

router.route("/prescription/:id").get(whoIsValid("doctor"), controller.getPrescriptionsById);
module.exports = router;
