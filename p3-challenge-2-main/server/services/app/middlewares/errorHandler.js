function errorHandler(error, req, res, next) {
  let arrError = [];
  if (error === "EmailPasswordFalse") {
    res.status(401).json({
      message: "Email or Password invalid",
    });
  } else if (error.name === "SequelizeForeignKeyConstraintError") {
    res.status(404).json({ message: `DATA NOT FOUND` });
  } else if (error === "PageMustNotBeNegative") {
    res.status(401).json({ message: "Page must be greater than or equal to 0" });
  } else if (error === "TokenError") {
    res.status(401).json({
      message: "Unauthorized",
    });
  } else if (error.message === "invalid signature") {
    res.status(401).json({
      message: "Unauthorized",
    });
  } else if (error.message === "invalid token") {
    res.status(401).json({
      message: "Unauthorized",
    });
  } else if (error.message === "jwt must be provided") {
    res.status(401).json({
      message: "Unauthorized",
    });
  } else if (error === "Forbidden") {
    res.status(403).json({
      message: "Forbidden",
    });
  } else if (error === "DataNotFound") {
    res.status(404).json({
      message: `DATA NOT FOUND`,
    });
  } else if (error === "StatusForbidden") {
    res.status(400).json({
      message: `Status Forbidden`,
    });
  } else if (error.name === "SequelizeValidationError") {
    error.errors.forEach((el) => {
      arrError.push(el.message);
    });
    res.status(400).json({
      message: arrError,
    });
  } else if (error.name === "SequelizeUniqueConstraintError") {
    error.errors.forEach((el) => {
      arrError.push(el.message);
    });
    res.status(400).json({
      message: arrError,
    });
  } else {
    res.status(500).json({
      message: "INTERNAL SERVER ERROR",
    });
  }
}

module.exports = errorHandler;
