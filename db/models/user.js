const mongoose = require("mongoose");


const User = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    image: {type: String, required: false},
    isVerified: {type: Boolean, required: true},
    verificationToken: { type: String },
    bio: {type: String, required: false},
})

const UserSchema = mongoose.model('User', User)

module.exports = UserSchema
