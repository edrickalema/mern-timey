import express from "express";
import {
  deleteUser,
  getCurrentUser,
  updateUser,
} from "../controller/userController.js";
import upload from "../middleware/multerMiddleware.js";

const router = express.Router();

router.route("/user").get(getCurrentUser);
router.route("/update-user").patch(upload.single("avatar"), updateUser);
router.route("/delete-account").delete(deleteUser);

export default router;
