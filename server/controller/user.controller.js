import { user } from "../model/user.js";
import { validationResult } from "express-validator";

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
      res.status(200).json({ message: "get user data done", data: userData });
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
      res.status(200).json({ message: "edit user data done", data: userData });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};
