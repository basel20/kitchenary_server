const asyncHandler = require("express-async-handler");
const Kitchens = require("../db/models/kitchen");
const mongoose = require('mongoose')
const { unlinkfile } = require('../utils/unlinkFile')

const getAllKitchens = asyncHandler(async (req, res) => {
    const kitchens = await Kitchens.find()
    res.status(200).json(kitchens)
})

const getKitchenById = asyncHandler(async(req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Kitchen!"})
    }

    const kitchen = await Kitchens.findById(id)
    if (!kitchen){
        return res.status(404).json({error: "No such Kitchen!"})
    }

    res.status(200).json(kitchen)
})

const createKitchen = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
  
    if (!name ) {
      return res.status(400).json({
        error: "name is required",
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
  
    const newKitchen = new Kitchens({
        name,
        description ,
        files,
    });
  
    await newKitchen.save();
    res
      .status(201)
      .json({ message: "Kitchen created successfully", kitchen: newKitchen });
  });

  module.exports = {
    getKitchenById,
    getAllKitchens,
    createKitchen
  }