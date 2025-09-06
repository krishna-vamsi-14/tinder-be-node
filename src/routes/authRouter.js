const express = require("express");
const router = express.Router();
const UserModel = require("../models/user");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");

router.post("/sign-up", async (req, res) => {
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
  
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        res.status(404).send({
          success: false,
          message: "Invalid Credentials",
        });
      }
  
      const isPasswordCorrect = await user.validatePassword(password);
      if (!isPasswordCorrect) {
        res.status(401).send({
          success: false,
          message: "Invalid Credentials",
        });
      }
  
      // Create a JWT token. 
      const token = await user.generateJwtToken();
      // Attach the JWT token to a cookie and send it back to the browser. 
  
      console.log("jwt token", token);
  
      res.cookie("token", token, {
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });
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

router.post("/logout", async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).send({ message: "Something went wrong" });
            return;
        }

        res.clearCookie("token");
        res.status(200).send({
            success: true,
            message: "Logout successful",
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router;