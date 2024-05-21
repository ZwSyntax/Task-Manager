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
    .findById(req.userId)
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
  const { sorts, filter, search } = req.query;

  console.log(req.userId);

  user
    .findById(req.userId)
    .then((userData) => {
      if (!userData) {
        const err = new Error("invalid user");
        err.statusCode = 403;
        throw err;
      }

      let query = { user: userData._id };

      if (search && search.trim().length > 0) {
        const searchRegex = new RegExp(search, "i");
        query = {
          ...query,
          task: searchRegex,
        };
      }

      if (filter.length > 0) {
        query = { ...query, status: filter };
      }

      if (sorts.length > 0) {
        let data = sorts.toLowerCase();
        if (data === "date") {
          return Task.find(query).sort({ createDate: -1 });
        } else {
          return Task.find(query).sort({ priority: -1 });
        }
      }

      return Task.find(query);
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

export const completeTask = (req, res, next) => {
  const { taskId } = req.body;

  Task.findByIdAndUpdate(taskId, { status: "Completed" }, { new: true })
    .then((result) => {
      if (!result) {
        const err = new Error("Task not found");
        err.statusCode = 404;
        throw err;
      }

      return Task.find({ user: result.user });
    })
    .then((taskData) => {
      if (!taskData) {
        const err = new Error("No tasks found");
        err.statusCode = 404;
        throw err;
      }
      res
        .status(200)
        .json({ message: "Task marked as complete", data: taskData });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

export const getSingleTask = (req, res, next) => {
  const { taskId } = req.query;

  Task.findById(taskId)
    .then((taskData) => {
      if (!taskData) {
        const err = new Error("not task found");
        err.statusCode = 401;
        throw err;
        cd;
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

export const editTask = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const err = new Error("Validation Error");
    err.statusCode = 403;
    const errArray = error.array();
    err.data = errArray[0].msg;
    throw err;
  }

  const { taskId, task, priority } = req.body;

  let singleTask;

  Task.findByIdAndUpdate(
    taskId,
    { task: task, priority: priority },
    { new: true },
  )
    .then((result) => {
      if (!result) {
        const err = new Error("Task not found");
        err.statusCode = 404;
        throw err;
      }
      singleTask = result;
      return Task.find({ user: result.user });
    })
    .then((taskData) => {
      if (!taskData) {
        const err = new Error("No tasks found");
        err.statusCode = 404;
        throw err;
      }
      res
        .status(201)
        .json({ message: "task edit done", data: taskData, singleTask });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};
