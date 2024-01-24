import mongoose from "mongoose";

const calenderSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  title: String,
  description: String,
  start: Date,
  end: Date,
  location: String,

  title: { type: String, required: true },
  // Reference to the calendar event
  tasks: {
    type: mongoose.Types.ObjectId,
    ref: "Todo",
  },
  goals: {
    type: mongoose.Types.ObjectId,
    ref: "Goal",
  },
  assignments: {
    type: mongoose.Types.ObjectId,
    ref: "Assignment",
  },
});

const CalenderEvent = mongoose.model("CalenderEvent", calenderSchema);

export default CalenderEvent;
