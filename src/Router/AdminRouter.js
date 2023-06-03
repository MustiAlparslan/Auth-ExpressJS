import express from "express";
import AuthMiddleware from "../Middleware/AuthMiddleware.js";
import AdminMiddleware from "../Middleware/AdminMiddleware.js";
import { DeleteUserById, GetAllUsers } from "../Controller/AdminController.js";

const router = express.Router();

// get all users
router.get("/users", [AuthMiddleware, AdminMiddleware], GetAllUsers);

// delete user by id
router.delete("/user/:id", [AuthMiddleware, AdminMiddleware], DeleteUserById);


export default router