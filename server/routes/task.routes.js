import express from "express";
import {
  completeTask,
  deletTaks,
  editTask,
  getSingleTask,
  getTask,
  postTask,
} from "../controller/task.controller.js";
import { body } from "express-validator";
import { validateAuth } from "../middleware/auth.middleware.js";

const routes = express.Router();

routes.post(
  "/task",
  [
    body("task")
      .trim()
      .isString()
      .isLength({ min: 4 })
      .withMessage("invalid task"),
  ],
  validateAuth,
  postTask,
);

routes.get("/task", validateAuth, getTask);
routes.delete("/task", validateAuth, deletTaks);
routes.patch("/task", validateAuth, completeTask);
routes.get("/singletask", validateAuth, getSingleTask);
routes.post(
  "/edittask",
  [
    body("task")
      .trim()
      .isString()
      .isLength({ min: 4 })
      .withMessage("invalid task"),
  ],
  validateAuth,
  editTask,
);

export default routes;
