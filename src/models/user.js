const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters long"],
      maxlength: [50, "First name must be at most 50 characters long"],
    },
    lastName: {
      type: String,
      required: true,
      minlength: [3, "Last name must be at least 3 characters long"],
      maxlength: [50, "Last name must be at most 50 characters long"],
    },
    nickName: {
      default: "",
      type: String,
    },
    about: {
      default: "",
      type: String,
    },
    occupation: {
      default: "",
      type: String,
    },
    education: {
      default: "",
      type: String,
    },
    interestedIn: {
      type: String,
      validate: {
        validator: function (value) {
          return ["male", "female", "other"].includes(value);
        },
        message: "Invalid interested in value",
      }
    },
    minAgeRangePreference: {
      type: Number,
      default: 18,
      min: [18, "Minimum age range preference must be at least 18"],
      max: [100, "Maximum age range preference must be at most 100"],
    },
    maxAgeRangePreference: {
      type: Number,
      default: 30,
      min: [18, "Maximum age range preference must be at least 18"],
      max: [100, "Maximum age range preference must be at most 100"],
    },
    interests: {
      default: [],
      type: [String],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "Invalid email address",
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
          });
        },
        message:
          "Password is not strong enough. It should contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number",
      },
    },
    age: {
      type: Number,
      required: true,
      min: [18, "Age must be at least 18"],
      max: [100, "Age must be at most 70"],
    },
    gender: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (value) {
          return ["male", "female", "other"].includes(value);
        },
        message: "Invalid gender",
      },
    },
    // I want to store user images in the database using multer. but initally when signing up, i dont need images,but once login, we will give options to add images, so we will call patch api so that images will come here. 
    images: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

userSchema.methods.generateJwtToken = async function() {
  const token = await jwt.sign({ user: this }, process.env.JWT_SECRET, { expiresIn: "1h" });
  return token;
}

userSchema.methods.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
}

// Name of the Model is 'UserModel'
// Name of the Mongoose model should be starting with capital letter.
// Mongoose model is like a class.
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
