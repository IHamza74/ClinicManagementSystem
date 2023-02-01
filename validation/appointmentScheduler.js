const { body, query, param, validationResult } = require("express-validator");

exports.postPatchValidation = [
  body("id").isInt().withMessage("ID should be number"),
  body("patientID").isInt().withMessage("Patient ID should be number"),
  body("doctorID").isInt().withMessage("Doctor ID should be number"),
  body("clinicID").isInt().withMessage("Clinic ID should be number"),
  body("employeeID").isInt().withMessage("Employee ID should be number"),
  body("date").isEmail().withMessage("Enter Valid date"),
];
