const express = require("express");
const controller = require("./../Controllers/invoice");
const router = express.Router();
const authenticationMW = require("./../Middlewares/AuthenticationMW");

router
  .route("/invoice")
  .get(controller.getAllInvoices)
  .post(controller.addInvoice)
  .patch(controller.editInvoice);

router.route("/invoice/:id").delete(
  // param("id").isInt().withMessage("ID should be an Int"),
  controller.deleteInvoice
);
module.exports = router;
