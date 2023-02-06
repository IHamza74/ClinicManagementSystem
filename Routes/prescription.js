const express = require("express");
const controller = require("./../Controllers/prescription");
const router = express.Router();
const whoIsValid = require("../Middlewares/AuthorizeRole");
const CustomeMW = require("../Middlewares/customeFunctionalities");

const { body, param } = require("express-validator");
const validator = require("./../Middlewares/errorValidation");

let validationArray = [
  //id  ,doctorId ,medicine ,appointmentId , , ,
  body("id").isMongoId().withMessage("id should be Mongo Id"),
  // body("doctorId").isMongoId().withMessage("doctorId should be Mongo Id"),

  body("medicine").isArray().withMessage("Medicine should be Array"),
  body("medicine.*.medicineID")
    .isMongoId()
    .withMessage("medicineID should be Mongo Id"),
  body("medicine.*.quantity").isInt().withMessage("quantity should be Integer"),
  body("appointmentId")
    .isMongoId()
    .withMessage("appointmentID sholuld be Mongo ID"),
];

router
  .route("/prescription")
  .get(whoIsValid("doctor", "admin"), controller.getAllPrescriptions)
  .post(
    whoIsValid("doctor", "admin"),
    validationArray.slice(1),
    validator,
    CustomeMW.DoMedicineExist,
    CustomeMW.doesAppointmentExist,
    controller.addPrescription
  )
  .patch(
    whoIsValid("doctor", "admin"),
    validationArray,
    validator,
    controller.editPrescription
  )
  .delete(whoIsValid("doctor", "admin"), controller.deleteFilteredPrescription);

router
  .route("/prescription/:id")
  .get(
    param("id").isMongoId().withMessage("ID should be an Mongo ID"),
    validator,
    whoIsValid("doctor"),
    controller.getPrescriptionsById
  );
module.exports = router;
