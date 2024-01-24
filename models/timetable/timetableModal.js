import mongoose from "mongoose";

const timeTableSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    dayOfWeek: {
      type: String,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      default: "Monday",
    },
    startTime: Date,
    endTime: Date,
    subject: String,
    location: String,

    studySession: {
      type: mongoose.Types.ObjectId,
      ref: "StudySession",
    },
  },
});

const TimeTable = mongoose.model("TimeTimbale", timeTableSchema);

export default TimeTable;
