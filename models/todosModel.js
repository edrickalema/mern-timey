import mongoose from "mongoose";
import { PRIORITY } from "../constants/priority.js";
import { TodaysDate } from "../utils/TodaysDate.js";

const todoSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    priority: {
      type: String,
      enum: Object.values(PRIORITY),
      default: PRIORITY.EASY,
    },
    status: {
      type: Boolean,
      default: false,
    },
    deadline: {
      type: Date,
      default: TodaysDate(),
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Todo", todoSchema);
