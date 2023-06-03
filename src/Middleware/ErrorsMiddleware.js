import mongoose from "mongoose";

const ErrorsMiddleware = (err, req, res, next) => {
  console.log(err)
  res
    .status(err?.statusCode || 400)
    .json({
      errorCode: err?.statusCode || 400,
      errorMessage: err?.message,
    });
};

export default ErrorsMiddleware;
