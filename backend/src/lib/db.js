import dotenv from "dotenv";

dotenv.config();

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoConnect = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Mongo Connected: ${mongoConnect.connection.host}`);
  } catch (error) {
    console.log(`Error Mongo: ${error}`);
    process.exit(1);
  }
};
