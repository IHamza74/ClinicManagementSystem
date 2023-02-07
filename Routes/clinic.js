const express = require("express");
const controller = require("./../Controllers/clinic");
const router = express.Router();
const whoIsValid = require("../Middlewares/AuthorizeRole");

const { body, param } = require("express-validator");
const validator = require("./../Middlewares/errorValidation");

let validationArray = [
  // id , name , address
  body("id").isMongoId().withMessage("id should be Mongo Id"),
  body("name").isString().withMessage("name should be string"),
  body("address").isString().withMessage("address should be string"),
];

router
  .route("/clinic")
  .get(whoIsValid("admin"), controller.getAllClinics)
  .post(
    whoIsValid("admin"),
    validationArray.slice(1),
    validator,
    controller.addClinic
  )
  .patch(whoIsValid("admin"), validationArray, validator, controller.editClinic)
  .delete(whoIsValid("admin"), controller.deleteFilteredClinic);

  // this routes handle the clinic doctor add or remove doctor from clinic
  router
  .route("/clinic/:id")
  // this route add new doctor to the clinic
  .patch(whoIsValid("admin"),controller.addDoctor)
  // this route delete doctor from clinic
  .put(whoIsValid("admin"),controller.deleteDoctor)

module.exports = router;
