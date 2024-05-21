import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth.js";
import taskReducer from "./tasks.js";
import uiResucer from "./ui.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
    ui: uiResucer,
  },
});

export default store;
