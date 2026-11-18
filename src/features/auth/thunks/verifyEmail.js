import { createAsyncThunk } from "@reduxjs/toolkit";
import { verifyEmailRequest } from "../../../api/auth/auth";

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (otp, { rejectWithValue }) => {
    try {
      return await verifyEmailRequest(otp);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
