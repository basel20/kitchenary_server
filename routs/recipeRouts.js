const express = require("express");
const router = express.Router();
//const upload = require("../config/storageConfig");

const {
    createRecipe,
    getAllRecipes,
    getRecipesByUserId,
    getRecipetById,
    updateRecipe,
    deleteRecipe,
    getRecipesByKitchenId
  } = require("../controllers/recipeControllers");

  const { createRating } = require("../controllers/ratingControllers")

const upload = require("../config/storageConfig");
const { userAuth } = require("../middleware/userAuth");


router.post("/", userAuth, upload.array("files", 5), createRecipe);
router.get("/", getAllRecipes);
router.get("/user/:userId" , getRecipesByUserId);
router.get("/:id" , getRecipetById);
router.delete("/:id", userAuth, deleteRecipe);
router.patch("/:id", userAuth, upload.array("files", 5), updateRecipe);
router.get("/kitchen/:id", getRecipesByKitchenId);
router.post("/:recipeId/rate", userAuth, createRating);


module.exports = router;