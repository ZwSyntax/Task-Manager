import express from "express";
import { signup } from "../controller/auth.controller.js";

const routes = express.Router();

routes.get("/signup", signup);

export default routes;
