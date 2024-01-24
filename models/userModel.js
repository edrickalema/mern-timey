import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: String,
  confirmPassword: String,
  avatar: String,
  location: {
    type: String,
    default: "my city",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  avatar: String,
  avatarPublicId: String,
});

userSchema.methods.toJSON = function () {
  let userObj = this.toObject();
  delete userObj.password;
  delete userObj.confirmPassword;
  return userObj;
};

export default mongoose.model("User", userSchema);
