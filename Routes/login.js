const express = require("express");
const router = express.Router();
const loginController = require("./../Controllers/loginController");

const { body } = require("express-validator");
const validator = require("./../Middlewares/errorValidation");

let validationArray = [
  body("email").isEmail().withMessage("email should be  a valid email"),
  body("password").isstring().withMessage("password should be string"),
];

router.route("/login").post(validationArray, validator, loginController.login);

module.exports = router;
