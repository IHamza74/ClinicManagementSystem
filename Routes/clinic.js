const express = require("express");
const controller = require("./../Controllers/clinic");
const router = express.Router();
const whoIsValid = require("../Middlewares/AuthorizeRole");

const { body, param } = require("express-validator");
const validator = require("./../Middlewares/errorValidation");

let postValidationArray = [
  body("name").isString().withMessage("name should be string"),
  body("address").isString().withMessage("address should be string"),
  body("doctors").isArray().withMessage("doctors should be Array").optional(),
  body("doctors.*").isMongoId().withMessage("doctors should contains Mongo IDs").optional(),
];
let PatchValidationArray = [
  body("id").isMongoId().withMessage("id should be Mongo Id"),
  body("name").isString().withMessage("name should be string").optional(),
  body("address").isString().withMessage("address should be string").optional(),
  body("doctors").isArray().withMessage("doctors should be Array").optional(),
  body("doctors.*").isMongoId().withMessage("doctors should contains Mongo IDs"),
];

router
  .route("/clinic")
  .get(/*whoIsValid("admin"),*/ controller.getAllClinics)
  .post(/*whoIsValid("admin") postValidationArray, validator,*/ controller.addClinic)
  .patch(/*whoIsValid("admin"), PatchValidationArray, validator,*/ controller.editClinic)
 

// this routes handle the clinic doctor add or remove doctor from clinic
router
  .route("/clinic/adddoctor/:id")
  // this route add new doctor to the clinic
  .patch(
    whoIsValid("admin"),
    param("id").isMongoId().withMessage("ID should be an Mongo ID"),
    validator,
    controller.addDoctor
  );
// this route delete doctor from clinic
router
  .route("/clinic/deldoctor/:id")
  .patch(
    whoIsValid("admin"),
    param("id").isMongoId().withMessage("ID should be an Mongo ID"),
    validator,
    controller.deleteDoctor
  );
router.route("/clinic/:id").delete(controller.deleteClinic);
module.exports = router;
