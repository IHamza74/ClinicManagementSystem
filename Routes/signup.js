const express = require("express");
const router = express.Router();
const checkmail = require("../Middlewares/checkMailExisits");
const signup = require("../Controllers/signupController");
const { body } = require("express-validator");
const validator = require("./../Middlewares/errorValidation");

let validationArray = [
  body("Name").isString().withMessage("name should be String"),
  body("Age").isInt().withMessage("age should be integer"),
  body("address").isObject().withMessage("Address should be Object"),
  body("address.government").isString().withMessage("government should be String"),
  body("address.city").isString().withMessage("city should be String"),
  body("address.street").isString().withMessage("street should be String"),
  body("address.building").isString().withMessage("building should be String"),
  body("appointmentNo").isArray().withMessage("appointmentNo should be Array"),
  body("appointmentNo.*").isMongoId().withMessage("appointmentNo should be Mongo ID"),
  body("Disease").isString().withMessage("Disease should be String"),
  body("Section")
    .isString()
    .withMessage("speciality should be String")
    .isIn([
      "Dermatology",
      "Diagnostic radiology",
      "Emergency medicine",
      "Neurology",
      "Ophthalmology",
      "Pediatrics",
      "Psychiatry",
    ])
    .withMessage(
      "Section should be in (Dermatology,Diagnostic radiology,Emergency medicine,Neurology,Ophthalmology,Pediatrics,Psychiatry) "
    ),
  body("email").isEmail().withMessage("email should be a valid email"),
  body("password")
    .isString()
    .withMessage("password sholuld be String")
    .isLength({ min: 8 })
    .withMessage("password sholuld be 8 characters or more"),
  body("photo").isString().withMessage("photo should be String").optional(),
];

router.route("/signup").post(validationArray, validator, checkmail, signup.addPatient);

module.exports = router;
