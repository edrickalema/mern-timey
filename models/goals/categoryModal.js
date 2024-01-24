import mongoose from "mongoose";

const cateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Study",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Category", cateSchema);
