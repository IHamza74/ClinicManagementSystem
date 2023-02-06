const express = require("express");
const router = express.Router();
const checkmail = require("../Middlewares/checkMailExisits")
const signup = require("../Controllers/signupController")

router.route("/signup")
.post(checkmail,signup.addPatient)

module.exports=router;