const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const UserModel = require("../models/user");

router.post("/request/send/:status/:toUserId", authenticate, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        if(!["interested", "ignored"].includes(status)) {
            res.status(400).json({
                success: false,
                message: "Invalid status",
                statusCode: "BLL-400",
            });
            return;
        }

        const isToUserIdValid = await UserModel.findById(toUserId);
        if(!isToUserIdValid) {
            res.status(400).json({
                success: false,
                message: "Invalid Request. Please verify your request",
                statusCode: "BLL-400",
            });
            return;
        }

        if(fromUserId.toString() === toUserId.toString()) {
            res.status(400).json({
                success: false,
                message: "Invalid Request. Please verify your request",
                statusCode: "BLL-400",
            });
            return;
        }

        const existingRequest = await ConnectionRequestModel.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId },
            ]
        })

        if(existingRequest) {
            res.status(400).json({
                success: false,
                message: "Connection request already exists",
                statusCode: "BLL-400",
            });
            return;
        }
        
        const connectionRequest = new ConnectionRequestModel({
            fromUserId,
            toUserId,
            status,
        });
        const data = await connectionRequest.save();
        res.status(200).json({
            success: true,
            message: "Connection request sent successfully",
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            statusCode: "BLL-500",
        });
    }
})