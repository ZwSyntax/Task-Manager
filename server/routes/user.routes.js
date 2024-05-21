import express from "express";
import { validateAuth } from "../middleware/auth.middleware.js";
import {
  editPassword,
  editUser,
  getUser,
} from "../controller/user.controller.js";
import { body } from "express-validator";

const routes = express.Router();

routes.get("/user", validateAuth, getUser);
routes.post(
  "/user",
  [
    body("email").trim().isEmail().withMessage("Invalid Email"),
    body("name")
      .trim()
      .isString()
      .isLength({ min: 5 })
      .withMessage("invalid name"),
  ],
  validateAuth,
  editUser,
);
routes.post(
  "/editpassword",
  [
    body("oldPassword")
      .trim()
      .isString()
      .isLength({ min: 6 })
      .withMessage("invalid old password"),
    body("newPassword")
      .trim()
      .isLength({ min: 6 })
      .withMessage("invalid new password"),
    body("confirmPassword")
      .trim()
      .isLength({ min: 6 })
      .withMessage("invalid confirmPassword"),
  ],
  validateAuth,
  editPassword,
);
export default routes;
