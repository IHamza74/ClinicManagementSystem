const express = require("express");
const controller = require("./../Controllers/paymentController");
const router = express.Router();
const whoIsValid = require("../Middlewares/AuthorizeRole");
const { param } = require("express-validator");
const validator = require("./../Middlewares/errorValidation");

router
  .route("/checkout-session/:invoiceId")
  .get(
    whoIsValid("employee"),
    param("invoiceId").isMongoId().withMessage("invoiceId should be an Mongo ID"),
    validator,
    controller.getCgeckoutSession
  );

module.exports = router;
