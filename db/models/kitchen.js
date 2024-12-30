const mongoose = require("mongoose");


const Kitchens = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    files: {type: [String], required: false},
})

const KitchensSchema = mongoose.model('kitchens', Kitchens)

module.exports = KitchensSchema