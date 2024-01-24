import mongoose from "mongoose";

const assignmentDiscussion = new mongoose.Schema(
  {
    createdBy: String,
    message: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("AssignmentDiscussion", assignmentDiscussion);
