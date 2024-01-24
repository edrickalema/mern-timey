import express from "express";
import {
  createNote,
  deleteNote,
  note,
  notes,
 getRecentNotes,
  updateNote,
} from "../controller/notes/notesController.js";
import {
  validateNoteInput,
  validateNotesParams,
} from "../middleware/validationMiddleware.js";

const router = express.Router();

router.route("/").post(validateNoteInput, createNote).get(notes);
router.route("/recent-notes").get(getRecentNotes);
router
  .route("/:id")
  .patch(validateNotesParams, updateNote)
  .delete(validateNotesParams, deleteNote)
  .get(note);




export default router;
