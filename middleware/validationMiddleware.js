import { body, validationResult, param } from "express-validator";
import User from "../models/userModel.js";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../customerrors/customError.js";
import mongoose from "mongoose";
import Todo from "../models/todosModel.js";
import { PRIORITY } from "../constants/priority.js";
import Category from "../models/goals/categoryModal.js";
import Goal from "../models/goals/goalsModal.js";
import Assignment from "../models/assignments/assignmentModal.js";
import { Assignment_Status } from "../constants/assignStatus.js";
import Note from "../models/nodesModel.js";
function withValidation(validation) {
  return [
    validation,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const message = errors.array().map((err) => err.msg);
        if (message[0].startsWith("Not found")) {
          throw new NotFoundError(message);
        }
        if (message[0].startsWith("Not authorized")) {
          throw new UnauthorizedError(message);
        }

        throw new BadRequestError(message);
      }
      next();
    },
  ];
}

export const validateId = withValidation([
  param("id").custom(async (value, { req }) => {
    const isValidMongoseId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongoseId) throw new BadRequestError(`Invalid mongoose ID}`);
    const todo = await Todo.findById(value);
    if (!todo) throw new NotFoundError(`Not found todo with ${id}`);
    const isAdmin = req.user.userRole === "admin";
    const isOwner = req.user.userId === todo.createdBy.toString();

    if (!isAdmin && !isOwner) throw new UnauthorizedError(`not authorized`);
  }),
]);

// Validates User Registration
export const registerValidator = withValidation([
  body("name").not().isEmpty().withMessage("name can not be empty"),
  body("email")
    .not()
    .isEmpty()
    .withMessage("email is required for registering")
    .isEmail()
    .withMessage("please enter a valid email address")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user)
        throw new BadRequestError(
          `user with email ${email} already exists in the database`
        );
    }),
  body("password")
    .not()
    .isEmpty()
    .withMessage("password is required for registration")
    .isLength({ min: 8 })
    .withMessage("password must be greater that 8 characters")
    .custom(async (password, { req }) => {
      if (password != req.body.confirmPassword) {
        throw new BadRequestError("Password must match with confirm password");
      }
    }),
]);

// Validate login Credentials
export const validateLogin = withValidation([
  body("email")
    .not()
    .isEmpty()
    .withMessage("email is required for login")
    .isEmail()
    .withMessage("please enter a valid email address"),

  body("password")
    .not()
    .isEmpty()
    .withMessage("password is required for login please"),
]);
// Validate Todo Inputs
export const validateTodoInputs = withValidation([
  body("title").not().isEmpty().withMessage("Todo must have a title"),
  body("description").not().isEmpty().withMessage("Please describe your todo"),
  body("priority")
    .isIn(Object.values(PRIORITY))
    .withMessage("select prorities from the list"),
]);

// Validate Category
export const validateCateId = withValidation([
  param("id").custom(async (value, { req }) => {
    const isValidMongoseId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongoseId)
      throw new BadRequestError(`Invalid mongoose id: ${value}`);

    const category = await Category.findById(value);

    if (!category) throw new NotFoundError(`category not found`);

    const isAdmin = req.user.userRole === "admin";
    const isOwner = req.user.userId === category.createdBy.toString();
    if (!isAdmin && !isOwner) throw new UnauthorizedError(`not authorized`);
  }),
]);
export const validCateInput = withValidation([
  body("name")
    .not()
    .isEmpty()
    .withMessage("Please enter a name for your category")
    .custom(async (value, { req }) => {
      const category = await Category.find();
      category.forEach((cate) => {
        if (cate.name === value)
          throw new BadRequestError(`Category ${cate.name} already exists`);
      });
    }),
]);
// Validate Goals
export const valiadateGoalId = withValidation([
  param("id").custom(async (value, { req }) => {
    const isValidMongoseId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongoseId) throw new BadRequestError(`Invalid Mongo ID`);
    const goal = await Goal.findById(value);
    if (!goal) throw new NotFoundError(`Not found`);
    const isAdmin = req.user.userRole === "admin";
    const isOwner = req.user.userId === goal.createdBy.toString();
    if (!isAdmin && !isOwner) throw new UnauthorizedError(`not authorized`);
  }),
]);

export const validGoalInput = withValidation([
  body("title")
    .not()
    .isEmpty()
    .withMessage("A goal must have a title")
    .custom(async (value, { req }) => {
      const goals = await Goal.find({ createdBy: req.user.userId });
      goals.map((goal, i) => {
        if (goal.title === value)
          throw new BadRequestError(
            `Goal title "${value}" is already defined by you`
          );
      });
    }),
  body("description")
    .not()
    .isEmpty()
    .withMessage("Description is required for this catergory"),
]);

export const valiadateGoalUpdate = withValidation([
  body("title").custom(async (value, { req }) => {
    const goal = await Goal.find({ createdBy: req.user.userId });
    goal.map((goal) => {
      if (goal.title === value)
        throw new BadRequestError("You alreday have a goal with this title");
    });
  }),
]);
// Validate Assignments, Assignments Tasks and Discussions
export const validateAssignmentId = withValidation([
  param("id").custom(async (id, { req }) => {
    const valid_id = mongoose.Types.ObjectId.isValid(id);
    if (!valid_id) throw new BadRequestError(`Invalid assignment id ${id}`);
    const assignment = await Assignment.findById(id);
    if (!assignment) throw new NotFoundError(`Assignment ${id} not found`);

    const isOwner = assignment.createdBy.toString() === req.user.userId;
    if (!isOwner) throw new UnauthorizedError(`Operation not allowed`);
  }),
]);

export const validateAssignmentInput = withValidation([
  body("title")
    .not()
    .isEmpty()
    .withMessage("Assignment title must be specified"),
  body("status")
    .isIn(Object.values(Assignment_Status))
    .withMessage("Assignment status must be specified from the selection"),
]);

// Validate Notes Params and IDs
export const validateNotesParams = withValidation([
  param("id").custom(async (id, { req }) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new BadRequestError("Invalid mongoose notes id");

    const note = await Note.findOne({ _id: id });
    if (!note) throw new NotFoundError("Note can not be found");

    const isOwner = note.author.toString() === req.user.userId;
    if (!isOwner)
      throw new UnauthorizedError(
        "You are not allowed to carry this operation"
      );
  }),
]);

export const validateNoteInput = withValidation([
  body("title")
    .not()
    .isEmpty()
    .withMessage("Please provide a title for this note")
    .custom(async (value, { req }) => {
      const notes = await Note.find({ author: req.user.userId });
      notes.map((note) => {
        if (note.title === value)
          throw new BadRequestError(
            "Note  with title " + value + " already exists"
          );
      });
    }),
]);
