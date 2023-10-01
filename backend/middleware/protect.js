import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

const protect = (req, res, next) => {
  const { jwt:token } = req.cookies;
  if (!token) {
    res.status(401);
    throw new Error("Unauthorized");
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = decoded.userId;
  next();
};

export default protect;
