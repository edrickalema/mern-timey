import { StatusCodes } from "http-status-codes";
import Category from "../../models/goals/categoryModal.js";
import { NotFoundError } from "../../customerrors/customError.js";

// get category
export const getCategories = async (req, res, next) => {
  const id = req.user.userId;
  const user_category = await Category.find({ createdBy: id });
  if (!user_category) throw new NotFoundError("Category not found");
  res.status(StatusCodes.OK).json(user_category);
};

// create category
export const createCategory = async (req, res, next) => {
  console.log(req.user);
  req.body.createdBy = req.user.userId;
  const goal_category = await Category.create(req.body);
  if (goal_category) {
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Category created successfully" });
  }
};

// edit category
export const editCategory = async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ message: "Category updated successfully" });
};

// Delete category
export const deleteCategory = async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) throw new Error(`Category not found`);
  res.status(StatusCodes.OK).json({ message: "Category deleted successfully" });
};
