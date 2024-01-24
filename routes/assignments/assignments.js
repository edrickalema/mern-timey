import express from "express";
import {
  createAssignment,
  deleteAssignment,
  getAssignment,
  getAssignments,
  updateAssignment,
} from "../../controller/assignments/assignment.js";
import {
  validateAssignmentId,
  validateAssignmentInput,
} from "../../middleware/validationMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getAssignments)
  .post(validateAssignmentInput, createAssignment);
router
  .route("/:id")
  .get(validateAssignmentId, getAssignment)
  .delete(validateAssignmentId, deleteAssignment)
  .patch(validateAssignmentId, updateAssignment);

export default router;
