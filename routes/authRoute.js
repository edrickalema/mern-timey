import express from "express";
import { register, login, logout } from "../controller/authController.js";
import {
  registerValidator,
  validateLogin,
} from "../middleware/validationMiddleware.js";

const router = express.Router();

router.route("/register").post(registerValidator, register);
router.route("/login").post(validateLogin, login);
router.route("/logout").get(logout);

export default router;

