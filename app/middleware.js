const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")?.[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
  } catch {
    return res
      .status(401)
      .send({ message: "Could not process your authentication status" });
  }
  if (!decoded) {
    return res.status(401).send({ message: "Not Authorized" });
  }
  req.userId = decoded.userId;
  next();
};

module.exports = authenticateToken;
