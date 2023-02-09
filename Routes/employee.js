const express = require("express");
const controller = require("./../Controllers/employee");
const router = express.Router();
const whoIsValid = require("../Middlewares/AuthorizeRole");
const checkmail = require("../Middlewares/checkMailExisits");

const { body, param } = require("express-validator");
const validator = require("./../Middlewares/errorValidation");

let postValidationArray = [
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
];

router.route("/employee/uploadPhoto").patch(controller.uploadEmployeeImg, controller.patchPhoto);

router
  .route("/employee")
  .get(whoIsValid("admin"), controller.getAllEmployees)
  .post(whoIsValid("admin"), postValidationArray, validator, checkmail, controller.addEmployee)
  .patch(whoIsValid("admin"), patchValidationArray, validator, controller.editEmployee);

router
  .route("/employee/:id")
  .delete(
    param("id").isMongoId().withMessage("ID should be an Mongo ID"),
    validator,
    whoIsValid("admin"),
    controller.deleteEmployee
  );

module.exports = router;

module.exports = router;
