import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("idToken");
const email = localStorage.getItem("email");

const AuthSlice = createSlice({
  name: "Authentication",
  initialState: {
    idToken: token,
    email: email,
    loginStatus: !!token,
  },
  reducers: {
    login(state, action) {
      localStorage.setItem("idToken", action.payload.idToken);
      localStorage.setItem("email", action.payload.email);
      state.loginStatus = true;
    },
    logout(state) {
      localStorage.removeItem("idToken");
      localStorage.removeItem("email");
      state.loginStatus = false;
    },
  },
});

export const authActions = AuthSlice.actions;

export default AuthSlice.reducer;
