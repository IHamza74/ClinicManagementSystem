const jwt = require("jsonwebtoken");

exports.login = (req, res, next) => {
  try {
    let token = req.get("authorization").split(" ")[1];
    let decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.role = decodedToken.role;
  } catch (error) {
    error.status = 403;
    error.message = "Not Authorized";
    next(error);
  }
  next();
};

exports.allowedTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.role)) {
      error = new Error();
      error.message = "You don't have permission";
      return next(error);
    }
    next();
  };
};
