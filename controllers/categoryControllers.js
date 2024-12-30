const asyncHandler = require("express-async-handler");
const Category = require("../db/models/category");
const mongoose = require('mongoose')
const { unlinkfile } = require('../utils/unlinkFile')

const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find()
    res.status(200).json(categories)
})

const getCategoryById = asyncHandler(async(req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Category!"})
    }

    const category = await Category.findById(id)
    if (!category){
        return res.status(404).json({error: "No such Category!"})
    }

    res.status(200).json(category)
})

  module.exports = {
    getCategoryById,
    getAllCategories
  }