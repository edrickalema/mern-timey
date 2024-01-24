import { StatusCodes } from "http-status-codes";
import Goal from "../../models/goals/goalsModal.js";
import { NotFoundError } from "../../customerrors/customError.js";
// create a new goal
export const createGoal = async (req, res, next) => {
  req.body.createdBy = req.user.userId;
  const goal = await Goal.create(req.body);
  if (goal)
    res
      .status(StatusCodes.CREATED)
      .json({ message: "goal created successfully", goal });
};
// get a list of goals
export const getGoals = async (req, res, next) => {
  const goals = await Goal.find({ createdBy: req.user.userId });
  if (!goals)
    res.status(StatusCodes.NOT_FOUND).json({
      message: "No goals found",
    });

  res.status(StatusCodes.OK).json({
    goals,
  });
};
// get a goal
export const getGoal = async (req, res, next) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) throw new NotFoundError("goal not found");
  res.status(StatusCodes.OK).json({
    goal,
  });
};
// modify a goal
export const editGoal = async (req, res, next) => {
  const goal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({
    message: "Goal updated successfully",
  });
};
// delete a goal
export const deleteGoal = async (req, res, next) => {
  const deltedGoal = await Goal.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({
    message: "Goal deleted successfully",
  });
};
