const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/auth");
const UserModel = require("../models/user");

router.get("/user/feed", authenticate, async (req, res) => {
    try {
        const users = await UserModel.find();
        // Filter out my profile from the list of users.
        const filteredUsers = users.filter((user) => user._id.toString() !== req.user._id.toString());

        res.status(200).send({
          success: true,
          message: "Users fetched successfully",
          data: filteredUsers
        });
    } catch(error) {
        res.status(500).send({
            success: false,
            message: error.message,
        });
    }
})

module.exports = router;