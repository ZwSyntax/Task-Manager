import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  expireToken: [
    {
      type: Object,
    },
  ],
  createDate: {
    type: Date,
    default: Date.now,
  },
});

export const user = mongoose.model("User", userSchema);
