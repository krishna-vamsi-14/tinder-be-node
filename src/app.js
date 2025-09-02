const express = require("express");
require("dotenv").config();
const { connectDB } = require("./config/database");
const UserModel = require("./models/user");

const app = express();

const PORT = process.env.PORT || 7777;

app.post("/sign-up", async (req, res) => {
  // Dummy user.
  const user = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "password",
    age: 25,
    gender: "male",
  };

  // Create a new instance of the UserModel.
  const newUser = new UserModel(user);

  //Save the user to the database. => This mongoose save() method will return a promise.
  try {
    await newUser.save();
    console.log('User created successfully');
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
  
});

app.use("/", (req, res) => {
  res.send("Hello World");
});

connectDB()
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error", error);
  });
