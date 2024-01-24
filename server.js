import "express-async-errors";

import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

// Application Routes

// Assignments
import taskRoute from "./routes/assignments/task.js";
import assignmentRoute from "./routes/assignments/assignments.js";
import discussionRoute from "./routes/assignments/discussion.js";
import noteRoute from "./routes/noteRoute.js";
// Authentication
import authRouter from "./routes/authRoute.js";

// User
import userRouter from "./routes/userRoute.js";

// Todos
import todoRouter from "./routes/todoRoute.js";

// Goals
import goalRouter from "./routes/goals/goalRoute.js";
import categoryRouter from "./routes/goals/categoryRoute.js";
// App middleware
import morgan from "morgan";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import { v2 as cloudinary } from "cloudinary";

import path, { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
// Configuring environment variables
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// Initializing Express App
const app = express();

// Middlewares from modules
app.use(cookieParser());
app.use(express.json());
app.use(cors());
if ((process.env.NODE_ENV = "development")) {
  app.use(morgan("dev"));
}

// Routes middleware
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authMiddleware, userRouter);
app.use("/api/v1/todos", authMiddleware, todoRouter);

// Goals
app.use("/api/v1/study-goals", authMiddleware, goalRouter);
app.use("/api/v1/goal-category", authMiddleware, categoryRouter);

app.use("/api/v1/notes", authMiddleware, noteRoute);
// app.use("/api/v1/contacts");

// app.use("/api/v1/flash_cards");

app.use("/api/v1/study-assignments", authMiddleware, assignmentRoute);
app.use("/api/v1/assignment-tasks", authMiddleware, taskRoute);
app.use("/api/v1/assignment-discussion", discussionRoute);

// Error middleware
app.use(express.static(path.resolve(__dirname, "./public")));

app.get("*", (req, res) => {
  res.send(path.resolve(__dirname, "./public", "index.html"));
});

app.use(errorMiddleware);

const PORT = process.env.PORT;
const DATABASE = process.env.MONGO_URL.replace(
  "<password>",
  process.env.MONGO_PWD
);

try {
  mongoose
    .connect(DATABASE)
    .then(() => console.log("connected to the database successfully"));

  app.listen(PORT, () => console.log(`app is running on port ${PORT}...`));
} catch (error) {
  console.log(error);
  process.exit(1);
}
