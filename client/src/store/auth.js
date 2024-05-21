import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  isLogin: false,
  isAuthLoader: false,
};

const authSlice = createSlice({
  name: "Slice",
  initialState,
  reducers: {
    loginHandler(state) {
      state.isLogin = true;
    },
    userHandler(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    logoutHandler(state) {
      state.isLogin = false;
    },
    authLoaderHandler(state) {
      state.isAuthLoader = !state.isAuthLoader;
    },
  },
});

export const authAction = authSlice.actions;

export default authSlice.reducer;
