import express from "express";
import {
  createCategory,
  getCategories,
  deleteCategory,
  editCategory,
} from "../../controller/goals/categoryController.js";
import {
  validCateInput,
  validateCateId,
} from "../../middleware/validationMiddleware.js";

const router = express.Router();

router.route("/").post(validCateInput, createCategory).get(getCategories);
router
  .route("/:id")
  .delete(validateCateId, deleteCategory)
  .patch(validateCateId, editCategory);
export default router;
