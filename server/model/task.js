import mongoose from "mongoose";

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  createDate: {
    type: Date,
    default: Date.now,
  },
  task: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export const task = mongoose.model("Task", taskSchema);
