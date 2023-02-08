const express = require("express");
const controller = require("./../Controllers/employee");
const router = express.Router();
const whoIsValid = require("../Middlewares/AuthorizeRole");
const checkmail = require("../Middlewares/checkMailExisits");

const { body, param } = require("express-validator");
const validator = require("./../Middlewares/errorValidation");

let validationArray = [
  body("name").isString().withMessage("name should be String"),
  body("age").isInt().withMessage("age should be integer"),
  body("email").isEmail().withMessage("email should be a valid email"),
  body("address").isObject().withMessage("address should be Object"),
  body("address.government").isString().withMessage("government should be String"),
  body("address.city").isString().withMessage("city should be String"),
  body("address.street").isString().withMessage("street should be String"),
  body("address.building").isString().withMessage("building should be String"),

  body("password")
    .isString()
    .withMessage("password sholuld be String")
    .isLength({ min: 8 })
    .withMessage("password sholuld be 8 characters or more"),
  body("photo").isString().withMessage("photo should be String").optional(),
];

let patchValidationArray = [
  body("id").isMongoId().withMessage("id should be Mongo Id"),
  body("name").isString().withMessage("name should be String").optional(),
  body("age").isInt().withMessage("age should be integer").optional(),
  body("email").isEmail().withMessage("email should be a valid email").optional(),
  body("address").isObject().withMessage("address should be Object").optional(),
  body("address.government").isString().withMessage("government should be String").optional(),
  body("address.city").isString().withMessage("city should be String").optional(),
  body("address.street").isString().withMessage("street should be String").optional(),
  body("address.building").isString().withMessage("building should be String").optional(),
  body("password")
    .isString()
    .withMessage("password sholuld be String")
    .isLength({ min: 8 })
    .withMessage("password sholuld be 8 characters or more")
    .optional(),
  body("photo").isString().withMessage("photo should be String").optional(),
];

router
  .route("/employee")
  .get(whoIsValid("admin"), controller.getAllEmployees)
  .post(whoIsValid("admin"), validationArray, validator, checkmail, controller.addEmployee)
  .patch(whoIsValid("admin"), patchValidationArray, validator, controller.uploadEmployeeImg, controller.editEmployee)
  .delete(whoIsValid("admin"), controller.deleteFilteredEmployee);
module.exports = router;
