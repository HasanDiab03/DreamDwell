import asyncHandler from "../middleware/asyncHandler.js";
import Listing from "../models/listingModel.js";

export const createListing = asyncHandler(async (req, res) => {
  const listing = await Listing.create(req.body);
  res.status(201).json(listing);
});

export const deleteListing = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    res.status(404);
    throw new Error("Listing not Found");
  }
  if (req.userId !== listing.userRef.toString()) {
    res.status(401);
    throw new Error("You can only delete your own listing");
  }
  await Listing.findByIdAndDelete(id);
  res.status(200).json({ message: "Listing has been deleted" });
});

export const updateListing = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    res.status(404);
    throw new Error("Listing not Found");
  }
  if (req.userId !== listing.userRef.toString()) {
    res.status(401);
    throw new Error("You can only update your own listing");
  }
  const updatedListing = await Listing.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).json(updatedListing);
});

export const getListing = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    res.status(404);
    throw new Error("Listing not found");
  }
  res.status(200).json(listing);
});

export const getListings = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 9;
  const startIndex = parseInt(req.query.startIndex) || 0;
  let offer = req.query.offer;
  if (offer === undefined || offer === "false") {
    offer = { $in: [false, true] };
  }
  let furnished = req.query.furnished;
  if (furnished === undefined || furnished === "false") {
    furnished = { $in: [false, true] };
  }
  let parking = req.query.parking;
  if (parking === undefined || parking === "false") {
    parking = { $in: [false, true] };
  }
  let type = req.query.type;
  if (type === undefined || type === "all") {
    type = { $in: ["sale", "rent"] };
  }
  const searchTerm = req.query.searchTerm || "";
  const sort = req.query.sort || "createdAt";
  const order = req.query.order || "desc";

  const listings = await Listing.find({
    title: { $regex: searchTerm, $options: "i" },
    offer,
    furnished,
    parking,
    type,
  })
    .sort({ [sort]: order })
    .skip(startIndex)
    .limit(limit);
  res.status(200).json(listings);
});
