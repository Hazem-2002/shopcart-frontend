import { createAsyncThunk } from "@reduxjs/toolkit";
import { forgotPasswordRequest } from "../../../api/auth/auth";

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      return await forgotPasswordRequest(email);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
