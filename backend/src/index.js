import dotenv from "dotenv";
import express from "express";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";

import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import adminRoute from "./routes/admin.route.js";
import songRoute from "./routes/song.route.js";
import albumRoute from "./routes/album.route.js";
import statRoute from "./routes/stats.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const __dirname = path.resolve();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(clerkMiddleware()); // this will add auth to req obj => req.auth
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, //10MB max file size upload
    },
  })
);

// Role routes
app.use("/api/users", userRoute);
app.use("/api/admin", adminRoute);

// Auth routes
app.use("/api/auth", authRoute);

//Song & Stats routes
app.use("/api/songs", songRoute);
app.use("/api/albums", albumRoute);
app.use("/api/stats", statRoute);

//Error Handler
app.use((err, req, res, next) => {
  return res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

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

//Todo: socket.io implementation
