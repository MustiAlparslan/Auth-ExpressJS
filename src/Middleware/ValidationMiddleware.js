import { body, validationResult } from "express-validator";

export const RegisterValidation = () => {
  return [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required!")
      .isLength({ min: 5, max: 50 })
      .withMessage(
        "Name must be at least 5 characters long and less than 50 characters long"
      ),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required!")
      .isLength({ min: 5, max: 30 })
      .withMessage(
        "Username must be at least 5 characters long and less than 50 characters long"
      ),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address")
      .trim()
      .notEmpty()
      .withMessage("Email is required!"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long")
      .notEmpty()
      .withMessage("Password is required!")
      .trim(),
    body("repeatPassword")
      .trim()
      .notEmpty()
      .withMessage("Repeat Password is required")
      .custom((value, { req }) => {
        if (value != req.body.password) {
          throw new Error("Repeat Password is valid");
        }
        return true;
      }),
  ];
};

export const LoginValidation = () => {
  return [
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required!")
      .isLength({ min: 5, max: 30 })
      .withMessage(
        "Username must be at least 5 characters long and less than 50 characters long"
      ),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long")
      .notEmpty()
      .withMessage("Password is required!")
      .trim(),
  ];
};
