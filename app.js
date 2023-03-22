const express = require("express");
const morgan = require("morgan");
const appointmentRouter = require("./Routes/appointmentScheduler");
const authenticationMW = require("./Middlewares/AuthenticationMW");
const loginRouter = require("./Routes/login");
const clinicRouter = require("./Routes/clinic");
const doctorRouter = require("./Routes/doctor");
const employeeRouter = require("./Routes/employee");
const invoiceRouter = require("./Routes/invoice");
const medicineRouter = require("./Routes/medicine");
const patientRouter = require("./Routes/patient");
const signupRouter = require("./Routes/signup");
const prescriptionRouter = require("./Routes/prescription");
const payment = require("./Routes/payment");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const server = express();
dotenv.config({ path: "./config.env" });

//Morgan MW
server.use(morgan("combined"));
/* SETTING DB CONNECTION */
const port = process.env.PORT || 3000;
const DB = process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD);

mongoose.set("strictQuery", true);
mongoose
  .connect(DB)
  .then(() => {
    console.log("DB Connected...");
    server.listen(port, () => {
      console.log("i'm listenning....");
    });
  })
  .catch((error) => {
    console.log("DB Problem " + error);
  });

/******Settings ******/
server.use(express.json());

// Very IMPORTANT
server.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,PATCH,OPTIONS");
  response.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

/******ROUTES******/

//0)Login
server.use(loginRouter);
server.use(signupRouter);
//server.use(authenticationMW
//server.use(authenticationMW.login);

// server.use(authenticationMW.login);
//1)Appointment Scheduler
server.use(appointmentRouter);
//2)Clinic
server.use(clinicRouter);
//3)doctor
server.use(doctorRouter);
//4)employee
server.use(employeeRouter);
//5)invoice
server.use(invoiceRouter);
//6)medicine
server.use(medicineRouter);
//7)patient
server.use(patientRouter);
//8)prescription
server.use(prescriptionRouter);
//9)payment
server.use(payment);

//Not Found MW
server.use((request, response, next) => {
  response.status(404).json({ data: "Page not found" });
});

//Error MW
server.use((error, request, response, next) => {
  const status = error.status || 500;
  response.status(status).json({ message: "Error " + error });
});

// module.exports = server;
