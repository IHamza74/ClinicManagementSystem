const express = require("express");
const controller = require("./../Controllers/appointmentScheduler");
const teacherValidationArray = require("./../validation/appointmentScheduler");
const router = express.Router();
const whoIsValid = require("../Middlewares/AuthorizeRole");

const sendEmail = require("./../utils/email");

const customeMiddlewares = require("../Middlewares/customeFunctionalities");

const { body, param } = require("express-validator");
const validator = require("./../Middlewares/errorValidation");

let postValidationArray = [
  body("patientID").isMongoId().withMessage("patientID should be Mongo Id"),
  body("doctorID").isMongoId().withMessage("doctorID should be Mongo Id"),
  body("clinicID").isMongoId().withMessage("clinicID should be Mongo Id"),
  body("employeeID").isMongoId().withMessage("employeeID should be Mongo Id"),
  body("date").isISO8601().toDate().withMessage("date should be date"),
];

let patchValidationArray = [
  body("id").isMongoId().withMessage("id should be Mongo Id"),
  body("patientID").isMongoId().withMessage("patientID should be Mongo Id").optional(),
  body("doctorID").isMongoId().withMessage("doctorID should be Mongo Id").optional(),
  body("clinicID").isMongoId().withMessage("clinicID should be Mongo Id").optional(),
  body("employeeID").isMongoId().withMessage("employeeID should be Mongo Id").optional(),
  body("date").isISO8601().toDate().withMessage("date should be date").optional(),
];

let pendingValidationArray = [
  body("patientID").isMongoId().withMessage("patientID should be Mongo Id").optional(),
  body("clinicID").isMongoId().withMessage("clinicID should be Mongo Id").optional(),
  body("date").isISO8601().toDate().withMessage("date should be date").optional(),
];

router
  .route("/appointmentScheduler")
  .get(whoIsValid("admin", "employee"), controller.getAllAppointments)
  .post(
    whoIsValid("admin", "employee"),
    postValidationArray,
    validator,
    customeMiddlewares.doesPatientExist,
    customeMiddlewares.doesDoctorExist,
    customeMiddlewares.doesClinicExist,
    customeMiddlewares.doesEmployeeExist,
    //  customeMiddlewares.doesDoctorWorkInClinic,
    customeMiddlewares.isDoctorAvailablePost,
    sendEmail(),
    controller.addAppointment
    // customeMiddlewares.addAppointmentToPatientOrDoctor
  )

  .patch(
    whoIsValid("admin", "employee"),
    patchValidationArray,
    validator,
    customeMiddlewares.doesPatientExist,
    customeMiddlewares.doesDoctorExist,
    customeMiddlewares.isDoctorAvailable,
    customeMiddlewares.doesClinicExist,
    customeMiddlewares.doesEmployeeExist,
    controller.editAppointment
  )

  .delete(whoIsValid("admin", "employee"), controller.deleteFilteredAppointment);
router.route("/appointmentScheduler/count").get(controller.getAppointmentsCount);

/** appontments reports  */
router
  .route("/appointmentScheduler/allreports")
  .get(whoIsValid("admin", "employee"), controller.AllAppointmentsReports);

router
  .route("/appointmentScheduler/dailyreports/:id")
  .get(whoIsValid("admin", "employee"), controller.DailyAppointmentsReports);

router
  .route("/appointmentScheduler/doctorreports/:id")
  .get(whoIsValid("admin", "employee"), controller.DoctorAppointmentsReports);

router
  .route("/appointmentScheduler/patientreports/:id")
  .get(whoIsValid("admin", "employee"), controller.PatientAppointmentsReports);

/**   pending appointments  */

router
  .route("/appointmentScheduler/pending")
  .post(
    // whoIsValid("admin", "employee"),
    // pendingValidationArray,
    //  validator,
    // customeMiddlewares.isDoctorAvailable,
    // sendEmail(),
    controller.addPendingToAppointment
    // customeMiddlewares.addAppointmentToPatientOrDoctor
  )

  .get(
    //  whoIsValid("admin", "employee"),
    controller.getAllPending
  );

router.route("/appointmentScheduler/pending/:id").delete(whoIsValid("admin", "employee"), controller.deletePending);

router
  .route("/appointmentScheduler/:id")

  .get(param("id").isMongoId().withMessage("ID should be an Mongo ID"), validator, controller.getOneAppointment)
  .delete(param("id").isMongoId().withMessage("ID should be an Mongo ID"), validator, controller.deleteAppointment);

module.exports = router;
