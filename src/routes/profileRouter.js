const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/auth");
const UserModel = require("../models/user");
const { upload } = require("../utils/fileUpload");

router.get("/profile/:id", authenticate, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);

    if (!user) {
      res.status(404).send({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).send({
      success: true,
      message: "Profile fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/profile/:id", authenticate, async (req, res) => {
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

router.patch(
  "/profile/:id",
  authenticate,
  upload.array("images", 4),
  async (req, res) => {
    const userId = req.params.id;
    const updatedData = req.body;

    const allowedUpdates = [
      "firstName",
      "lastName",
      "age",
      "gender",
      "images",
      "nickName",
      "about",
      "occupation",
      "education",
      "interestedIn",
      "minAgeRangePreference",
      "maxAgeRangePreference",
      "interests",
    ];

    const files = req.files;

    const isValidUpdate = Object.keys(updatedData).every((update) =>
      allowedUpdates.includes(update)
    );

    if (files.length > 0) {
      updatedData.images = files.map((file) => file.path);
    }

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
  }
);

module.exports = router;
