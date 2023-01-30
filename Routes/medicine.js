const express = require("express");
const controller = require("./../Controllers/medicine");
const router = express.Router();

router
  .route("/medicine")
  .get(controller.getAllMedicines)
  .post(controller.addMedicine)
  .patch(controller.editMedicine)
  .delete(controller.deleteMedicine);

module.exports = router;
