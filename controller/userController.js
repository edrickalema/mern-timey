import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import { NotFoundError } from "../customerrors/customError.js";
import cloudinary from "cloudinary";
import { formatImage } from "../middleware/multerMiddleware.js";
import { promises as fs } from "fs";
// getting current logged in user
export const getCurrentUser = async (req, res) => {
  const user_id = req.user.userId;
  const user = await User.findById(user_id);

  if (!user) throw new NotFoundError("user not found");
  const user_with_no_password = user.toJSON();

  res.status(StatusCodes.ACCEPTED).json(user_with_no_password);
};

// Updating current user
export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password;
  delete newUser.role;

  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }

  res.status(StatusCodes.OK).json({ msg: "updated user" });
};

// Deleting user account
export const deleteUser = async (req, res) => {
  res.send("Delete user account");
};
