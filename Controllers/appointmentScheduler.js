exports.getAllAppointments = (request, response, next) => {
  response.status(200).json({ status: "get done" });
};

exports.addAppointment = (req, res, next) => {
  res.status(201).json({ status: "post done" });
};

exports.editAppointment = (req, res, next) => {
  res.status(200).json({ status: "patch done" });
};

exports.deleteAppointment = (req, res, next) => {
  res.status(200).json({ status: "delete done" });
};
