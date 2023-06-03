import express from "express";
import AuthMiddleware from "../Middleware/AuthMiddleware.js";
import { GetMe, UpdateMe } from "../Controller/UserController.js";

const router = express.Router();

router.get("/me", AuthMiddleware, GetMe); // GET ME

// patch user without password because create endpoint for password
router.patch("/me", AuthMiddleware, UpdateMe);



// router.patch("/:id", async (req, res, next) => {
//   const { name, username, email, password } = req.body;
//   const { id } = req.params;

//   const { value, error } = UserUpdateValidation.validate(req.body);
//   if (error) {
//     next(error);
//   } else {
//     try {
//       const hashedPassword = await bcrypt.hash(password, 8);
//       // create other endpoint for password update
//       const result = await User.findByIdAndUpdate(
//         { _id: id },
//         { email, name, username, password: hashedPassword },
//         { new: true }
//       );
//       if (result) {
//         return res.send({ code: 200, message: "Updated!", data: result });
//       } else {
//         throw createError(404, "User not Found!");
//       }
//     } catch (err) {
//       next(createError(400, err));
//     }
//   }
// });

export default router;
