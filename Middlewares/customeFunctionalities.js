const { request, response, json } = require("express");
let jwt = require("jsonwebtoken");
const appointmentScheduler = require("../Controllers/appointmentScheduler");

module.exports.isDoctorAvailable = async (request, response, next) => {
  try {
    let appointmentDate = new Date(request.body.date).getTime();
    let currentDate = new Date().getTime();
    if (currentDate > appointmentDate) {
      return response
        .status(406)
        .json({ message: "You can not make an appointment in the past" });
    } else {
      let token = jwt.sign({ role: "admin" }, "AhmedTurky", {
        expiresIn: "1h",
      });
      let appointsRes = await fetch(
        `http://localhost:3000/appointmentScheduler?doctorID=${request.body.doctorID}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      let DrAppointments = await appointsRes.json();
      DrAppointments.forEach((appointment) => {
        if (
          Math.abs(new Date(appointment.date) - new Date(request.body.date)) <
          30 * 60000
        ) {
          return response
            .status(406)
            .json({ message: "the doctor is busy at this time" });
        }
      });
      next();
    }
  } catch (error) {
    next(error);
  }
};
