import express from "express";
import { postLogin, signup } from "../controller/auth.controller.js";
import { body } from "express-validator";

const routes = express.Router();

routes.post(
  "/signup",
  [
    body("email").trim().isEmail().withMessage("Invalid Email"),
    body("name")
      .trim()
      .isString()
      .isLength({ min: 5 })
      .withMessage("invalid name"),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("invalid password"),
    body("confirmPassword")
      .trim()
      .isLength({ min: 6 })
      .withMessage("invalid password"),
  ],
  signup,
);

routes.post(
  "/login",
  [
    body("email").trim().isEmail().withMessage("invalid email"),
    body("password")
      .trim()
      .isString()
      .isLength({ min: 6 })
      .withMessage("invalid password"),
  ],
  postLogin,
);

export default routes;
