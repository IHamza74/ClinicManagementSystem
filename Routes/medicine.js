const express = require("express");
const controller = require("./../Controllers/medicine");
const router = express.Router();
const whoIsValid = require("../Middlewares/AuthorizeRole");

const { body, param } = require("express-validator");
const validator = require("./../Middlewares/errorValidation");

let postValidationArray = [
  body("Name").isString().withMessage("Name should be String"),
  body("Dose").isFloat().withMessage("Dose should be float"),
  body("Price").isFloat().withMessage("Price should be float"),
  body("Stock").isInt().withMessage("Stock should be Integer"),
];

let patchValidationArray = [
  body("_id").isMongoId().withMessage("id should be Mongo Id"),
  body("Name").isString().withMessage("Name should be String").optional(),
  body("Dose").isFloat().withMessage("Dose should be float").optional(),
  body("Price").isFloat().withMessage("Price should be float").optional(),
  body("Stock").isInt().withMessage("Stock should be Integer").optional(),
];
router
  .route("/medicine")
  .get(whoIsValid("employee", "doctor", "admin"), controller.getAllMedicines)
  .post(whoIsValid("employee", "doctor", "admin"), postValidationArray, validator, controller.addMedicine)
  .patch(whoIsValid("employee", "doctor", "admin"), patchValidationArray, validator, controller.editMedicine)

router
  .route("/medicine/:id")
  .get(
    whoIsValid("employee", "doctor", "admin"),
    param("id").isMongoId().withMessage("ID should be an Mongo ID"),
    validator,
    controller.getMedicine
  )
  .delete(
    whoIsValid("doctor", "admin"),
    param("id").isMongoId().withMessage("ID should be an Mongo ID"),
    validator,
    controller.deleteMedicineByid
  );

module.exports = router;
