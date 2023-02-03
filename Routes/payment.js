const express = require("express");
const controller = require("./../Controllers/paymentController");
const router = express.Router();
const whoIsValid = require("../Middlewares/AuthorizeRole");

router
  .route("/checkout-session/:invoiceId")
  .get(whoIsValid("employee"), controller.getCgeckoutSession);

module.exports = router;
