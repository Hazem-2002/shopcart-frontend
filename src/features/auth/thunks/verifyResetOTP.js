import { createAsyncThunk } from "@reduxjs/toolkit";
import { verifyResetOTPRequest } from "../../../api/auth/auth";

export const verifyResetOTP = createAsyncThunk(
  "auth/verifyResetOTP",
  async (otp, { rejectWithValue }) => {
    try {
      return await verifyResetOTPRequest(otp);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
