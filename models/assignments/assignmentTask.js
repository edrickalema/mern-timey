import mongoose from "mongoose";
import { TodaysDate } from "../../utils/TodaysDate.js";

const assignTaskSchema = new mongoose.Schema({
  task: String,
  description: String,
  status: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  due_date: {
    type: Date,
    default: TodaysDate(),
  },
  assignment: String,
  level: {
    type: String,
    enum: ["High", "Low", "Medium"],
    default: "Low",
  },
});

export default mongoose.model("AssignmentTask", assignTaskSchema);
