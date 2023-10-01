import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";

export const signup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const userExists = await User.findOne({ $or: [{ email }, { username }] });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({ username, email, password });
  if (!user) {
    res.status(400);
    throw new Error("Invalid data");
  }
  generateToken(res, user._id);
  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
  });
});

export const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (!userExists || !(await userExists.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
  generateToken(res, userExists._id);
  const { password: pass, ...info } = userExists._doc;
  res.status(200).json(info);
});

export const google = asyncHandler(async (req, res) => {
  const { email, photo, name } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    generateToken(res, user._id);
    const { password: pass, ...info } = user._doc;
    res.status(200).json(info);
  } else {
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);

    const newUser = await User.create({
      username:
        name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4),
      email,
      password: generatedPassword,
      avatar: photo,
    });
    generateToken(res, newUser._id);
    const { password: pass, ...info } = newUser._doc;
    res.status(201).json(info);
  }
});

export const signOut = asyncHandler(async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "User has been logged out" });
});
