const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected");
    } catch (error) {
        console.log("MongoDB connection error", error);
    }
}

connectDB();