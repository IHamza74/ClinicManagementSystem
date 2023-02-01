const express = require("express");
const controller = require("./../Controllers/clinic");
const router = express.Router();
const whoIsValid = require("../Middlewares/AuthorizeRole")

router
  .route("/clinic")
  .get(whoIsValid('admin'),controller.getAllClinics)
  .post(whoIsValid('admin'),controller.addClinic)
  .patch(whoIsValid('admin'),controller.editClinic)
  .delete(whoIsValid('admin'),controller.deleteClinic);

module.exports = router;
