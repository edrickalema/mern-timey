import express from "express";
import {
  createTodo,
  deleteTodo,
  editTodo,
  getTodo,
  getTodos,
} from "../controller/todoController.js";

import {
  validateTodoInputs,
  validateId,
} from "../middleware/validationMiddleware.js";
const router = express.Router();

router.route("/").get(getTodos).post(validateTodoInputs, createTodo);
router.route("/:id").get(validateId, getTodo).delete(validateId, deleteTodo).patch(validateId, editTodo);
export default router;
