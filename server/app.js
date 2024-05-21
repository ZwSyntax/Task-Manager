import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";

const app = express();
const port = 3030;

const clientUrl = process.env.CLIENT_URL || "localhost:5173";
const MONGO_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}mymongoinit.6md0cxy.mongodb.net/taskmanager?retryWrites=true&w=majority`;

const corsOption = {
  origin: clientUrl,
  method: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
};

app.use(cors(corsOption));
app.use(express.json());

app.use("/auth", authRoutes);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT || port, () => {
      console.log(`Server is running on port ${process.env.PORT || port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
