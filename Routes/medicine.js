const express = require("express");
const controller = require("./../Controllers/medicine");
const router = express.Router();
const whoIsValid = require("../Middlewares/AuthorizeRole");

router
  .route("/medicine")
  .get(whoIsValid("employee", "doctor"), controller.getAllMedicines)
  .post(whoIsValid("employee", "doctor"), controller.addMedicine)
  .patch(whoIsValid("employee", "doctor"), controller.editMedicine)
  .delete(whoIsValid("employee", "doctor"), controller.deleteFilteredMedicine);

module.exports = router;
