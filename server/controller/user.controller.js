import { user } from "../model/user.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { Error } from "mongoose";

export const getUser = (req, res, next) => {
  const id = req.userId;
  user
    .findById(id)
    .then((userData) => {
      if (!userData) {
        const err = new Error("invalid user");
        err.statusCode = 403;
        throw err;
      }
      res.status(200).json({
        message: "get user data done",
        data: { name: userData.name, email: userData.email },
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

export const editUser = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const err = new Error("Validation Error");
    err.statusCode = 403;
    const errArray = error.array();
    err.data = errArray[0].msg;
    throw err;
  }

  const id = req.userId;
  const { name, email } = req.body;

  user
    .findOneAndUpdate({ _id: id }, { name: name, email: email }, { new: true })
    .then((userData) => {
      if (!userData) {
        const err = new Error("invalid user");
        err.statusCode = 403;
        throw err;
      }
      res.status(200).json({
        message: "edit user data done",
        data: { name: userData.name, email: userData.email },
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

export const editPassword = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const err = new Error("Validation Error");
    err.statusCode = 403;
    const errArray = error.array();
    err.data = errArray[0].msg;
    throw err;
  }

  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    const error = new Error("Password not match");
    error.statusCode = 401;
    error.message = "Password not match";
    throw error;
  }

  user
    .findById(req.userId)
    .then((userData) => {
      if (!userData) {
        const err = new Error("invalid user");
        err.statusCode = 403;
        throw err;
      }
      const userPassword = userData.password;
      return bcrypt.compare(oldPassword, userPassword);
    })
    .then((match) => {
      if (!match) {
        const error = new Error("password not match");
        error.statusCode = 403;
        return next(error);
      }

      return bcrypt.hash(newPassword, 12);
    })
    .then((hasPassword) => {
      const encryptPassword = hasPassword;
      return user.findOneAndUpdate(
        { _id: req.userId },
        { password: encryptPassword },
        { new: true },
      );
    })
    .then((userData) => {
      if (!userData) {
        const err = new Error("invalid user");
        err.statusCode = 403;
        throw err;
      }
      res.status(200).json({ message: "password update done" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};
