const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
require("./../Models/doctor");

const DoctorSchema = mongoose.model("doctor");

const sendEmail = () => {
  return async (req, res, next) => {
    // 1) Create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const doctor = DoctorSchema.findOne({ _id: req.body.doctorID }, { _id: 0, email: 1 });
    const d = await doctor.exec();

    // 2) Define the email Data
    const mailData = {
      from: "clinicSystem@clinic.com",
      to: d.email,
      subject: "notification for new appointment",
      text: `you have an appointment at ${req.body.date}`,
    };

    // 3) Send the email
    transporter
      .sendMail(mailData)
      .then(() => next())
      .catch((error) => next(error));
  };
};

module.exports = sendEmail;
