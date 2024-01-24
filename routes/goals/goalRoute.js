import express from "express";

import {
  createGoal,
  deleteGoal,
  editGoal,
  getGoal,
  getGoals,
} from "../../controller/goals/goalsController.js";
import {
  valiadateGoalId,
  validGoalInput,
  valiadateGoalUpdate,
} from "../../middleware/validationMiddleware.js";

const router = express.Router();

router.route("/").get(getGoals).post(validGoalInput, createGoal);
router
  .route("/:id")
  .get(valiadateGoalId, getGoal)
  .delete(valiadateGoalId, deleteGoal)
  .patch(valiadateGoalId, valiadateGoalUpdate, editGoal);

export default router;
