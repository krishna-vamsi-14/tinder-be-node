const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minlength: [3, 'First name must be at least 3 characters long'],
        maxlength: [50, 'First name must be at most 50 characters long'],
    },
    lastName: {
        type: String,
        required: true,
        minlength: [3, 'Last name must be at least 3 characters long'],
        maxlength: [50, 'Last name must be at most 50 characters long'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email address',
        },
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        min: [18, 'Age must be at least 18'],
        max: [100, 'Age must be at most 70'],
    },
    gender: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(value) {
                return ['male', 'female', 'other'].includes(value);
            },
            message: 'Invalid gender',
        },
    }
}, {timestamps: true})

// Name of the Model is 'UserModel'
// Name of the Mongoose model should be starting with capital letter. 
// Mongoose model is like a class. 
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
