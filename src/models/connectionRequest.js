const mongoose = require("mongoose");
const { Schema } = mongoose;

const connectionRequestSchema = new Schema({
    fromUserId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    toUserId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    status: {
        enum: ["interested", "ignored", "accepted", "rejected"],
        required: true,
    }
}, {
    timestamps: true
})

connectionRequestSchema.index({fromUserId: 1, toUserId: 1});

const ConnectionRequestModel = mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequestModel;