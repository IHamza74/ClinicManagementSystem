const express = require("express");
const controller = require("./../Controllers/employee");
const router = express.Router();

router
  .route("/employee")
  .get(controller.getAllEmployees)
  .post(controller.addEmployee)
  .patch(controller.editEmployee)
  .delete(controller.deleteEmployee);
module.exports = router;
