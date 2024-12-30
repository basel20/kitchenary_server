const asyncHandler = require("express-async-handler");
const Recipe = require("../db/models/recipe");
const mongoose = require("mongoose");
const { unlinkfile } = require("../utils/unlinkFile");

const createRecipe = asyncHandler(async (req, res) => {
    const { name, kitchen , time , description, ingredents, category } = req.body;
  
    if (!name || !kitchen || !time || !ingredents || !category || !description) {
      return res.status(400).json({
        error: "Invalid Recipe data. Please provide all required fields.",
      });
    }
  
    if (req.files.length === 0) {
      return res.status(400).json({ message: "Minimum of 1 File is required." });
    }
  
    const files = req.files.map((file) => file.filename);
    const userId = req.user.id;
  
    const newRecipe = new Recipe({
        name,
        kitchen ,
        time ,
        ingredents,
        description ,
        category,
        files,
        userId,
    });
  
    await newRecipe.save();
    res
      .status(201)
      .json({ message: "Recipe created successfully", recipe: newRecipe });
  });

  const updateRecipe = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const oldRecipe = await Recipe.findById(id);
  
    if (!oldRecipe) {
      return res.status(404).json({ error: "No such Recipe!" });
    }
  
    const name = req.body.name ? req.body.name : oldRecipe.name;
    const kitchen = req.body.kitchen ? req.body.kitchen : oldRecipe.kitchen;
    const time = req.body.time ? req.body.time : oldRecipe.time;
    const category = req.body.category ? req.body.category : oldRecipe.category;
    const ingredents = req.body.ingredents
      ? req.body.ingredents
      : oldRecipe.ingredents;
    const description = req.body.description
      ? req.body.description
      : oldRecipe.description;
    const files =
      req.files.length > 0
        ? req.files.map((file) => file.filename)
        : oldRecipe.files;
    const userId = req.user.id;
  
    const recipe = {
      name,
      kitchen ,
      time ,
      category,
      ingredents,
      description ,
      files,
      userId,
    };
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such Recipe!" });
    }
  
    const updatedRecipe = await Recipe.findByIdAndUpdate({ _id: id }, recipe, {
      new: true,
    });
  
    if (!updatedRecipe) {
      return res.status(404).json({ error: "No such Recipe!" });
    }
  
    if (req.files.length > 0) {
      for (let i = 0; i < oldRecipe.files.length; i++) {
        unlinkfile(oldRecipe.files[i]);
      }
    }
    res.status(200).json(updatedRecipe);
  });

  const getAllRecipes = asyncHandler(async (req, res) => {
    try {
      const recipes = await Recipe.find()
      .populate({
        path: "kitchen",
      })
      .populate({
        path: "category",
      })
      .populate({
        path: "userId",
      });
        
  
      res.status(200).json(recipes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching recipes" });
    }
  });

  const getRecipesByUserId = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
  
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ error: "Invalid user ID!" });
    }
  
    const recipes = await Recipe.find({ userId: userId })
      .populate({
        path: "kitchen",
      })
      .populate({
        path: "category",
      })
      .populate({
        path: "userId",
      });
    res.status(200).json(recipes);
  });

  const getRecipetById = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such recipe!" });
    }
  
    const recipe = await Recipe.findById(id)
      .populate({
        path: "kitchen",
      })
      .populate({
        path: "category",
      })
      .populate({
        path: "userId",
      });
  
    if (!recipe) {
      return res.status(404).json({ error: "No such Recipe!" });
    }
  
    res.status(200).json(recipe);
  });

  const getRecipesByKitchenId = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such recipe!" });
    }
  
    try {
      const recipes = await Recipe.find({ kitchen: id })
        .populate({ path: "kitchen" })
        .populate({ path: "category" })
        .populate({ path: "userId" });
  
      if (!recipes || recipes.length === 0) {
        return res.status(404).json({ error: "No such Recipe!" });
      }
  
      res.status(200).json(recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error.message);
      res.status(500).json({ error: "Server error occurred!" });
    }
  });
  

  const deleteRecipe = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such recipe!" });
    }
  
    const recipe = await Recipe.findByIdAndDelete(id);
  
    if (!recipe) {
      return res.status(404).json({ error: "No such Recipe!" });
    }
  
    res.status(200).json(recipe);
  });
  



  module.exports = {createRecipe , getAllRecipes, getRecipesByUserId, getRecipetById, updateRecipe, deleteRecipe, getRecipesByKitchenId}