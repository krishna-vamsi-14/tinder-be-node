const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    }
})

// Name of the Model is 'UserModel'
// Name of the Mongoose model should be starting with capital letter. 
// Mongoose model is like a class. 
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
