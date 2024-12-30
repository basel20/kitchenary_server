const mongoose = require("mongoose");


const Recipe = new mongoose.Schema({
    name: {type: String, required: true},
    kitchen: {type: mongoose.Schema.Types.ObjectId,
      ref: "kitchens",
      required: true},
    time: {type: String, required: true},
    ingredents: {type: String, required: true},
    category: {type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true},
    description: {type: String, required: true},
    files: {type: [String], required: false},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
})

const RecipeSchema = mongoose.model('recipe', Recipe)

module.exports = RecipeSchema