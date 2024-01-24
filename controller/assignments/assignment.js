import { StatusCodes } from "http-status-codes";
import Assignment from "../../models/assignments/assignmentModal.js";
import { NotFoundError } from "../../customerrors/customError.js";

// Create a new assignment
export const createAssignment = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const new_assignment = await Assignment.create(req.body);
  if (!new_assignment) throw new BadRequestError("Assignmnet not created");
  res.status(StatusCodes.CREATED).json({
    message: "Assignment created successfully",
    new_assignment,
  });
};

// Get assignments
export const getAssignments = async (req, res) => {
  const assignments = await Assignment.find({
    createdBy: req.user.userId,
  }).populate("tasks");
  if (!assignments)
    return res.status(404).json({ message: "No assignments found" });
  res.status(StatusCodes.OK).json({ assignments });
};

// Delete assignment
export const deleteAssignment = async (req, res) => {
  const assignment = await Assignment.findByIdAndDelete(req.params.id);
  if (!assignment) throw new NotFoundError("Assignment not found");
  res.status(StatusCodes.OK).json({
    message: "Assignment deleted successfully",
  });
};

// Update assignment
export const updateAssignment = async (req, res) => {
  const assignment = await Assignment.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(StatusCodes.OK).json({
    message: "Assignment updated successfully",
  });
};

// Get assignment
export const getAssignment = async (req, res) => {
  const assignment = await Assignment.findById(req.params.id).populate("tasks");

  if (!assignment) throw new NotFoundError("Assignment not found");
  res.status(StatusCodes.OK).json({
    assignment,
  });
};
