exports.getAllPatients = (request, response, next) => {
  response.status(200).json({ status: "get done" });
};

exports.addPatient = (req, res, next) => {
  res.status(201).json({ status: "post done" });
};

exports.editPatient = (req, res, next) => {
  res.status(200).json({ status: "patch done" });
};

exports.deletePatient = (req, res, next) => {
  res.status(200).json({ status: "delete done" });
};
