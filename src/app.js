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
})

app.get("/users/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await UserModel.findById(userId);
        if(!user) {
            res.status(404).send({
                success: false,
                message: 'User not found',
            })
        }

        res.status(200).send({
            success: true,
            message: 'User fetched successfully',
            data: user,
        })
    } catch(error) {
        res.status(404).send({
            success: false,
            message: 'User not found',
        });
    }
})

app.delete("/users/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await UserModel.findByIdAndDelete(userId);
        if(!user) {
            res.status(404).send({
                success: false,
                message: 'User not found',
            });
        }
        
        res.status(200).send({
            success: true,
            message: 'User deleted successfully',
            data: user,
        });
    } catch(error) {
        res.status(500).send(error.message);
    }
})

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
