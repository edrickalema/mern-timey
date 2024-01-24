import mongoose from "mongoose";
import { TodaysDate } from "../../utils/TodaysDate.js";

const goalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    reason: {
      type: String,
    },
    category: {
      type: String,
      default: "Study",
    },
    description: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    finish_Date: {
      type: Date,
      required: [true, "Please select a date to finish the goal"],
      default: TodaysDate(),
    },
    start_Date: {
      type: Date,
      required: [true, "Please select a date to start the goal"],
      default: TodaysDate(),
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Goal", goalSchema);
