import { createAsyncThunk } from "@reduxjs/toolkit";
import { resendResetOTPRequest } from "../../../api/auth/auth";

export const resendResetOTP = createAsyncThunk(
  "auth/resendResetOTP",
  async (_, { rejectWithValue }) => {
    try {
      return await resendResetOTPRequest();
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
