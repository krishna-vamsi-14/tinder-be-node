const express = require("express");
require("dotenv").config();
const { connectDB } = require("./config/database");
const UserModel = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.post("/sign-up", async (req, res) => {
  // Validate the request body.
  try {
    validateSignUpData(req);

    const { password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = { ...req.body, password: encryptedPassword };

    const newUser = new UserModel(user);
    await newUser.save();
    res.status(201).send({
      success: true,
      statusCode: "BLL-201",
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      statusCode: "BLL-500",
      message: error.message,
    });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(404).send({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(401).send({
        success: false,
        message: "Invalid Credentials",
      });
    }

    res.status(200).send({
      success: true,
      message: "Login successful",
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).send({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "User not found",
    });
  }
});

app.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await UserModel.findByIdAndDelete(userId);
    if (!user) {
      res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.patch("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;

  const allowedUpdates = ["firstName", "lastName", "age", "gender"];

  const isValidUpdate = Object.keys(updatedData).every((update) =>
    allowedUpdates.includes(update)
  );

  try {
    if (!isValidUpdate) {
      res.status(400).send({
        success: false,
        message: `${allowedUpdates.join(", ")} are only allowed to update`,
      });
    }

    const user = await UserModel.findByIdAndUpdate(userId, updatedData, {
      runValidators: true,
    });
    if (!user) {
      res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "User updated successfully",
      data: updatedData,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.use("/", (err, req, res, next) => {
  res.status(500).send("Something went wrong!! Please try again later.");
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
