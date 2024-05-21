import express from "express";
import { validateAuth } from "../middleware/auth.middleware.js";
import { editUser, getUser } from "../controller/user.controller.js";

const routes = express.Router();

routes.get("/user", validateAuth, getUser);
routes.post("/user", validateAuth, editUser);
export default routes;
