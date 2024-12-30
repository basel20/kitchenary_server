const asyncHandler = require("express-async-handler");
const Cuisine = require("../db/models/cuisine");
const mongoose = require('mongoose')
const { unlinkfile } = require('../utils/unlinkFile')


const createCuisine = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
  
    if (!name ) {
      return res.status(400).json({
        error: "cuisine name is required",
      });
    }

    if (!description) {
        return res.status(400).json({
          error: "description is required.",
        });
      }
  
    if (req.files.length === 0) {
      return res.status(400).json({ message: "Minimum of 1 File is required." });
    }
  
    const files = req.files.map((file) => file.filename);
  
    const newCuisine = new Cuisine({
        name,
        description ,
        files,
    });
  
    await newCuisine.save();
    res
      .status(201)
      .json({ message: "Cuisine created successfully", cuisine: newCuisine });
  });

  module.exports = {
   
    createCuisine
  }