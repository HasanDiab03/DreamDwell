import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import Listing from "../models/listingModel.js";

export const updateUser = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const paramId = req.params.id;
  if (userId !== paramId) {
    res.status(401);
    throw new Error("You can only update your account");
  }
  const { password, email, username, avatar } = req.body;
  const user = await User.findById(paramId);
  user.username = username || user.username;
  user.email = email || user.email;
  user.avatar = avatar || user.avatar;
  if (password) {
    user.password = password;
  }
  const updatedUser = await user.save();
  const { password: pass, ...info } = updatedUser._doc;
  res.status(200).json(info);
});

export const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const paramId = req.params.id;
  if (userId !== paramId) {
    res.status(401);
    throw new Error("You can only delete your own account");
  }
  await User.findByIdAndDelete(paramId);

  res.status(200).clearCookie("jwt").json({ message: "User Deleted!" });
});

export const getUserListings = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const paramId = req.params.id;
  if (userId !== paramId) {
    res.status(401);
    throw new Error("You can only get your own listings");
  }
  const listings = await Listing.find({ userRef: paramId });
  res.status(200).json(listings);
});

export const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  const { password, ...info } = user._doc;
  res.status(200).json(info);
});
