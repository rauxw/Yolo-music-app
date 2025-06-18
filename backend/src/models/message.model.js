import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    senderId: { type: String, required: true }, // Clerk user ID
    receiverId: { type: String, required: true }, // Clerk user ID
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const messageModel = mongoose.model("message", messageSchema);
