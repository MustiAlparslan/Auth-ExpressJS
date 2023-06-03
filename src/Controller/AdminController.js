import User from "../Models/User_Model.js";
import createError from "http-errors";

export const GetAllUsers = async (req, res, next) => {
  const allUsers = await User.find({});
  console.log("users",allUsers)
  if(allUsers){
    res.send(allUsers);
  }else{
    console.log("hata")
  }
};

export const DeleteUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await User.findByIdAndDelete({ _id: id });
    if (result) {
      return res.send({ code: 200, message: "Deleted!" });
    } else {
      throw createError(404, "User not Found!");
    }
  } catch (err) {
    next(createError(400, err));
  }
};
