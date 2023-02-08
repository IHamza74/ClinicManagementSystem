const express = require("express");

const controller = require("./../Controllers/patient");
const router = express.Router();
const whoIsValid = require("../Middlewares/AuthorizeRole");

const { body, param } = require("express-validator");
const validator = require("./../Middlewares/errorValidation");
const checkmail = require("../Middlewares/checkMailExisits");

const customeMiddlewares = require("../Middlewares/customeFunctionalities");

let validationArray = [
  body("Name").isString().withMessage("name should be String"),
  body("Age").isInt().withMessage("age should be integer"),
  body("Address").isObject().withMessage("Address should be Object"),

  body("Address.government")
    .isString()
    .withMessage("government should be String"),
  body("Address.city").isString().withMessage("city should be String"),
  body("Address.street").isString().withMessage("street should be String"),
  body("Address.building").isString().withMessage("building should be String"),

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

let patchValidationArray = [
  body("id").isMongoId().withMessage("id should be Mongo Id"),
  body("Name").isString().withMessage("name should be String").optional(),
  body("Age").isInt().withMessage("age should be integer").optional(),
  body("Address").isObject().withMessage("Address should be Object").optional(),
  body("address.government").isString().withMessage("government should be String").optional(),
  body("address.city").isString().withMessage("city should be String").optional(),
  body("address.street").isString().withMessage("street should be String").optional(),
  body("address.building").isString().withMessage("building should be String").optional(),
  body("appointmentNo").isArray().withMessage("appointmentNo should be Array").optional(),
  body("appointmentNo.*").isMongoId().withMessage("appointmentNo should be Mongo ID"),
  body("Disease").isString().withMessage("Disease should be String").optional(),
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
    )
    .optional(),
  body("email").isEmail().withMessage("email should be a valid email").optional(),
  body("password")
    .isString()
    .withMessage("password sholuld be String")
    .isLength({ min: 8 })
    .withMessage("password sholuld be 8 characters or more")
    .optional(),
  body("photo").isString().withMessage("photo should be String").optional(),
];

router
  .route("/patient")
  .get(whoIsValid("employee", "admin", "doctor"), controller.getAllPatients)
  .post(whoIsValid("employee", "admin", "doctor"), validationArray, validator, checkmail, controller.addPatient)
  .patch(
    whoIsValid("employee", "doctor"),
    validationArray,
    whoIsValid("employee", "doctor", "patient", "admin"),
    patchValidationArray,
    validator,
    controller.uploadPatientImg,
    controller.editPatient
  )
  .delete(whoIsValid("employee", "admin", "doctor"), controller.deleteFilteredPatient);
/*  reserve an appointment by patient */
router
  .route("/patient/reserveappointment/:id")
  .post(
    whoIsValid("patient"),
    param("id").isMongoId().withMessage("ID should be an Mongo ID"),
    validator,
    customeMiddlewares.doesClinicExist,
    controller.reserveAppointment
  );

router
  .route("/patient/:id")
  .get(param("id").isMongoId().withMessage("ID should be an Mongo ID"), validator, controller.getpatientProfile);

module.exports = router;
