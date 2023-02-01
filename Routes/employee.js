const express = require("express");
const controller = require("./../Controllers/employee");
const router = express.Router();
const whoIsValid = require("../Middlewares/AuthorizeRole")

router
  .route("/employee")
  .get(whoIsValid('admin'),controller.getAllEmployees)
  .post(whoIsValid('admin'),controller.addEmployee)
  .patch(whoIsValid('admin'),controller.editEmployee)
  .delete(whoIsValid('admin'),controller.deleteEmployee);
module.exports = router;
