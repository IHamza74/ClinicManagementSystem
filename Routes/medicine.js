const express = require("express");
const controller = require("./../Controllers/medicine");
const router = express.Router();
const whoIsValid = require("../Middlewares/AuthorizeRole");

router
  .route("/medicine")
  .get(whoIsValid("employee", "doctor", "admin"), controller.getAllMedicines)
  .post(whoIsValid("employee", "doctor", "admin"), controller.addMedicine)
  .patch(whoIsValid("employee", "doctor", "admin"), controller.editMedicine)
  .delete(whoIsValid("employee", "doctor", "admin"), controller.deleteFilteredMedicine);

module.exports = router;
