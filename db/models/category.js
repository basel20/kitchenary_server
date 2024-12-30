const mongoose = require("mongoose");


const Category = new mongoose.Schema({
    name: {type: String, required: true},
})

const CategorySchema = mongoose.model('category', Category)

module.exports = CategorySchema