const express = require("express");
const controller = require("./../Controllers/doctor");
const router = express.Router();
const whoIsValid = require("../Middlewares/AuthorizeRole");
const checkmail = require("../Middlewares/checkMailExisits");
const { body, param } = require("express-validator");
const validator = require("./../Middlewares/errorValidation");

let validationArray = [
  body("name").isString().withMessage("name should be String"),
  body("age").isInt().withMessage("age should be integer"),
  body("speciality")
    .isString()
    .withMessage("speciality should be String")
    .isIn([
      "Internist",
      "Optometrist",
      "orthopedist",
      "Dentist",
      "Urologist",
      "Surgeon",
    ])
    .withMessage(
      "speciality should be in (Internist,Optometrist,orthopedist,Dentist,Urologist,Surgeon) "
    ),
  body("email").isEmail().withMessage("email should be a valid email"),
  body("workingHours").isInt().withMessage("workingHours sholuld be Integer"),
  body("appointmentNo")
    .isArray()
    .withMessage("appointmentNo should be Array")
    .optional(),
  body("appointmentNo.*")
    .isMongoId()
    .withMessage("appointmentNo should be Mongo ID"),
  body("password")
    .isString()
    .withMessage("password sholuld be String")
    .isLength({ min: 8 })
    .withMessage("password sholuld be 8 characters or more"),
  // body("photo").isString().withMessage("photo should be String").optional(),
];
let patchValidationArray = [
  body("id").isMongoId().withMessage("id should be Mongo Id"),
  body("name").isString().withMessage("name should be String").optional(),
  body("age").isInt().withMessage("age should be integer").optional(),
  body("speciality")
    .isString()
    .withMessage("speciality should be String")
    .isIn([
      "Internist",
      "Optometrist",
      "orthopedist",
      "Dentist",
      "Urologist",
      "Surgeon",
    ])
    .withMessage(
      "speciality should be in (Internist,Optometrist,orthopedist,Dentist,Urologist,Surgeon) "
    )
    .optional(),
  body("email")
    .isEmail()
    .withMessage("email should be a valid email")
    .optional(),
  body("workingHours")
    .isInt()
    .withMessage("workingHours sholuld be Integer")
    .optional(),
  body("appointmentNo")
    .isArray()
    .withMessage("appointmentNo should be Array")
    .optional(),
  body("appointmentNo.*")
    .isMongoId()
    .withMessage("appointmentNo should be Mongo ID"),
  body("password")
    .isString()
    .withMessage("password sholuld be String")
    .isLength({ min: 8 })
    .withMessage("password sholuld be 8 characters or more")
    .optional(),
  // body("photo").isString().withMessage("photo should be String").optional(),
];

router
  .route("/doctor")
  .get(whoIsValid("admin", "employee"), controller.getAllDoctors)
  .post(
    whoIsValid("admin", "employee"),
    checkmail,
    validationArray.slice(1),
    validator,
    controller.addDoctor
  )
  .patch(
    whoIsValid("admin"),
    patchValidationArray,
    validator,
    // checkmail,
    controller.editDoctor
  )
  .delete(whoIsValid("admin"), controller.deleteFilteredDoctor);

router
  .route("/doctor/uploadPhoto")
  .patch(controller.uploadDoctorImg, controller.patchPhoto);

router
  .route("/doctor/:id")
  .get(
    param("id").isMongoId().withMessage("ID should be an Mongo ID"),
    validator,
    controller.getOneDoctor
  )
  .delete(
    param("id").isMongoId().withMessage("ID should be an Mongo ID"),
    validator,
    whoIsValid("admin"),
    controller.deleteDoctor
  );

module.exports = router;
