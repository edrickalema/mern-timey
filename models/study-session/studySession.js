import mongoose from "mongoose";

const studySessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    startTime: String,
    endTime: String,
    subject: String,
    location: String,
    notes: String,
  },
  {
    timestamps: true,
  }
);

const StudySession = mongoose.model("StudySession", studySessionSchema);

export default StudySession;
