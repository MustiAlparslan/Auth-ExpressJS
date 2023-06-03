import bcrypt from "bcrypt";
import User from "../Models/User_Model.js";
import { validationResult } from "express-validator";
import createError from "http-errors";
import passport from "passport";
import Passport_Local from "../Config/Passport_Local.js";
import nodeMailer from "nodemailer";
import jwt from "jsonwebtoken";

Passport_Local(passport);

export const Login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.send(errors.array());
  } else {
    passport.authenticate(
      "local",
      { failureFlash: true },
      async (err, user) => {
        if (err) throw err;
        if (!user) res.send({ message: "Username or Password Invalid!" });
        else {
          const token = await user.generateToken();
          req.logIn(user, (err) => {
            if (err) throw err;
            return res.send({ code: 200, data: user, token: token });
          });
        }
      }
    )(req, res, next);
  }

  //   const { username, email, password } = req.body;
  //   try {
  //     const user = await User.login(username, email, password);
  //     const token = await user.generateToken();
  //     res.send({ data: user, token: token });
  //   } catch (err) {
  //     next(err);
  //   }
};

export const Register = async (req, res, next) => {
  const { name, username, email, password, repeatPassword } = req.body;
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      res.send(errors.array());
    }
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      throw createError(
        409,
        existingUser.username === username
          ? "This username is already taken"
          : "This email is already registered"
      );
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });
    console.log(newUser);
    await newUser.save();
    res.send({ message: "please check your email to verify your account" });
  } catch (err) {
    next(err);
  }
};

export const Logout = async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie("connect.sid");
    });
    res.send({ message: "Successfully logged out" });
  });
};
