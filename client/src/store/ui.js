import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMessage: false,
  message: "",
  messageType: "",
};

const uiSlice = createSlice({
  name: "uislice",
  initialState,
  reducers: {
    messageHandler(state, action) {
      state.isMessage = true;
      state.message = action.payload.message;
      state.messageType = "message";
    },
    errorMessageHandler(state, action) {
      state.isMessage = true;
      state.message = action.payload.message;
      state.messageType = "error";
    },
    closeMessageHandler(state) {
      state.isMessage = false;
      state.message = "";
      state.messageType = "";
    },
  },
});

export const uiAction = uiSlice.actions;

export default uiSlice.reducer;
