const AdminMiddleware = (req, res, next) => {
  console.log("2", req.user);
  if (!req.user.isAdmin) {
    return res.status(403).send({
      errorMessage:
        "Access denied. You do not have the necessary permissions to perform this action",
    });
  }
  next();
};

export default AdminMiddleware;
