import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A notes or document must have a title"],
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    body: String,
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
