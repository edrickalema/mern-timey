import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../customerrors/customError.js";
import Todo from "../models/todosModel.js";

// create a todo
export const createTodo = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const todo = await Todo.create(req.body);

  if (!todo) throw new BadRequestError("Todo not created");

  res.status(StatusCodes.CREATED).json({
    msg: "Todo has been created successfully",
    todo,
  });
};

// get a todo
export const editTodo = async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!todo) throw new NotFoundError("Todo not found");
  res.status(StatusCodes.OK).json({
    message: "Todo has been edited",
  });
};

// get todos

export const getTodos = async (req, res) => {
  const todos = await Todo.find({ createdBy: req.user.userId });
  if (!todos) throw new NotFoundError("No jobs found");
  res.status(StatusCodes.OK).json({
    todos,
  });
};
// get todo

export const getTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) throw new NotFoundError("No jobs found");
  res.status(StatusCodes.OK).json({
    todo,
  });
};

// delete todo
export const deleteTodo = async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  if (!todo) throw new NotFoundError("No todo Found");
  res.status(StatusCodes.OK).json({
    message: "Todo has been deleted",
  });
};
