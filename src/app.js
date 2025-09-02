const express = require("express");
require("dotenv").config();
const { connectDB } = require("./config/database");
const UserModel = require("./models/user");

const app = express();

const PORT = process.env.PORT || 7777;

app.use(express.json());

app.post("/sign-up", async (req, res) => {
  const user = req.body;

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

app.use("/", (err, req, res, next) => {
  res.status(500).send('Something went wrong!! Please try again later.');
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
