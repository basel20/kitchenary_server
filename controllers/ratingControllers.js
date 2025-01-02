const asyncHandler = require("express-async-handler");
const Rating = require("../db/models/rating");
const mongoose = require("mongoose");

// Create a rating
const createRating = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const userId = req.user.id;
  const { recipeId: recipe_id } = req.params;

  // Check if the user has already rated the product
  const existingRating = await Rating.findOne({ recipe_id, userId });

  if (existingRating) {
    return res
      .status(400)
      .json({ error: "You have already rated this product!" });
  }

  // Check if the rating value is between 1 and 5
  if (rating < 1 || rating > 5) {
    return res
      .status(400)
      .json({ error: "Invalid rating value. Rating must be between 1 and 5." });
  }

  const newRating = new Rating({
    recipe_id,
    userId,
    rating,
    comment,
  });

  await newRating.save();
  res
    .status(201)
    .json({ message: "Rating created successfully", rating: newRating });
});

// Delete a rating
const deleteRating = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such rating!" });
  }

  const deletedRating = await Rating.findByIdAndDelete(id);

  if (!deletedRating) {
    return res.status(404).json({ error: "No such rating!" });
  }

  res.status(200).json(deletedRating);
});

// Get all ratings by product ID
const getRatingsByRecipeId = asyncHandler(async (req, res) => {
  const { recipeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    return res.status(400).json({ error: "Invalid recipe ID!" });
  }

  const ratings = await Rating.find({ recipe_id: recipeId })
    .populate({ path: "userId" });

  res.status(200).json(ratings);
});

// Get average rating by product ID
const getAverageRatingByRecipeId = asyncHandler(async (req, res) => {
  const { recipeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    return res.status(400).json({ error: "Invalid recipe ID!" });
  }

  const ratings = await Rating.find({ recipe_id: recipeId });

  if (ratings.length === 0) {
    return res.status(404).json({ error: "No ratings found for the recipe!" });
  }

  const totalRating = ratings.reduce((acc, curr) => acc + curr.rating, 0);
  const averageRating = totalRating / ratings.length;

  res.status(200).json({ averageRating });
});

module.exports = {
  createRating,
  deleteRating,
  getRatingsByRecipeId,
  getAverageRatingByRecipeId,
};
