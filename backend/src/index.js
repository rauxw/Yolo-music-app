import dotenv from "dotenv";
import express from "express";
import { clerkMiddleware } from "@clerk/express";

import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import adminRoute from "./routes/admin.route.js";
import songRoute from "./routes/song.route.js";
import albumRoute from "./routes/album.route.js";
import statRoute from "./routes/stats.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(clerkMiddleware());

// Role routes
app.use("/api/users", userRoute);
app.use("/api/admin", adminRoute);

// Auth routes
app.use("/api/auth", authRoute);

//Song & Stats routes
app.use("/api/songs", songRoute);
app.use("/api/albums", albumRoute);
app.use("/api/stats", statRoute);

async function main() {
  try {
    await connectDB(); // Good Practice connect to DB before server starts
    app.listen(PORT, () => {
      console.log(`Running on: ${PORT}`);
    });
  } catch (error) {
    console.log(`Error : ${error}`);
  }
}

main();
