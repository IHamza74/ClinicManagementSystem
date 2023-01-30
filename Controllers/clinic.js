exports.getAllClinics = (request, response, next) => {
  response.status(200).json({ status: "get done" });
};

exports.addClinic = (req, res, next) => {
  res.status(201).json({ status: "post done" });
};

exports.editClinic = (req, res, next) => {
  res.status(200).json({ status: "patch done" });
};

exports.deleteClinic = (req, res, next) => {
  res.status(200).json({ status: "delete done" });
};
