import User from "../Models/User_Model.js";

export const GetMe = (req, res, next) => {
  res.send(req.user);
};

export const UpdateMe = async (req, res, next) => {
  const { name, username, email, password } = req.body;
  try {
    const result = await User.findByIdAndUpdate(
      { _id: req.user._id },
      { email, name, username },
      { new: true }
    );
    if (result) {
      return res.send({ code: 200, message: "Updated!", data: result });
    } else {
      throw createError(404, "User not Found!");
    }
  } catch (err) {
    next(createError(400, err));
  }
};
