const express = require("express");
const controller = require("./../Controllers/invoice");
const router = express.Router();
const authenticationMW = require("./../Middlewares/AuthenticationMW");
const whoIsValid = require("../Middlewares/AuthorizeRole");
const customeMW = require("../Middlewares/customeFunctionalities")

router
  .route("/invoice")
  .get(whoIsValid("admin", "employee"), controller.getAllInvoices)
  .post(whoIsValid("admin", "employee"), customeMW.DoMedicineExist, customeMW.doesAppointmentExist, controller.addInvoice)
  .patch(whoIsValid("admin", "employee"), customeMW.DoMedicineExist, customeMW.doesAppointmentExist, controller.editInvoice)
  .delete(whoIsValid("admin"), controller.deleteFilteredInvoice);

router.route("/invoice/:id").delete(
  // param("id").isInt().withMessage("ID should be an Int"),
  controller.deleteInvoice
);

module.exports = router;
