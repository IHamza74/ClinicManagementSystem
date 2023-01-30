const express = require("express");
const controller = require("./../Controllers/invoice");
const router = express.Router();

router
  .route("/invoice")
  .get(controller.getAllInvoices)
  .post(controller.addInvoice)
  .patch(controller.editInvoice)
  .delete(controller.deleteInvoice);

module.exports = router;
