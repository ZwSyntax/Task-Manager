import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
