import express from "express";
import protect from "../middleware/protect.js";
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getListings,
} from "../controllers/listingController.js";
const router = express.Router();

router.post("/create", protect, createListing);
router.delete("/delete/:id", protect, deleteListing);
router.put("/update/:id", protect, updateListing);
router.get("/get", getListings);
router.get("/get/:id", getListing);

export default router;
