import jwt from "jsonwebtoken";
import User from "../models/User.js";
const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "unauthorized header is missing" });
  }
  const tokenParts = authHeader.split(" ");

  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ message: "invalid token" });
  }
  const token = tokenParts[1];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decodedToken.userId);
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "token has expired" });
    } else {
      return res.status(500).json({ message: "internal server error" });
    }
  }
};
export { authenticateUser };
