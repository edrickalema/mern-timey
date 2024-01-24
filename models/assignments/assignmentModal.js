import mongoose from "mongoose";
import { Assignment_Status } from "../../constants/assignStatus.js";
import { TodaysDate } from "../../utils/TodaysDate.js";

const assignmentSchema = new mongoose.Schema(
  {
    title: String,
    summary: String,
    description: String,
    related_goal: {
      type: String,
      default: "None",
    },

    status: {
      type: String,
      enum: Object.values(Assignment_Status),
      default: Assignment_Status.PENDING,
    },

    startDate: {
      type: Date,
      default: TodaysDate(),
    },
    finishDate: {
      type: Date,
      default: TodaysDate(),
    },
    description: String,
    tasks: {
      type: mongoose.Types.ObjectId,
      ref: "AssignmentTask",
    },
    discussion: {
      type: mongoose.Types.ObjectId,
      ref: "AssignmentDiscussion",
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

export default mongoose.model("Assignment", assignmentSchema);
