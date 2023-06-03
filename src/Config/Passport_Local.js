import { Strategy as LocalStrategy } from "passport-local";
import User from "../Models/User_Model.js";
import bcrypt from "bcrypt";

const options = {
  usernameField: "username",
  passwordField: "password",
};

const Passport_Local = (passport) => {
  passport.use(
    new LocalStrategy(options, async (username, password, done) => {
      try {
        const user = await User.findOne({ username: username });
        if (!user) return done(null, false, { message: "User not found!" });
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Password does not match" });
        }
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser(function (user, done) {
    console.log("user", user);
    done(null, user._id);
  });
  passport.deserializeUser(function (id, done) {
    console.log("gelen id", id);
    User.findById({ _id: id }).then((user) => {
      done(null, user);
    });
  });
};

export default Passport_Local;
