const express = require("express");
const morgan = require("morgan");
const appointmentRouter = require("./Routes/appointmentScheduler");
const clinicRouter = require("./Routes/clinic");
const doctorRouter = require("./Routes/doctor");
const employeeRouter = require("./Routes/employee");
const invoiceRouter = require("./Routes/invoice");
const medicineRouter = require("./Routes/medicine");
const patientRouter = require("./Routes/patient");
const prescriptionRouter = require("./Routes/prescription");
const dotenv = require("dotenv");

const server = express();
dotenv.config({ path: "./config.env" });

//Morgan MW
server.use(morgan("combined"));

const port = process.env.PORT || 3000;

//Server listen
server.listen(port, () => {
  console.log("i'm listenning....");
});

//First MW
server.use((req, res, next) => {
  console.log("hellow from First MW");
  next();
});

//Settings
server.use(express.json());

/******ROUTES******/
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
