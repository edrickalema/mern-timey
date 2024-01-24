import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../../customerrors/customError.js";
import AssignmentTask from "../../models/assignments/assignmentTask.js";

// Create a new assignment task
export const createAssignmentTask = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const task = await AssignmentTask.create(req.body);
  if (!task) throw new BadRequestError("Task not created");
  res.status(StatusCodes.CREATED).json({
    message: "Task created successfully",
    task,
  });
};
// Get Assignment Tasks

export const getAssignmentTasks = async (req, res) => {
  const tasks = await AssignmentTask.find({ createdBy: req.user.userId });
  if (!tasks) throw new BadRequestError("Task not found");
  res.status(StatusCodes.OK).json({
    tasks,
  });
};

// Get a list of assignments tasks
export const updateTask = async (req, res) => {
  const task_to_update = await AssignmentTask.findById(req.params.id);
  const isOwner = req.user.userId === task_to_update.createdBy.toString();
  if (!isOwner)
    throw new UnauthorizedError(
      "You are not allowed to delete this assignment task"
    );
  const task = await AssignmentTask.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({
    message: "Task updated successfully",
  });
};

// Get a list of assignments tasks
export const deleteAssignmentTask = async (req, res) => {
  const task_to_delete = await AssignmentTask.findById(req.params.id);
  const isOwner = req.user.userId === task_to_delete.createdBy.toString();
  if (!isOwner)
    throw new UnauthorizedError(
      "You are not allowed to delete this assignment task"
    );
  const task = await AssignmentTask.findByIdAndDelete(req.params.id);
  if (!task) throw new NotFoundError("Task not found");
  res.status(StatusCodes.OK).json({
    message: "Task deleted successfully",
  });
};
