import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true, //Todo: depends on user to upload image
    },
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true } //createdAt, updatedAt
);

const userModel = mongoose.model("user", userSchema);

export default userModel;
