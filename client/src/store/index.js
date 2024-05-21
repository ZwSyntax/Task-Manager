import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth.js";
import taskReducer from "./tasks.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
  },
});

export default store;
