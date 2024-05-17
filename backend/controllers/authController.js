import User from "../models/User.js";
import { checkValidationErrors } from "../utils/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const register = async (req, res) => {
  try {
    const { email } = req.body;
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "email already exists" });
    }
    const newUser = await User.create(req.body);
    newUser.password = undefined;
    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    if (error.name === "ValidationError") {
      if (checkValidationErrors(error, res)) return;
    } else {
      console.error("error at register ", error);
      return res.status(500).json({ error: "internal server error" });
    }
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "invalid password" });
    }
    user.password = undefined;
    //generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    });
    return res.status(200).json({ message: "login successfully", user, token });
  } catch (error) {
    console.error("error at login", error);
    return res.status(500).json({ error: "internal server error" });
  }
};
export { register, login };
