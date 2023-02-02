const express = require("express");
const controller = require("./../Controllers/invoice");
const router = express.Router();
const authenticationMW = require("./../Middlewares/AuthenticationMW");
const whoIsValid = require("../Middlewares/AuthorizeRole");

router
  .route("/invoice")
  .get(whoIsValid("employee"), controller.getAllInvoices)
  .post(whoIsValid("employee"), controller.addInvoice)
  .patch(whoIsValid("employee"), controller.editInvoice)
  .delete(whoIsValid("admin"), controller.deleteFilteredInvoice);

router.route("/invoice/:id").delete(
  // param("id").isInt().withMessage("ID should be an Int"),
  controller.deleteInvoice
);
module.exports = router;
