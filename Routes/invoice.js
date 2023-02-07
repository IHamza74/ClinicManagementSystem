const express = require("express");
const controller = require("./../Controllers/invoice");
const router = express.Router();
const authenticationMW = require("./../Middlewares/AuthenticationMW");
const whoIsValid = require("../Middlewares/AuthorizeRole");
const { body, param } = require("express-validator");
const validator = require("./../Middlewares/errorValidation");
const customeMW = require("../Middlewares/customeFunctionalities");

let validationArray = [
  body("id").isMongoId().withMessage("id should be Mongo Id"),
  body("medicine").isArray().withMessage("Medicine should be Array"),
  body("medicine.*.medicineID").isMongoId().withMessage("medicineID should be Mongo Id"),
  body("medicine.*.quantity").isInt().withMessage("quantity should be Integer"),
  body("money").isInt().withMessage("Money should be Integer"),
  body("appointmentId").isMongoId().withMessage("appointmentID sholuld be Mongo ID"),
  body("paymentMethod")
    .isAlpha()
    .withMessage("paymentMethod should be Alpha")
    .isIn(["Cash", "Credit Card", "Insurance Card"])
    .withMessage("Paymentmethod should be in (Cash,Credit Card,Insurance Card) "),
  body("patientID").isMongoId().withMessage("patientID sholuld be Mongo ID"),
];

let patchValidationArray = [
  body("id").isMongoId().withMessage("id should be Mongo Id"),
  body("medicine").isArray().withMessage("Medicine should be Array").optional(),
  body("medicine.*.medicineID").isMongoId().withMessage("medicineID should be Mongo Id"),
  body("medicine.*.quantity").isInt().withMessage("quantity should be Integer"),
  body("money").isInt().withMessage("Money should be Integer").optional(),
  body("appointmentId").isMongoId().withMessage("appointmentID sholuld be Mongo ID").optional(),
  body("paymentMethod")
    .isString()
    .withMessage("paymentMethod should be String")
    .isIn(["Cash", "Credit Card", "Insurance Card"])
    .withMessage("Paymentmethod should be in (Cash,Credit Card,Insurance Card) ")
    .optional(),
  body("patientID").isMongoId().withMessage("patientID sholuld be Mongo ID").optional(),
];

router
  .route("/invoice")
  .get(whoIsValid("employee", "admin"), controller.getAllInvoices)
  .post(
    whoIsValid("employee", "admin"),
    validationArray.slice(1),
    validator,
    customeMW.doesPatientExist,
    customeMW.DoMedicineExist,
    customeMW.doesAppointmentExist,
    customeMW.medicineStockMangement,
    controller.addInvoice
  )
  .patch(
    whoIsValid("employee", "admin"),
    patchValidationArray,
    validator,
    customeMW.DoMedicineExist,
    customeMW.doesAppointmentExist,
    controller.editInvoice
  )
  .delete(whoIsValid("admin"), controller.deleteFilteredInvoice);

router
  .route("/invoice/:id")
  .delete(param("id").isMongoId().withMessage("ID should be an Mongo ID"), validator, controller.deleteInvoice)
  .get(param("id").isMongoId().withMessage("ID should be an Mongo ID"), validator, controller.getInvoicebyID);

router.route("/invoice//allreports").get(whoIsValid("admin", "employee"), controller.AllInvoicesReports);

router.route("/invoice//dailyreports").get(whoIsValid("admin", "employee"), controller.DailyInvoicesReports);

router
  .route("/invoice//patientreports/:id")
  .get(
    whoIsValid("admin", "employee"),
    param("id").isMongoId().withMessage("ID should be an Mongo ID"),
    validator,
    controller.PatientInvoicesReports
  );

module.exports = router;
