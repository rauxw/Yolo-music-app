import userModel from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const currentUserId = req.auth.userId;
    const users = await userModel.find({ clerkId: { $ne: currentUserId } });
    return res.status(201).json(users);
  } catch (error) {
    console.log(`Error in getAllUsers: ${error}`);
    next(error);
  }
};
