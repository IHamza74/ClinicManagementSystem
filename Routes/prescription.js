const express = require("express");
const controller = require("./../Controllers/prescription");
const router = express.Router();
const whoIsValid = require("../Middlewares/AuthorizeRole");
const CustomeMW = require("../Middlewares/customeFunctionalities");

const { body, param } = require("express-validator");
const validator = require("./../Middlewares/errorValidation");

let validationArray = [
  body("medicine").isArray().withMessage("Medicine should be Array"),
  body("medicine.*.medicineID").isMongoId().withMessage("medicineID should be Mongo Id"),
  body("medicine.*.quantity").isInt().withMessage("quantity should be Integer"),
  body("appointmentId").isMongoId().withMessage("appointmentID sholuld be Mongo ID"),
];
let patchValidationArray = [
  body("id").isMongoId().withMessage("id should be Mongo Id"),
  body("medicine").isArray().withMessage("Medicine should be Array").optional(),
  body("medicine.*.medicineID").isMongoId().withMessage("medicineID should be Mongo Id"),
  body("medicine.*.quantity").isInt().withMessage("quantity should be Integer"),
  body("appointmentId").isMongoId().withMessage("appointmentID sholuld be Mongo ID").optional(),
];

router
  .route("/prescription")
  .get(whoIsValid("doctor", "admin"), controller.getAllPrescriptions)
  .post(
    whoIsValid("doctor", "admin"),
    validationArray,
    validator,
    CustomeMW.DoMedicineExist,
    CustomeMW.doesAppointmentExist,
    controller.addPrescription
  )
  .patch(
    whoIsValid("doctor", "admin"),
    patchValidationArray,
    validator,
    CustomeMW.DoMedicineExist,
    CustomeMW.doesAppointmentExist,
    controller.editPrescription
  );

router
  .route("/prescription/:id")
  .get(
    whoIsValid("admin", "employee", "doctor"),
    param("id").isMongoId().withMessage("ID should be an Mongo ID"),
    validator,
    whoIsValid("doctor"),
    controller.getPrescriptionsById
  )
  .delete(
    whoIsValid("doctor", "admin"),
    param("id").isMongoId().withMessage("ID should be an Mongo ID"),
    validator,
    controller.deletePrescriptionById
  );

module.exports = router;
