import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  searchData: "",
};

const taskSlice = createSlice({
  name: "taskslice",
  initialState,
  reducers: {
    addNewTask(state, action) {
      state.tasks.push(action.payload.task);
    },
    replaceTask(state, action) {
      state.tasks = action.payload.tasks;
    },
    replaceSearchData(state, action) {
      state.searchData = action.payload.data;
    },
  },
});

export const taskAction = taskSlice.actions;

export default taskSlice.reducer;
