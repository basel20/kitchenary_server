const express = require("express");

const {
  createRating,
  deleteRating,
  getRatingsByRecipeId,
  getAverageRatingByRecipeId,
} = require("../controllers/ratingControllers");
const { userAuth } = require("../middleware/userAuth");
const ratingRoutes = express.Router();

ratingRoutes.delete("/:id", userAuth, deleteRating);
ratingRoutes.get("/recipe/:recipeId", userAuth, getRatingsByRecipeId);
ratingRoutes.get(
  "/recipe/:recipeId/avrage",
  userAuth,
  getAverageRatingByRecipeId
);

module.exports = ratingRoutes;