const mongoose = require("mongoose");


const cuisine = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    files: {type: [String], required: false},
})

const CuisineSchema = mongoose.model('Cuisine', cuisine)

module.exports = CuisineSchema