import jwt from "jsonwebtoken";
import User from "../Models/User_Model.js";
import createError from "http-errors";

const AuthMiddleware = async (req, res, next) => {
  try {
    if (req.header("Authorization")) {
      const token = req.header("Authorization").replace("Bearer ", "");
      const result = jwt.verify(token, process.env.SECRET_KEY);

      const user = await User.findOne({ _id: result?._id });

      req.user = user;
      next();
    } else {
      throw createError(401, "Unauthorized. Please log in");
    }
  } catch (err) {
    next(err);
  }
};

export const isLogged = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.send({ message: "You are not logged in" });
  }
};

export default AuthMiddleware;
