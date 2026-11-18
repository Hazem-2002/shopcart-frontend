import { createAsyncThunk } from "@reduxjs/toolkit";
import { resetPasswordRequest } from "../../../api/auth/auth";

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (credentials, { rejectWithValue }) => {
    try {
      return await resetPasswordRequest(credentials);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
