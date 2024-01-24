import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
} from "../../customerrors/customError.js";
import Note from "../../models/nodesModel.js";

// Create a new note
export const createNote = async (req, res) => {
  req.body.author = req.user.userId;
  const note = await Note.create(req.body);
  if (note)
    res.json({
      message: "Note created successfully",
      note,
    });
};

// get notes
export const notes = async (req, res) => {
  const { sort, search } = req.query;

  const queryObj = { author: req.user.userId };

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "title",
    "z-a": "-title",
  };

  if (search) {
    queryObj.$or = [{ title: { $regex: search, $options: "i" } }];
  }

  const sortKey = sortOptions[sort] || sortOptions.newest;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;

  const skip = (page - 1) * limit;
  const Notes = await Note.find(queryObj);
  const totalNotes = Notes.length;
  const numOfPages = Math.ceil(totalNotes / limit);

  const user_notes = await Note.find(queryObj)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  if (!user_notes) throw new BadRequestError("You have not created a note");
  res.status(StatusCodes.OK).json({
    message: "User notes",
    totalNotes,
    currentPage: page,
    numOfPages,
    user_notes,
  });
};

// Recently upuser_notes, totalNote, currentPage, numOfPageo    d notes;

export const getRecentNotes = async (req, res) => {
  let notes = await Note.find().sort({ $natural: -1 }).limit(3);
  if (!notes) throw new BadRequestError("No recent documents found");
  res.status(StatusCodes.OK).json({
    recentNotes: notes,
  });
};

// get a note
export const note = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) throw new NotFoundError("Note not found");
  res.status(StatusCodes.OK).json(note);
};

// delete a new note
export const deleteNote = async (req, res) => {
  const id = req.params.id;
  const note = await Note.findById(id);
  if (!note) throw new NotFoundError("Note not found");

  const note_delete = await Note.findByIdAndDelete(id);

  res.json({
    message: "Note deleted successfully",
  });
};

// delete a new note
export const updateNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) NotFoundError("Note not found");
  const note_updated = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({
    message: "Note updated successfully",
  });
};
