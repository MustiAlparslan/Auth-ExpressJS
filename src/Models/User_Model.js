import mongoose from "mongoose";
import createError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      maxLength: 50,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 5,
      maxLength: 30,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user._id;
  delete user.createdAt;
  delete user.updatedAt;
  delete user.__v;
  delete user.password;

  return user;
};

UserSchema.statics.login = async (username, email, password) => {
  const user = await User.findOne({ $or: [{ username }, { email }] });

  if (!user) throw createError(400, "Username or Email is Invalid!");

  const passwordControl = await bcrypt.compare(password, user.password);

  if (!passwordControl) throw createError(400, "Password is Invalid!");

  return user;
};

UserSchema.methods.generateToken = async function () {
  const loggedUser = this;
  const token = await jwt.sign(
    { _id: loggedUser._id, email: loggedUser.email },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
  return token;
};

const User = mongoose.model("User", UserSchema);

export default User;
