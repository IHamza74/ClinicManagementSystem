const express = require("express");
const controller = require("./../Controllers/clinic");
const router = express.Router();

router
  .route("/clinic")
  .get(controller.getAllClinics)
  .post(controller.addClinic)
  .patch(controller.editClinic)
  .delete(controller.deleteClinic);

module.exports = router;
