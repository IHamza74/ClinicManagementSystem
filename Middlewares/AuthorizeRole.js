const verifyusers = (...allowed) => {
  return (req, res, next) => {
    let userRole = req.role;
    if (!userRole) return res.status(401).json({ message: "not authorized" });

    let getAllowedRoles = [...allowed];

    const isvalid = getAllowedRoles.includes(userRole);
    if (!isvalid) return res.status(401).json({ message: "not authorized" });
    else next();
  };
};
module.exports = verifyusers;
