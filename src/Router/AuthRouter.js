import express from "express";
import { Login, Logout, Register } from "../Controller/AuthController.js";
import {
  RegisterValidation,
  LoginValidation,
} from "../Middleware/ValidationMiddleware.js";
import { isLogged } from "../Middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/login", isLogged, LoginValidation(), Login); // LOGIN
router.post("/register", RegisterValidation(), Register); // REGISTER
router.post("/logout", isLogged, Logout); // LOGOUT

export default router;
