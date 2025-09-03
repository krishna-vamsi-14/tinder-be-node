const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://durgakrishnavamsi_db_user:tl8tcUe0OdVWScdz@cluster0.n3qu2yx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
}

module.exports = {connectDB};