const express = require("express");
const controller = require("./../Controllers/invoice");
const router = express.Router();
const authenticationMW = require("./../Middlewares/AuthenticationMW");
const whoIsValid = require("../Middlewares/AuthorizeRole");
const { body, param } = require("express-validator");
const validator = require("./../Middlewares/errorValidation");

let validationArray = [
  body("id").isMongoId().withMessage("id should be Mongo Id"),
  body("medicine").isArray().withMessage("Medicine should be Array"),
  body("medicine.*.medicineID")
    .isMongoId()
    .withMessage("medicineID should be Mongo Id"),
  body("medicine.*.quantity").isInt().withMessage("quantity should be Integer"),
  body("money").isInt().withMessage("Money should be Integer"),
  body("appointmentID")
    .isMongoId("AppointmentID should be Mongo ID")
    .withMessage("appointmentID sholuld be Mongo ID"),
  body("paymentMethod")
    .isAlpha()
    .withMessage("paymentMethod should be Alpha")
    .isIn(["Cash", "Credit Card", "Insurance Card"])
    .withMessage(
      "Paymentmethod should be in (Cash,Credit Card,Insurance Card) "
    ),
  body("patientID").isMongoId().withMessage("patientID sholuld be Mongo ID"),
];
router
  .route("/invoice")
  .get(whoIsValid("employee"), controller.getAllInvoices)
  .post(
    whoIsValid("employee"),
    validationArray.slice(1),
    validator,
    controller.addInvoice
  )
  .patch(
    whoIsValid("employee"),
    validationArray,
    validator,
    controller.editInvoice
  )
  .delete(whoIsValid("admin"), controller.deleteFilteredInvoice);

router
  .route("/invoice/:id")
  .delete(
    param("id").isMongoId().withMessage("ID should be an Mongo ID"),
    validator,
    controller.deleteInvoice
  )
  .get(
    param("id").isMongoId().withMessage("ID should be an Mongo ID"),
    validator,
    controller.getInvoicebyID
  );

router
  .route("/invoice//allreports")
  .get(whoIsValid("admin", "employee"), controller.AllInvoicesReports);

router
  .route("/invoice//dailyreports")
  .get(whoIsValid("admin", "employee"), controller.DailyInvoicesReports);

router
  .route("/invoice//patientreports/:id")
  .get(
    whoIsValid("admin", "employee"),
    param("id").isMongoId().withMessage("ID should be an Mongo ID"),
    validator,
    controller.PatientInvoicesReports
  );

module.exports = router;
