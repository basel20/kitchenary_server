const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  recipe_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "recipe",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value.",
    },
  },
  comment: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;