import express from "express";

import {
  createAssignmentTask,
  deleteAssignmentTask,
  getAssignmentTasks,
  updateTask,
} from "../../controller/assignments/assignTask.js";

const router = express.Router();

router.route("/").post(createAssignmentTask).get(getAssignmentTasks);
router.route("/:id").delete(deleteAssignmentTask).patch(updateTask);
export default router;
