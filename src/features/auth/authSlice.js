import { createSlice } from "@reduxjs/toolkit";
import { login } from "./thunks/login";
import { refreshToken } from "./thunks/refreshToken";

const initialState = {
  user: null,
  isAuthenticated: false,
  accessToken: null,
  CSRFToken: null,
  isLoading: false,
  success: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.accessToken = null;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
        state.CSRFToken = action.payload.csrfToken;
        state.accessToken = action.payload.data.accessToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      // Refresh Token
      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.isAuthenticated = true;
        state.accessToken = action.payload.data.accessToken;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
