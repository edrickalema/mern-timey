import express from "express";
import {
  createDiscussion,
  getDiscussionMessages,
} from "../../controller/assignments/assignDiscussion.js";

const router = express.Router();

router.route("/").get(getDiscussionMessages).post(createDiscussion);
export default router;
