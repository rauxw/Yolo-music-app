import userModel from "../models/user.model.js";

export const authCallback = async (req, res) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    //check user exists
    const userExists = await userModel.findOne({ clerkId: id });

    if (!userExists) {
      //signup
      await userModel.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl,
      });
      return res
        .status(200)
        .json({ success: true, message: "Account created" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User already exists" });
    }
  } catch (error) {
    console.log(`Error in auth callback: ${error}`);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};
