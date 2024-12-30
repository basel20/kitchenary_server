const mongoose = require("mongoose");

const connectDB = async (url) => {
    try {
        mongoose.set('strictQuery', true); // Deprecation warning fix
        await mongoose.connect(url, {
            useNewUrlParser: true,        // Recommended settings
            useUnifiedTopology: true,    // Recommended settings
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
