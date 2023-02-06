const express = require("express");
const controller = require("./../Controllers/medicine");
const router = express.Router();
const whoIsValid = require("../Middlewares/AuthorizeRole");

const { body, param } = require("express-validator");
const validator = require("./../Middlewares/errorValidation");

let validationArray = [
  //Name , Dose , Price ,Stock
  body("id").isMongoId().withMessage("id should be Mongo Id"),
  body("Name").isString().withMessage("Name should be String"),
  body("Dose").isFloat().withMessage("Name should be float"),
  body("Price").isFloat().withMessage("Name should be float"),
  body("Stock").isInt().withMessage("Name should be Integer"),
];

router
  .route("/medicine")
  .get(whoIsValid("employee", "doctor", "admin"), controller.getAllMedicines)
  .post(
    whoIsValid("employee", "doctor", "admin"),
    validationArray.slice(1),
    validator,
    controller.addMedicine
  )
  .patch(
    whoIsValid("employee", "doctor", "admin"),
    validationArray,
    validator,
    controller.editMedicine
  )
  .delete(
    whoIsValid("employee", "doctor", "admin"),
    controller.deleteFilteredMedicine
  );

module.exports = router;
