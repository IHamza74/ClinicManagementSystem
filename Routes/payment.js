const express = require("express");
const controller = require("./../Controllers/paymentController");
const router = express.Router();
const whoIsValid = require("../Middlewares/AuthorizeRole");
const { param } = require("express-validator");
const validator = require("./../Middlewares/errorValidation");

router
  .route("/checkout-session/")

  .get(whoIsValid("employee"), validator, controller.getCheckoutSession);

router.route("/checking/").get(whoIsValid("employee"), validator, controller.getCheckPayment);
module.exports = router;
