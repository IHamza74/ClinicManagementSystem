exports.getAllPrescriptions = (request, response, next) => {
  response.status(200).json({ status: "get done" });
};

exports.addPrescription = (req, res, next) => {
  res.status(201).json({ status: "post done" });
};

exports.editPrescription = (req, res, next) => {
  res.status(200).json({ status: "patch done" });
};

exports.deletePrescription = (req, res, next) => {
  res.status(200).json({ status: "delete done" });
};
