import express from "express";
import protect from "../middleware/protect.js";
import {
  updateUser,
  deleteUser,
  getUserListings,
  getUser,
} from "../controllers/userController.js";
const router = express.Router();

router.get("/:id", protect, getUser);
router.put("/update/:id", protect, updateUser);
router.delete("/delete/:id", protect, deleteUser);
router.get("/listings/:id", protect, getUserListings);

export default router;
