import { validationResult } from "express-validator";
import { user } from "../model/user.js";
import { task as Task } from "../model/task.js";

export const postTask = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const err = new Error("Validation Error");
    err.statusCode = 403;
    const errArray = error.array();
    err.data = errArray[0].msg;
    throw err;
  }

  const { task, priority } = req.body;

  user
    .findOne({ email: req.userEmail })
    .then((userData) => {
      if (!userData) {
        const err = new Error("invalid user");
        err.statusCode = 403;
        throw err;
      }

      const newTask = new Task({
        task: task,
        priority: Number(priority),
        user: userData._id,
      });

      return newTask.save();
    })
    .then((result) => {
      if (!result) {
        const err = new Error("something went wrong");
        err.statusCode = 500;
        throw err;
      }
      res.status(200).json({ message: "task created", data: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

export const getTask = (req, res, next) => {
  const email = req.userEmail;

  user
    .findOne({ email: email })
    .then((userData) => {
      if (!userData) {
        const err = new Error("invalid user");
        err.statusCode = 403;
        throw err;
      }

      return Task.find({ user: userData._id });
    })
    .then((taskData) => {
      if (!taskData) {
        const err = new Error("no task found");
        err.statusCode = 403;
        throw err;
      }

      res.status(200).json({ message: "task found", data: taskData });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

export const deletTaks = (req, res, next) => {
  const { taskId } = req.body;

  Task.findByIdAndDelete(taskId)
    .then((result) => {
      if (!result) {
        const err = new Error("delete failed");
        err.statusCode = 401;
        throw err;
      }

      return Task.find({ user: result.user });
    })
    .then((taskData) => {
      if (!taskData) {
        const err = new Error("not task found");
        err.statusCode = 401;
        throw err;
      }
      res.status(200).json({ message: "delete done", data: taskData });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};
